import express from 'express';
import CollegeController from '../../controllers/University/collegeController.js';
import { sendResponse } from '../../utils/ApiResponse.js';

const router = express.Router();

// Create a new college
router.post('/upload', async (req, res) => {
    try {
        const result = await CollegeController.createCollege(req, res);
        return sendResponse(res, 201, result, 'College created successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

// Get all colleges
router.get('/fetch', async (req, res) => {
    try {
        const colleges = await CollegeController.getColleges(req, res);
        return sendResponse(res, 200, colleges);
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

// Update a college by ID
router.put('/update/:id', async (req, res) => {
    try {
        const updatedCollege = await CollegeController.updateCollege(req, res);
        return sendResponse(res, 200, updatedCollege, 'College updated successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

// Delete a college by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        await CollegeController.deleteCollege(req, res);
        return sendResponse(res, 200, null, 'College deleted successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

export default router;
