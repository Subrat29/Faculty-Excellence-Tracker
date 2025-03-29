import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema({
    faculty_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Faculty' 
    },
    subject_id: { 
        type: String, 
        required: true 
    },
    total_lectures: { 
        type: Number  
    },
    session_id: { 
        type: String  
    },
    semester_id: { 
        type: String  
    },
    mode: { 
        type: String, 
        enum: ['Online', 'Offline', 'Hybrid']  
    },
    number_of_students: { 
        type: Number  
    }
});

export default mongoose.model('Lectures', lectureSchema);