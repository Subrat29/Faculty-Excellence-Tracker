import express from 'express';
import SessionController from '../../controllers/University/sessionController.js';
import { sendResponse } from '../../utils/ApiResponse.js';

const router = express.Router();

// Create a new session
router.post('/upload', async (req, res) => {
    try {
        const result = await SessionController.createSession(req, res);
        return sendResponse(res, 201, result, 'Session created successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

// Get all sessions
router.get('/fetch', async (req, res) => {
    try {
        const sessions = await SessionController.getSessions(req, res);
        return sendResponse(res, 200, sessions);
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

// Update a session by ID
router.put('/update/:id', async (req, res) => {
    try {
        const updatedSession = await SessionController.updateSession(req, res);
        return sendResponse(res, 200, updatedSession, 'Session updated successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

// Delete a session by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        await SessionController.deleteSession(req, res);
        return sendResponse(res, 200, null, 'Session deleted successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

export default router;
