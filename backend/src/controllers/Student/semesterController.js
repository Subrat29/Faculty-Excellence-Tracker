import Semester from '../../models/student/Semester.js';
import { formattedResponse } from '../../utils/ApiResponse.js';

export const addSemester = async (req, res) => {
    try {
        
        const semester = new Semester(req.body);
        await semester.save();
        return formattedResponse(201, semester, 'Semester added successfully');
    } catch (error) {
        
        return formattedResponse(400, null, error.message);
    }
};

export const getSemestersWithSort = async (req, res) => {
    try {
        const semesters = await Semester.find().sort({ semester: 1 });
        return formattedResponse(200, semesters);
    } catch (error) {
        return formattedResponse(500, null, error.message);
    }
};
