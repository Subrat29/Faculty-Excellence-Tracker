import Projects from "../../models/Faculty/project.js";
import { formattedResponse } from "../../utils/ApiResponse.js";
import consoleTerminal from "../../utils/consoleTerminal.js";

export const addProject = async (req, res) => {
  try {
    const projectData = req.body; // Get the project data from the request
    console.log("Received Project Data :: ", projectData);

    // Map the incoming data to match the schema fields
    const newProjectData = projectData.fundings.map((project, index) => {
      console.log(`Project Data at index ${index}:`, project); // Debugging log
      return {
        faculty_id: project.faculty_id || "",
        project_name: project.fundingTitle || "",
        project_start_date: project.startYear || "",
        project_end_date: project.endYear || "",
        status: project.endYear === "N/A" ? "Ongoing" : "Completed",
        organization_name: project.organizationName || "",
        organization_city: project.organizationCity || "",
        funding_type: project.fundingType || "",
        funding_path: project.fundingPath || "",
        funding_amount: project.fundingAmount || "",
        url: project.url || "",
      };
    });

    // Check for missing required fields
    newProjectData.forEach((project, index) => {
      if (!project.faculty_id) {
        console.error(
          `Missing required fields in project at index ${index}:`,
          project
        );
      }
    });

    // Process each project data and check if it exists in the database
    const promises = newProjectData.map(async (newProject) => {
      try {
        const existingProject = await Projects.findOne({
          faculty_id: newProject.faculty_id,
          project_name: newProject.project_name,
        });

        if (existingProject) {
          const updatedProject = await Projects.findByIdAndUpdate(
            existingProject._id,
            { $set: newProject },
            { new: true }
          );
          return { status: "fulfilled", project: updatedProject };
        } else {
          const createdProject = new Projects(newProject);
          await createdProject.save();
          return { status: "fulfilled", project: createdProject };
        }
      } catch (error) {
        return { status: "rejected", error: error.message };
      }
    });

    // Wait for all promises to settle
    const results = await Promise.allSettled(promises);
    consoleTerminal("Results :: ", results);

    // Process results and handle successful and failed operations
    const successfulProjects = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value.project);
    const failedProjects = results
      .filter((result) => result.status === "rejected")
      .map((result) => result.reason);

    // Handle failed projects if needed
    if (failedProjects.length > 0) {
      console.error(
        "Failed to process the following projects:",
        failedProjects
      );
    }

    return formattedResponse(
      200,
      successfulProjects,
      "Project(s) added/updated successfully"
    );
  } catch (error) {
    console.error("Error adding project:", error);
    return formattedResponse(500, null, "Error adding project");
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id, projectData } = req.body;
    const updatedProject = await Projects.findByIdAndUpdate(id, projectData, {
      new: true,
    });

    if (!updatedProject) {
      return formattedResponse(404, null, "Project not found");
    }

    return formattedResponse(
      200,
      updatedProject,
      "Project updated successfully"
    );
  } catch (error) {
    return formattedResponse(400, null, "Error updating project");
  }
};

export const fetchResearchProjects = async (faculty_id) => {
  try {
    consoleTerminal("faculty_id :: ", faculty_id);
    const projects = await Projects.find({ faculty_id });
    return formattedResponse(
      200,
      projects,
      "Professional memberships fetched successfully"
    );
  } catch (error) {
    consoleTerminal("Error in fetching details :: ", error);
    return formattedResponse(500, null, "Internal Server Error");
  }
};
