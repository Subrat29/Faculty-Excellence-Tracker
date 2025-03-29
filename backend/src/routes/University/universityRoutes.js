import express from 'express';
import UniversityController from '../../controllers/University/universityController.js';
import { sendResponse } from '../../utils/ApiResponse.js';

const router = express.Router();

router.post('/upload', async (req, res) => {
    try {
        const result = await UniversityController.createUniversity(req, res);
        return sendResponse(res, 201, result, 'University created successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

router.get('/fetch', async (req, res) => {
    try {
        const universities = await UniversityController.getUniversities(req, res);
        return sendResponse(res, 200, universities);
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const updatedUniversity = await UniversityController.updateUniversity(req, res);
        return sendResponse(res, 200, updatedUniversity, 'University updated successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await UniversityController.deleteUniversity(req, res);
        return sendResponse(res, 200, null, 'University deleted successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

export default router;
