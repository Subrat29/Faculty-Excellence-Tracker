import { Router } from 'express';
import { addEvent, updateEvent } from '../../controllers/Faculty/events.controller.js';
import { sendResponse } from '../../utils/ApiResponse.js';

const router = Router();

// Create a new event
router.post('/add', async (req, res) => {
    try {
        const result = await addEvent(req, res);
        return sendResponse(res, 201, result, 'Event added successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

// Update an event
router.put('/update', async (req, res) => {
    try {
        const result = await updateEvent(req, res);
        return sendResponse(res, 200, result, 'Event updated successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

export default router;
