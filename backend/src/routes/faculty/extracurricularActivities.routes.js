import { Router } from 'express';
import { addExtracurricularActivity, updateExtracurricularActivity } from '../../controllers/Faculty/extracurricularActivities.controller.js';
import { sendResponse } from '../../utils/ApiResponse.js';

const router = Router();

// Create a new extracurricular activity
router.post('/add', async (req, res) => {
    try {
        const result = await addExtracurricularActivity(req, res);
        return sendResponse(res, 201, result, 'Extracurricular activity added successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

// Update an extracurricular activity
router.put('/update', async (req, res) => {
    try {
        const result = await updateExtracurricularActivity(req, res);
        return sendResponse(res, 200, result, 'Extracurricular activity updated successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

export default router;
