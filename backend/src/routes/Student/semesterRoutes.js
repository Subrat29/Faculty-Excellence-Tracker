import express from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { sendResponse } from '../../utils/ApiResponse.js';
import { addSemester, getSemestersWithSort } from '../../controllers/Student/semesterController.js';
import { VerifyJWT } from '../../middlewares/auth.middleware.js';

const router = express.Router();

// Semester validation middleware
const validateSemesterRequest = (req, res, next) => {
    if (req.path.includes('/upload') && !req.body.semester) {
        return sendResponse(res, 400, null, 'Semester number is required');
    }
    next();
};

// Semester routes
router.route('/upload')
    .post(
        VerifyJWT, // Verify JWT for any authenticated user
        validateSemesterRequest,
        asyncHandler(async (req, res) => {
            const result = await addSemester(req, res);
            if (result.status === 200) {
                return sendResponse(res, 200, result.data, 'Semester added successfully');
            } else {
                return sendResponse(res, result.status, null, result.message);
            }
        })
    );

router.route('/fetch')
    .get(
        VerifyJWT, // Verify JWT for any authenticated user
        asyncHandler(async (req, res) => {
            const result = await getSemestersWithSort(req.query);
            return sendResponse(res, 200, result.data, 'Semesters fetched successfully');
        })
    );

export default router;
