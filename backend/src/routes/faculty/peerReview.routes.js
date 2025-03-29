import { Router } from "express";
import { sendResponse } from "../../utils/ApiResponse.js";
import {
  addPeerFeedback,
  getAllPeerFeedback,
} from "../../controllers/Faculty/peerReview.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { VerifyJWT } from "../../middlewares/auth.middleware.js";

const router = Router();

// Define the route for adding lecture activities
router.post("/import", VerifyJWT, async (req, res) => {
  try {
    const result = await addPeerFeedback(req, res);

    if (result.status === "rejected" || result.status !== 200) {
      return sendResponse(res, 400, null, "Error adding Peer Feedback");
    }

    return sendResponse(
      res,
      201,
      result.data,
      "Peer Feedback added successfully"
    );
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
});

router.get(
  "/fetch/:faculty_id",
  VerifyJWT,
  asyncHandler(async (req, res) => {
    try {
      const { faculty_id } = req.params;
      const result = await getAllPeerFeedback(faculty_id);

      if (result.status !== 200) {
        return sendResponse(res, 400, null, "Error fetching Peer Feedback");
      }

      return sendResponse(
        res,
        200,
        result.data,
        "Peer Feedback fetched successfully"
      );
    } catch (error) {
      return sendResponse(res, 500, null, error.message);
    }
  })
);

export default router;
