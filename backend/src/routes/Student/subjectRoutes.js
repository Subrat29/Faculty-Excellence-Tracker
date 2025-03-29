import express from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { sendResponse } from '../../utils/ApiResponse.js';
import { addSubject, getSubjectsWithFilters } from '../../controllers/Student/subjectController.js';
import { VerifyJWT } from '../../middlewares/auth.middleware.js'; // Import VerifyJWT middleware

const router = express.Router();

// Subject validation middleware
const validateSubjectRequest = (req, res, next) => {
    const { subject_code, subject_name } = req.body;
    if (req.path.includes('/upload') && (!subject_code || !subject_name)) {
        return sendResponse(res, 400, null, 'Subject code and name are required');
    }
    next();
};

// Subject routes
router.route('/upload')
    .post(
        VerifyJWT, // Apply VerifyJWT middleware
        validateSubjectRequest,
        asyncHandler(async (req, res) => {
            const result = await addSubject(req, res);
            if (result.status === 200) {
                return sendResponse(res, 200, result.data, 'Subject added successfully');
            } else {
                return sendResponse(res, result.status, null, result.message);
            }
        })
    );

router.route('/fetch')
    .get(
        VerifyJWT, // Apply VerifyJWT middleware
        asyncHandler(async (req, res) => {
            const result = await getSubjectsWithFilters(req.query);
            return sendResponse(res, 200, result.data, 'Subjects fetched successfully');
        })
    );

export default router;
