import mongoose from 'mongoose';

const SubjectSchema = new mongoose.Schema({
    subject_code: { 
        type: String, 
        required: true 
    },
    subject_name: { 
        type: String, 
        required: true 
    },
    department_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Department'
    },
    semester_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Semester' 
    },
    faculty_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Faculty', 
        required: true 
    },
}, { 
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at' 
    } 
});

export default mongoose.model('Subject', SubjectSchema);
