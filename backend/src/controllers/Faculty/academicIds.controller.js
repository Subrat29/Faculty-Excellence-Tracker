import AcademicIds from "../../models/Faculty/academicIds.js";
import { formattedResponse } from "../../utils/ApiResponse.js";
import consoleTerminal from "../../utils/consoleTerminal.js";

// Add Academic ID
export const addAcademicId = async (req, res) => {
  consoleTerminal("Request Body :: ", req.body);
  const { facultyId, academicIds } = req.body;

  // Check if the faculty already has an academic record
  let academicRecord = await AcademicIds.findOne({ faculty_id: facultyId });
  consoleTerminal("Academic Record :: ", academicRecord);

  if (!academicRecord) {
    // If no record exists, create a new one
    academicRecord = new AcademicIds({ faculty_id: facultyId });
  }

  // Loop through each academicId from the frontend request
  for (const id of academicIds) {
    const { label, value } = id;

    // Skip empty or invalid ID values (you can customize this validation as needed)
    if (!value) continue;

    // Update the corresponding field based on the label
    switch (label) {
      case "Orcid Id":
        academicRecord.orcid = value;
        break;
      case "Scopus Id":
        academicRecord.scopus = value;
        break;
      case "Researcher Id":
        academicRecord.researcher = value;
        break;
      case "Google Scholar Id":
        academicRecord.google_scholar = value;
        break;
      default:
        break; // If the label doesn't match any known field, do nothing
    }
  }

  // Save the updated or new academic record
  await academicRecord.save();

  // Return a success response after updating
  return formattedResponse(201, null, "Academic IDs updated successfully");
};

// Fetch Academic IDs based on faculty_id
export const fetchAcademicIds = async (faculty_id) => {
  try {
    const ids = await AcademicIds.find({ faculty_id });
    return formattedResponse(200, ids, "Academic IDs fetched successfully");
  } catch (error) {
    return formattedResponse(400, null, "Error fetching Academic IDs");
  }
};
