import mongoose from 'mongoose';

const StudentProfileSchema = new mongoose.Schema({
    _id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
     roll_number: { 
        type: String
    },
    name: { 
        type: String, 
        required: true 
    },
    avatar: { 
        type: String, 
        default: null 
    },
    email: { 
        type: String, 
        required: true 
    },
    semester_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Semester'
    },
    college_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'College'
    },
    department_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Department'
    },
    session_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Session'
    },
}, { 
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at' 
    } 
});

export default mongoose.model('StudentProfile', StudentProfileSchema);
