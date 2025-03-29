import College from '../../models/universityModel/College.js';
import { formattedResponse } from '../../utils/ApiResponse.js';

class CollegeController {
    static async createCollege(req, res) {
        try {
            const college = new College(req.body);
            await college.save();
            return formattedResponse(201, college, 'College created successfully');
        } catch (error) {
            return formattedResponse(500, null, error.message);
        }
    }

    static async getColleges(req, res) {
        try {
            const colleges = await College.find().populate('university_id');
            return formattedResponse(200, colleges);
        } catch (error) {
            return formattedResponse(500, null, error.message);
        }
    }

    static async updateCollege(req, res) {
        try {
            const { id } = req.params;
            const updatedCollege = await College.findByIdAndUpdate(id, req.body, { new: true });
            
            if (!updatedCollege) {
                return formattedResponse(404, null, 'College not found');
            }

            return formattedResponse(200, updatedCollege, 'College updated successfully');
        } catch (error) {
            return formattedResponse(500, null, error.message);
        }
    }

    static async deleteCollege(req, res) {
        try {
            const { id } = req.params;
            const deletedCollege = await College.findByIdAndDelete(id);
            
            if (!deletedCollege) {
                return formattedResponse(404, null, 'College not found');
            }

            return formattedResponse(200, null, 'College deleted successfully');
        } catch (error) {
            return formattedResponse(500, null, error.message);
        }
    }
}

export default CollegeController;