import express from 'express';
import DepartmentController from '../../controllers/University/departmentController.js';
import { sendResponse } from '../../utils/ApiResponse.js';

const router = express.Router();

// Create a new department
router.post('/upload', async (req, res) => {
    try {
        const result = await DepartmentController.createDepartment(req, res);
        return sendResponse(res, 201, result, 'Department created successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

// Get all departments
router.get('/fetch', async (req, res) => {
    try {
        const departments = await DepartmentController.getDepartments(req, res);
        return sendResponse(res, 200, departments);
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

// Update a department by ID
router.put('/update/:id', async (req, res) => {
    try {
        const updatedDepartment = await DepartmentController.updateDepartment(req, res);
        return sendResponse(res, 200, updatedDepartment, 'Department updated successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

// Delete a department by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        await DepartmentController.deleteDepartment(req, res);
        return sendResponse(res, 200, null, 'Department deleted successfully');
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
});

export default router;
