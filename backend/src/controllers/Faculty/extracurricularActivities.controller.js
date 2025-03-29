import ExtracurricularActivities from '../../models/Faculty/extracurricularActivities.js';
import { formattedResponse } from '../../utils/ApiResponse.js';

export const addExtracurricularActivity = async (req, res) => {
    try {
        const activityData = req.body;
        const newActivity = new ExtracurricularActivities(activityData);
        await newActivity.save();

        return formattedResponse(200, newActivity, 'Extracurricular activity added successfully');
    } catch (error) {
        return formattedResponse(400, null, "Error adding extracurricular activity");
    }
};

export const updateExtracurricularActivity = async (req, res) => {
    try {
        const { id, activityData } = req.body;
        const updatedActivity = await ExtracurricularActivities.findByIdAndUpdate(id, activityData, { new: true });

        if (!updatedActivity) {
            return formattedResponse(404, null, "Extracurricular activity not found");
        }

        return formattedResponse(200, updatedActivity, 'Extracurricular activity updated successfully');
    } catch (error) {
        return formattedResponse(400, null, "Error updating extracurricular activity");
    }
};
