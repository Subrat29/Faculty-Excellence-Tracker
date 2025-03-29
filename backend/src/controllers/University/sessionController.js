import Session from '../../models/universityModel/Session.js';
import { formattedResponse } from '../../utils/ApiResponse.js';

class SessionController {
    static async createSession(req, res) {
        try {
            const session = new Session(req.body);
            const result = await session.save();
            return formattedResponse(201, result, 'Session created successfully');
        } catch (error) {
            return formattedResponse(500, null, error.message);
        }
    }

    static async getSessions(req, res) {
        try {
            const sessions = await Session.find();
            return formattedResponse(200, sessions);
        } catch (error) {
            return formattedResponse(500, null, error.message);
        }
    }

    static async updateSession(req, res) {
        try {
            const { id } = req.params;
            const updatedSession = await Session.findByIdAndUpdate(id, req.body, { new: true });
            return formattedResponse(200, updatedSession, 'Session updated successfully');
        } catch (error) {
            return formattedResponse(500, null, error.message);
        }
    }

    static async deleteSession(req, res) {
        try {
            const { id } = req.params;
            await Session.findByIdAndDelete(id);
            return formattedResponse(200, null, 'Session deleted successfully');
        } catch (error) {
            return formattedResponse(500, null, error.message);
        }
    }
}

export default SessionController;