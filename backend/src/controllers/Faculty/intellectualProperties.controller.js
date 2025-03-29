import IntellectualProperties from '../../models/Faculty/intellectualProperties.js';
import { formattedResponse } from '../../utils/ApiResponse.js';

export const addIntellectualProperty = async (req, res) => {
    try {
        const ipData = req.body;
        const newIP = new IntellectualProperties(ipData);
        await newIP.save();

        return formattedResponse(200, newIP, 'Intellectual property added successfully');
    } catch (error) {
        return formattedResponse(400, null, "Error adding intellectual property");
    }
};

export const updateIntellectualProperty = async (req, res) => {
    try {
        const { id, ipData } = req.body;
        const updatedIP = await IntellectualProperties.findByIdAndUpdate(id, ipData, { new: true });

        if (!updatedIP) {
            return formattedResponse(404, null, "Intellectual property not found");
        }

        return formattedResponse(200, updatedIP, 'Intellectual property updated successfully');
    } catch (error) {
        return formattedResponse(400, null, "Error updating intellectual property");
    }
};
