import Lectures from '../../models/Faculty/lectures.js';
import { formattedResponse } from '../../utils/ApiResponse.js';

// Function to add lecture activities
export const addLectureActivity = async (req, res) => {
    try {
        const lectureData = req.body;
        const newLecture = new Lectures(lectureData);
        await newLecture.save();
        
        return formattedResponse(200, newLecture, 'Lecture activity added successfully');
    } catch (error) {
        return formattedResponse(400, null, "Error adding lecture activity");
    }
};

// Function to update faculty activities
export const updateLectureActivity = async (req, res) => {
    try {
        const { id, lectureData } = req.body; // Assuming the request body contains an id and the data to update
        const updatedLecture = await Lectures.findByIdAndUpdate(id, lectureData, { new: true });
        
        if (!updatedLecture) {
            return formattedResponse(404, null, "Lecture activity not found");
        }
        
        return formattedResponse(200, updatedLecture, 'Lecture activity updated successfully');
    } catch (error) {
        return formattedResponse(400, null, "Error updating lecture activity");
    }
};
