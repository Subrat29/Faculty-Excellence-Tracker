import { Router } from "express";
import {
  addProject,
  fetchResearchProjects,
  updateProject,
} from "../../controllers/Faculty/project.controller.js";
import { sendResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { VerifyJWT } from "../../middlewares/auth.middleware.js";
import consoleTerminal from "../../utils/consoleTerminal.js";

const router = Router();

// Create a new project
router.post("/import", VerifyJWT, async (req, res) => {
  try {
    const result = await addProject(req, res);
    return sendResponse(res, 201, result, "Project added successfully");
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
});

// Update a project
router.put("/update", async (req, res) => {
  try {
    const result = await updateProject(req, res);
    return sendResponse(res, 200, result, "Project updated successfully");
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
});

// fetch Route ..!
router.get(
  "/fetch/:faculty_id",
  VerifyJWT,
  asyncHandler(async (req, res) => {
    try {
      const { faculty_id } = req.params;

      const response = await fetchResearchProjects(faculty_id);
      consoleTerminal("Projects Data :: ", response);

      if (response.status !== 200) {
        return sendResponse(res, 400, null, "Error in fetching details");
      }

      return sendResponse(
        res,
        200,
        response.data,
        "Projects data fetched Successfully"
      );
    } catch (error) {
      consoleTerminal("Error in fetching projects :: ", error);
      return sendResponse(res, 500, null, "Internal Server Error");
    }
  })
);

export default router;
