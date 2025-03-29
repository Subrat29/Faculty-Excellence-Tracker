import Events from '../../models/Faculty/events.js';
import { formattedResponse } from '../../utils/ApiResponse.js';

export const addEvent = async (req, res) => {
    try {
        const eventData = req.body;
        const newEvent = new Events(eventData);
        await newEvent.save();

        return formattedResponse(200, newEvent, 'Event added successfully');
    } catch (error) {
        return formattedResponse(400, null, "Error adding event");
    }
};

export const updateEvent = async (req, res) => {
    try {
        const { id, eventData } = req.body;
        const updatedEvent = await Events.findByIdAndUpdate(id, eventData, { new: true });

        if (!updatedEvent) {
            return formattedResponse(404, null, "Event not found");
        }

        return formattedResponse(200, updatedEvent, 'Event updated successfully');
    } catch (error) {
        return formattedResponse(400, null, "Error updating event");
    }
};
