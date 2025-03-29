import { Router } from 'express';
import { addCourse, updateCourse } from '../../controllers/Faculty/courses.controller.js';
import { sendResponse } from '../../utils/ApiResponse.js';

const router = Router();

// Create a new course
router.post('/add', async (req, res) => {
    try {
        const result = await addCourse(req, res);
        return sendResponse(res, 201, result, 'Course added successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

// Update a course
router.put('/update', async (req, res) => {
    try {
        const result = await updateCourse(req, res);
        return sendResponse(res, 200, result, 'Course updated successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

export default router;
