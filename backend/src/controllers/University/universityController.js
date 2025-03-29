import University from '../../models/universityModel/UniversityM.js';
import { formattedResponse } from '../../utils/ApiResponse.js';

class UniversityController {
    static async createUniversity(req, res) {
        try {
            const university = new University(req.body);
            const result = await university.save();
            return formattedResponse(201, result, 'University created successfully');
        } catch (error) {
            return formattedResponse(500, null, error.message);
        }
    }

    static async getUniversities(req, res) {
        try {
            const universities = await University.find();
            return formattedResponse(200, universities);
        } catch (error) {
            return formattedResponse(500, null, error.message);
        }
    }

    static async updateUniversity(req, res) {
        try {
            const { id } = req.params;
            const updatedUniversity = await University.findByIdAndUpdate(id, req.body, { new: true });
            return formattedResponse(200, updatedUniversity, 'University updated successfully');
        } catch (error) {
            return formattedResponse(500, null, error.message);
        }
    }

    static async deleteUniversity(req, res) {
        try {
            const { id } = req.params;
            await University.findByIdAndDelete(id);
            return formattedResponse(200, null, 'University deleted successfully');
        } catch (error) {
            return formattedResponse(500, null, error.message);
        }
    }
}

export default UniversityController;