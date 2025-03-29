import StudentFeedback from '../../models/student/StudentFeedback.js';
import { formattedResponse } from '../../utils/ApiResponse.js';

// Feedback Controllers
export const addStudentFeedback = async (req, res) => {
    try {
        const feedback = new StudentFeedback(req.body);
        await feedback.save();
        return formattedResponse(201, feedback, 'Feedback added successfully');
    } catch (error) {
        return formattedResponse(400, null, error.message || 'An unexpected error occurred');
    }
};

export const getFeedbackWithPagination = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const feedback = await StudentFeedback.find()
            .populate('session_id')
            .skip(skip)
            .limit(limit);
        const total = await StudentFeedback.countDocuments();
        return formattedResponse(200, {
            feedback,
            pagination: {
                current: page,
                total: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        return formattedResponse(500, null, error.message);
    }
};

// Search functionality
export const searchFeedback = async (req, res) => {
    try {
        const { query } = req.query;
        const results = await StudentFeedback.find({
            feedback_text: new RegExp(query, 'i')
        }).limit(5);
       
        return formattedResponse(200, results);
    } catch (error) {
        return formattedResponse(500, null, error.message);
    }
};