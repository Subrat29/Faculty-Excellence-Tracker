import { Router } from "express";
import {
  addQualification,
  fetchQualifications,
  updateQualification,
} from "../../controllers/Faculty/qualifications.controller.js";
import { sendResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

// Create a new qualification
router.post("/import", async (req, res) => {
  try {
    const result = await addQualification(req, res);
    return sendResponse(res, 201, result, "Qualification added successfully");
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
});

// Update a qualification
router.put("/update", async (req, res) => {
  try {
    const result = await updateQualification(req, res);
    return sendResponse(res, 200, result, "Qualification updated successfully");
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
});

router.get(
  "/fetch/:faculty_id",
  asyncHandler(async (req, res) => {
    try {
      const { faculty_id } = req.params;
      const result = await fetchQualifications(faculty_id);
      return sendResponse(res, result.status, result.data, result.message);
    } catch (error) {
      consoleTerminal("Error fetching qualifications:", error);
      return sendResponse(res, 500, null, "Error fetching qualifications");
    }
  })
);

export default router;
