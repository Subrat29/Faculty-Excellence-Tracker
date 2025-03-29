import { Router } from "express";
import {
  addAward,
  fetchAwards,
  updateAward,
} from "../../controllers/Faculty/awards.controller.js";
import { sendResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { VerifyJWT } from "../../middlewares/auth.middleware.js";

const router = Router();

// Create a new award
router.post("/import", async (req, res) => {
  try {
    const result = await addAward(req, res);

    if (result.status === "rejected") {
      return sendResponse(res, 400, null, result.error);
    }

    return sendResponse(res, 201, null, "Award added successfully");
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
});

// Update an award
router.put("/update", async (req, res) => {
  try {
    const result = await updateAward(req, res);
    return sendResponse(res, 200, result, "Award updated successfully");
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
});

// Fetch all awards
router.get(
  "/fetch/:faculty_id",
  VerifyJWT,
  asyncHandler(async (req, res) => {
    try {
      const { faculty_id } = req.params;

      const result = await fetchAwards(faculty_id);
      return sendResponse(res, 200, result.data, result.message);
    } catch (error) {
      return sendResponse(res, 500, null, error.message);
    }
  })
);

export default router;
