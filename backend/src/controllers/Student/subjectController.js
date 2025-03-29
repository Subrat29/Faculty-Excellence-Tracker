import Subject from '../../models/student/Subject.js';
import { formattedResponse } from '../../utils/ApiResponse.js';

export const addSubject = async (req, res) => {
    try {
        const subject = new Subject(req.body);
        await subject.save();
        return formattedResponse(201, subject, 'Subject added successfully');
    } catch (error) {
        return formattedResponse(400, null, error.message);
    }
};

export const getSubjectsWithFilters = async (req, res) => {
    try {
        const { search, department, semester } = req.query;
        const query = {};

        if (search) {
            query.$or = [
                { subject_code: new RegExp(search, 'i') },
                { subject_name: new RegExp(search, 'i') }
            ];
        }

        if (department) query.department_id = department;
        if (semester) query.semester = semester;

        const subjects = await Subject.find(query);
        return formattedResponse(200, subjects);
    } catch (error) {
        return formattedResponse(500, null, error.message);
    }
};
