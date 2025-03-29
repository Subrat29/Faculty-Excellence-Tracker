import StudentProfile from '../../models/student/StudentProfile.js';
import { uploadOnCloudinary } from '../../utils/cloudinary.js';
import { formattedResponse } from '../../utils/ApiResponse.js';

export const updateStudentProfile = async (req, res) => {
    try {
        const { student_id, ...updateData } = req.body;
        const updatedProfile = await StudentProfile.findByIdAndUpdate(
            student_id,
            updateData,
            { new: true }
        );

        if (!updatedProfile) {
            return formattedResponse(404, null, 'Student profile not found');
        }

        return formattedResponse(200, updatedProfile, 'Profile updated successfully');
    } catch (error) {
        return formattedResponse(400, null, error.message);
    }
};

export const fetchStudentDetails = async (req, res) => {
    try {
        const { student_id } = req.params;
        const studentDetails = await StudentProfile.findById(student_id)
            .populate('semester_id')
            .populate('college_id')
            .populate('department_id')
            .populate('session_id');

        if (!studentDetails) {
            return formattedResponse(404, null, 'Student not found');
        }

        return formattedResponse(200, studentDetails);
    } catch (error) {
        return formattedResponse(500, null, error.message);
    }
};

export const updateStudentAvatar = async (req, res) => {
    try {
        const avatarLocalPath = req.file?.path;

        if (!avatarLocalPath) {
            return formattedResponse(400, null, "Avatar file is missing");
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath);

        if (!avatar.url) {
            return formattedResponse(400, null, "Error while uploading avatar");
        }

        const student = await StudentProfile.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    avatar: avatar.url,
                },
            },
            { new: true }
        ).select("-password");

        if (!student) {
            return formattedResponse(404, null, "Student not found");
        }

        return formattedResponse(200, student, "Avatar image updated successfully");
    } catch (error) {
        return formattedResponse(500, null, error.message);
    }
};

export const searchAcrossCollections = async (req, res) => {
    try {
        const { query } = req.query;
        const results = {
            students: await StudentProfile.find({ 
                $or: [
                    { name: new RegExp(query, 'i') },
                    { email: new RegExp(query, 'i') }
                ]
            }).limit(5),
            subjects: await Subject.find({ 
                $or: [
                    { subject_code: new RegExp(query, 'i') },
                    { subject_name: new RegExp(query, 'i') }
                ]
            }).limit(5),
        };
        
        return formattedResponse(200, results);
    } catch (error) {
        return formattedResponse(500, null, error.message);
    }
};
 