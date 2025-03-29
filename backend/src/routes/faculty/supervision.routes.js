import { Router } from 'express';
import { addSupervision, updateSupervision } from '../../controllers/Faculty/supervision.controller.js';
import { sendResponse } from '../../utils/ApiResponse.js';

const router = Router();

// Create a new supervision
router.post('/add', async (req, res) => {
    try {
        const result = await addSupervision(req, res);
        return sendResponse(res, 201, result, 'Supervision added successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

// Update a supervision
router.put('/update', async (req, res) => {
    try {
        const result = await updateSupervision(req, res);
        return sendResponse(res, 200, result, 'Supervision updated successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

export default router;
