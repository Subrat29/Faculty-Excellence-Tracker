import express from 'express';
import {
    addStudentFeedback,
    getFeedbackWithPagination
} from '../../controllers/Student/studentFeedbackController.js';
import { sendResponse } from '../../utils/ApiResponse.js';

const router = express.Router();

// Feedback routes
router.route('/upload')
    .post(async (req, res) => {
        try {
            const result = await addStudentFeedback(req, res);
            return sendResponse(res, 201, result, 'Feedback added successfully');
        } catch (error) {
            return sendResponse(res, 500, null, error.message);
        }
    });

router.route('/fetch')
    .get(async (req, res) => {
        try {
            const result = await getFeedbackWithPagination(req, res);
            return sendResponse(res, 200, result);
        } catch (error) {
            return sendResponse(res, 500, null, error.message);
        }
    });

export default router;
