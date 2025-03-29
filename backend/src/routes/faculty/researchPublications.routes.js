import { Router } from "express";
import {
  addResearchPublication,
  fetchResearchPublications,
  updateResearchPublication,
  uploadCSV,
} from "../../controllers/Faculty/researchPublications.controller.js";
import { sendResponse } from "../../utils/ApiResponse.js";
import consoleTerminal from "../../utils/consoleTerminal.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { VerifyJWT } from "../../middlewares/auth.middleware.js";
import { uploadMiddleware } from "../../middlewares/multer.middleware.js";

const router = Router();

// Create a new research publication
router.post("/import", VerifyJWT, async (req, res) => {
  try {
    const result = await addResearchPublication(req, res);
    consoleTerminal("Result :: ", result);
    return sendResponse(
      res,
      201,
      result,
      "Research publication added successfully"
    );
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
});

// Route to fetch all research publications based on faculty_id
router.get(
  "/fetch/:faculty_id",
  VerifyJWT,
  asyncHandler(async (req, res) => {
    try {
      const faculty_id = req.params.faculty_id;
      consoleTerminal("Faculty ID :: ", faculty_id);

      const publications = await fetchResearchPublications(faculty_id);

      if (publications.status !== 200) {
        return sendResponse(
          res,
          publications.status,
          null,
          publications.message
        );
      }

      return sendResponse(
        res,
        200,
        publications.data,
        "Research publications fetched successfully"
      );
    } catch (error) {
      return sendResponse(res, 500, null, error.message);
    }
  })
);

// Update a research publication
router.put("/update", async (req, res) => {
  try {
    consoleTerminal("Update Request Body:", req.body);
    const result = await updateResearchPublication(req, res);
    return sendResponse(
      res,
      200,
      result,
      "Research publication updated successfully"
    );
  } catch (error) {
    consoleTerminal("Error Updating Research Publication:", error);
    return sendResponse(res, 500, null, error.message);
  }
});

// Upload CSV file and process data
router.post("/upload-csv", uploadMiddleware("file"), async (req, res) => {
  try {
    consoleTerminal("CSV Upload Request File:", req.file);
    consoleTerminal("CSV Upload Request Body:", req.body);

    if (!req.file) {
      console.error("No File Uploaded");
      return sendResponse(
        res,
        400,
        null,
        "No file uploaded. Ensure the file is sent in the 'file' field."
      );
    }

    const facultyId = req.body.facultyId;
    const result = await uploadCSV(req, res, facultyId);
    return sendResponse(
      res,
      200,
      result,
      "Research publications added successfully from CSV"
    );
  } catch (error) {
    consoleTerminal("Error Processing CSV Upload:", error);
    return sendResponse(res, 500, null, error.message);
  }
});

export default router;

