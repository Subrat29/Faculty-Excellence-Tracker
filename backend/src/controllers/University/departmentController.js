import Department from '../../models/universityModel/Department.js';
import { formattedResponse } from '../../utils/ApiResponse.js';

class DepartmentController {
    static async createDepartment(req, res) {
        try {
            const department = new Department(req.body);
            const result = await department.save();
            return formattedResponse(201, result, 'Department created successfully');
        } catch (error) {
            return formattedResponse(500, null, error.message);
        }
    }

    static async getDepartments(req, res) {
        try {
            const departments = await Department.find().populate('college_id');
            return formattedResponse(200, departments);
        } catch (error) {
            return formattedResponse(500, null, error.message);
        }
    }

    static async updateDepartment(req, res) {
        try {
            const { id } = req.params;
            const updatedDepartment = await Department.findByIdAndUpdate(id, req.body, { new: true });
            return formattedResponse(200, updatedDepartment, 'Department updated successfully');
        } catch (error) {
            return formattedResponse(500, null, error.message);
        }
    }

    static async deleteDepartment(req, res) {
        try {
            const { id } = req.params;
            await Department.findByIdAndDelete(id);
            return formattedResponse(200, null, 'Department deleted successfully');
        } catch (error) {
            return formattedResponse(500, null, error.message);
        }
    }
}

export default DepartmentController;