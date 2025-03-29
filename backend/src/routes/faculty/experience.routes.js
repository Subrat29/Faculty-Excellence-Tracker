import { Router } from "express";
import {
  addExperience,
  getAllExperience,
  updateExperience,
} from "../../controllers/Faculty/experience.controller.js";
import { sendResponse } from "../../utils/ApiResponse.js";

const router = Router();

// Create a new experience
router.post("/add", async (req, res) => {
  try {
    const result = await addExperience(req, res);
    return sendResponse(res, 201, result, "Experience added successfully");
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
});

// Update an experience
router.put("/update", async (req, res) => {
  try {
    const result = await updateExperience(req, res);
    return sendResponse(res, 200, result, "Experience updated successfully");
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
});

// Route to get all experiences based on faculty id
router.get("/fetch/:faculty_id", async (req, res) => {
  try {
    const { faculty_id } = req.params;

    if (!faculty_id) {
      return sendResponse(res, 400, null, "Faculty ID is required");
    }

    const response = await getAllExperience(faculty_id);

    if (response.status !== 200) {
      return sendResponse(res, 400, null, response.message);
    }

    return sendResponse(
      res,
      200,
      response.data,
      "Experiences fetched successfully"
    );
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
});

export default router;
