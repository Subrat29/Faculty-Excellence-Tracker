import Supervision from '../../models/Faculty/supervision.js';
import { formattedResponse } from '../../utils/ApiResponse.js';

export const addSupervision = async (req, res) => {
    try {
        const supervisionData = req.body;
        const newSupervision = new Supervision(supervisionData);
        await newSupervision.save();

        return formattedResponse(200, newSupervision, 'Supervision record added successfully');
    } catch (error) {
        return formattedResponse(400, null, "Error adding supervision record");
    }
};

export const updateSupervision = async (req, res) => {
    try {
        const { id, supervisionData } = req.body;
        const updatedSupervision = await Supervision.findByIdAndUpdate(id, supervisionData, { new: true });

        if (!updatedSupervision) {
            return formattedResponse(404, null, "Supervision record not found");
        }

        return formattedResponse(200, updatedSupervision, 'Supervision record updated successfully');
    } catch (error) {
        return formattedResponse(400, null, "Error updating supervision record");
    }
};
