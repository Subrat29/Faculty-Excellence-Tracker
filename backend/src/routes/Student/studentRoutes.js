import express from 'express';
import { VerifyJWT } from '../../middlewares/auth.middleware.js';
import { upload } from '../../middlewares/multer.middleware.js';
import {
    updateStudentProfile,
    fetchStudentDetails,
    searchAcrossCollections,
    updateStudentAvatar
} from '../../controllers/Student/studentController.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { sendResponse } from '../../utils/ApiResponse.js';

const router = express.Router();

// Basic validation middleware
const validateRequest = (req, res, next) => {
    try {
        // Profile validation
        if (req.path.includes('/updateStudentProfile')) {
            const { student_id, session_id } = req.body;
            if (!student_id) {
                return sendResponse(res, 400, null, 'Student ID is required');
            }
            if (session_id !== undefined && !session_id) {
                return sendResponse(res, 400, null, 'Session ID cannot be empty if provided');
            }
        }

        // Avatar validation
        if (req.path.includes('/update-avatar')) {
            if (!req.file) {
                return sendResponse(res, 400, null, 'Avatar file is required');
            }

            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(req.file.mimetype)) {
                return sendResponse(res, 400, null, 'Only JPG, PNG, and GIF image files are allowed');
            }

            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if (req.file.size > maxSize) {
                return sendResponse(res, 400, null, 'File size should not exceed 5MB');
            }
        }

        next();
    } catch (error) {
        return sendResponse(res, 400, null, error.message);
    }
};

// Student Profile routes
router.route('/updateStudentProfile')
    .put(VerifyJWT, validateRequest, asyncHandler(async (req, res) => {
        const result = await updateStudentProfile(req.body);
        if (result.status === 200) {
            return sendResponse(res, 200, result.data, 'Profile updated successfully');
        } else {
            return sendResponse(res, result.status, null, result.message);
        }
    }));

router.route('/fetchStudentDetails/:student_id')
    .get(VerifyJWT, asyncHandler(async (req, res) => {
        const result = await fetchStudentDetails(req.params.student_id);
        if (result.status === 200) {
            return sendResponse(res, 200, result.data, 'Student details fetched successfully');
        } else {
            return sendResponse(res, result.status, null, result.message);
        }
    }));

// Search route
router.route('/search')
    .get(VerifyJWT, asyncHandler(async (req, res) => {
        const result = await searchAcrossCollections(req.query);
        return sendResponse(res, 200, result.data, 'Search results fetched successfully');
    }));

// Avatar update route
router.route('/update-avatar')
    .patch(VerifyJWT, upload.single("avatar"), validateRequest, asyncHandler(async (req, res) => {
        const result = await updateStudentAvatar(req.user.id, req.file.path);
        if (result.status === 200) {
            return sendResponse(res, 200, result.data, 'Avatar updated successfully');
        } else {
            return sendResponse(res, result.status, null, result.message);
        }
    }));

export default router;
