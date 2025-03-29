import CommunityService from '../../models/Faculty/communityService.js';
import { formattedResponse } from '../../utils/ApiResponse.js';

export const addCommunityService = async (req, res) => {
    try {
        const serviceData = req.body;
        const newService = new CommunityService(serviceData);
        await newService.save();

        return formattedResponse(200, newService, 'Community service added successfully');
    } catch (error) {
        return formattedResponse(400, null, "Error adding community service");
    }
};

export const updateCommunityService = async (req, res) => {
    try {
        const { id, serviceData } = req.body;
        const updatedService = await CommunityService.findByIdAndUpdate(id, serviceData, { new: true });

        if (!updatedService) {
            return formattedResponse(404, null, "Community service not found");
        }

        return formattedResponse(200, updatedService, 'Community service updated successfully');
    } catch (error) {
        return formattedResponse(400, null, "Error updating community service");
    }
};
