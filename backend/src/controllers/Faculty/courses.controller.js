import Courses from '../../models/Faculty/courseName.js';
import { formattedResponse } from '../../utils/ApiResponse.js';

export const addCourse = async (req, res) => {
    try {
        const courseData = req.body;
        const newCourse = new Courses(courseData);
        await newCourse.save();

        return formattedResponse(200, newCourse, 'Course added successfully');
    } catch (error) {
        return formattedResponse(400, null, "Error adding course");
    }
};

export const updateCourse = async (req, res) => {
    try {
        const { id, courseData } = req.body;
        const updatedCourse = await Courses.findByIdAndUpdate(id, courseData, { new: true });

        if (!updatedCourse) {
            return formattedResponse(404, null, "Course not found");
        }

        return formattedResponse(200, updatedCourse, 'Course updated successfully');
    } catch (error) {
        return formattedResponse(400, null, "Error updating course");
    }
};
