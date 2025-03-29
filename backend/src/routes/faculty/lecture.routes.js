import { Router } from 'express';
import { addLectureActivity, updateLectureActivity } from '../../controllers/Faculty/lecture.controller.js';
import { sendResponse } from '../../utils/ApiResponse.js';

const router = Router();

// Define the route for adding lecture activities
router.post('/add', async (req, res) => {
    try {
        const result = await addLectureActivity(req, res);
        return sendResponse(res, 201, result, 'Lecture activity added successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

// Update a lecture activity
router.put('/update', async (req, res) => {
    try {
        const result = await updateLectureActivity(req, res);
        return sendResponse(res, 200, result, 'Lecture activity updated successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

export default router;
