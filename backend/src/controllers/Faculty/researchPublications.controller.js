import ResearchPublications from "../../models/Faculty/researchPublications.js";
import { formattedResponse } from "../../utils/ApiResponse.js";
import consoleTerminal from "../../utils/consoleTerminal.js";
import fs from "fs";
import csv from "csv-parser";

export const addResearchPublication = async (req, res) => {
  try {
    const publicationData = req.body;
    consoleTerminal("Publication Data :: ", publicationData);

    const newPublications = publicationData.publications.map((publication) => ({
      faculty_id: publication.faculty_id,
      publication_type: publication.workType || "",
      title: publication.title || "",
      journal_or_book_name: publication.journalTitle || "",
      publisher: publication.sourceName || "",
      publication_year: publication.publicationDate || "",
      url: publication.url || "",
      doi: publication.doiValue || "",
      volume: publication.volume || "",
      page_no: publication.page_no || "",
      editor: publication.editor || "",
      citation_count: publication.citation_count || 0,
      impact_factor: publication.impact_factor || null,
      abstract: publication.abstract || "",
      funding_source: publication.funding_source || "",
      is_peer_reviewed: publication.is_peer_reviewed || false,
    }));

    // Process all publications using Promise.allSettled
    const promises = newPublications.map(async (publication) => {
      try {
        const existingPublication = await ResearchPublications.findOne({
          doi: publication.doi,
        });

        if (existingPublication) {
          // If the publication exists, update it
          const updatedPublication =
            await ResearchPublications.findByIdAndUpdate(
              existingPublication._id,
              { $set: publication },
              { new: true }
            );
          return { status: "fulfilled", publication: updatedPublication };
        } else {
          // If the publication doesn't exist, insert it
          const newPublication = new ResearchPublications(publication);
          await newPublication.save();
          return { status: "fulfilled", publication: newPublication };
        }
      } catch (error) {
        return { status: "rejected", error: error.message };
      }
    });

    // Wait for all promises to settle
    const results = await Promise.allSettled(promises);

    // Process results and categorize successful and failed operations
    const successfulPublications = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);
    const failedPublications = results
      .filter((result) => result.status === "rejected")
      .map((result) => result.reason);

    // Log or handle errors from failed publications
    if (failedPublications.length > 0) {
      console.error(
        "Failed to process the following publications:",
        failedPublications
      );
    }

    // Respond with success or failure
    return formattedResponse(
      201,
      successfulPublications,
      "Research publication(s) added/updated successfully"
    );
  } catch (error) {
    console.error("Error adding research publication:", error);
    return formattedResponse(400, null, "Error adding research publication");
  }
};

export const updateResearchPublication = async (req, res) => {
  try {
    consoleTerminal("Update Request Body:", req.body);

    const { id, publicationData } = req.body;
    if (!id) {
      console.error("Missing ID in Request");
      return formattedResponse(res, 400, null, "ID is required to update a publication");
    }

    const existingPublication = await ResearchPublications.findById(id);
    if (!existingPublication) {
      console.warn(`Research Publication Not Found: ID=${id}`);
      return formattedResponse(res, 404, null, "Research publication not found");
    }

    // Check if the new data is different from the existing data
    const isDataDifferent = Object.entries(publicationData).some(
      ([key, value]) => existingPublication[key] !== value
    );

    if (!isDataDifferent) {
      console.warn("No changes detected in the provided data.");
      return formattedResponse(res, 400, null, "No changes detected in the provided data");
    }

    const updatedPublication = await ResearchPublications.findByIdAndUpdate(
      id,
      publicationData,
      { new: true }
    );

    consoleTerminal("Updated Research Publication:", updatedPublication);
    return formattedResponse(res, 200, updatedPublication, "Research publication updated successfully");
  } catch (error) {
    console.error("Error Updating Research Publication:", error);
    return formattedResponse(res, 400, null, "Error updating research publication");
  }
};

export const uploadCSV = async (req, res) => {
  try {
    consoleTerminal("Request File:", req.file);
    consoleTerminal("Request Body:", req.body);

    if (!req.file) {
      console.error("No File Uploaded");
      return formattedResponse(res, 400, null, "No file uploaded");
    }

    const results = [];
    const facultyId = req.body.facultyId;

    // Process the CSV file
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => {
        consoleTerminal("Parsed Row:", data);
        data.faculty_id = facultyId;
        results.push(data);
      })
      .on("end", async () => {
        try {
          consoleTerminal("CSV Parsing Completed. Inserting Data into Database...");
          await ResearchPublications.insertMany(results);

          // Optionally delete the uploaded file
          fs.unlinkSync(req.file.path);
          consoleTerminal("Temporary File Deleted:", req.file.path);

          return formattedResponse(res, 200, results, "CSV file processed and data inserted successfully");
        } catch (error) {
          console.error("Error Inserting Data from CSV:", error);
          return formattedResponse(res, 500, null, "Error processing CSV file");
        }
      })
      .on("error", (error) => {
        console.error("Error Reading CSV File:", error);
        return formattedResponse(res, 500, null, "Error reading CSV file");
      });
  } catch (error) {
    console.error("Unexpected Error in uploadCSV:", error);
    return formattedResponse(res, 500, null, "An unexpected error occurred");
  }
};

export const fetchResearchPublications = async (faculty_id) => {
  try {
    const publications = await ResearchPublications.find({ faculty_id });
    consoleTerminal("Publications :: ", publications);
    return formattedResponse(
      200,
      publications,
      "Research publications fetched successfully"
    );
  } catch (error) {
    console.error("Error fetching research publications:", error);
    return formattedResponse(res, 500, null, "Error fetching research publications");
  }
};

