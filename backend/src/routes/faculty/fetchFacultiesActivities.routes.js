import { Router } from 'express';
import { fetchFacultiesActivities } from '../../controllers/Faculty/fetchFacultiesActivities.controller.js';
import { sendResponse } from '../../utils/ApiResponse.js';

const router = Router();

// Fetch faculties activities
router.get('/fetch', async (req, res) => {
    try {
        const result = await fetchFacultiesActivities(req, res);
        return sendResponse(res, 200, result);
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

export default router;