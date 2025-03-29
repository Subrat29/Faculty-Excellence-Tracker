import { Router } from 'express';
import { addIntellectualProperty, updateIntellectualProperty } from '../../controllers/Faculty/intellectualProperties.controller.js';
import { sendResponse } from '../../utils/ApiResponse.js';

const router = Router();

// Create a new intellectual property
router.post('/add', async (req, res) => {
    try {
        const result = await addIntellectualProperty(req, res);
        return sendResponse(res, 201, result, 'Intellectual property added successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

// Update an intellectual property
router.put('/update', async (req, res) => {
    try {
        const result = await updateIntellectualProperty(req, res);
        return sendResponse(res, 200, result, 'Intellectual property updated successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

export default router;