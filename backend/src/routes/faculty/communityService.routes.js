import { Router } from 'express';
import { addCommunityService, updateCommunityService } from '../../controllers/Faculty/communityService.controller.js';
import { sendResponse } from '../../utils/ApiResponse.js';

const router = Router();

// Create a new community service
router.post('/add', async (req, res) => {
    try {
        const result = await addCommunityService(req, res);
        return sendResponse(res, 201, result, 'Community service added successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

// Update a community service
router.put('/update', async (req, res) => {
    try {
        const result = await updateCommunityService(req, res);
        return sendResponse(res, 200, result, 'Community service updated successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

export default router;