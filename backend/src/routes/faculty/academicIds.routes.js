import { Router } from "express";
import {
  addAcademicId,
  fetchAcademicIds,
} from "../../controllers/Faculty/academicIds.controller.js";
import { sendResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { VerifyJWT } from "../../middlewares/auth.middleware.js";
import consoleTerminal from "../../utils/consoleTerminal.js";

const router = Router();

// Create a new Academic ID
router.post("/add", VerifyJWT, async (req, res) => {
  try {
    const result = await addAcademicId(req, res);

    if (result.status !== 201) {
      return sendResponse(res, result.status, null, result.message);
    }

    return sendResponse(
      res,
      201,
      null,
      "Academic IDs added/updated successfully"
    );
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
});

// fetch ids based on faculty_id
router.get(
  "/fetch/:faculty_id",
  VerifyJWT,
  asyncHandler(async (req, res) => {
    try {
      const faculty_id = req.params.faculty_id;
      consoleTerminal("Faculty ID :: ", faculty_id);

      const ids = await fetchAcademicIds(faculty_id);
      consoleTerminal("Academic IDs :: ", ids);

      if (ids.status !== 200) {
        return sendResponse(res, ids.status, null, ids.message);
      }

      return sendResponse(
        res,
        200,
        ids.data,
        "Academic IDs fetched successfully"
      );
    } catch (error) {
      return sendResponse(res, 500, null, "Error fetching Academic IDs");
    }
  })
);

export default router;
