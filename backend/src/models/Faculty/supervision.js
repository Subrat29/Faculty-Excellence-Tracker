import mongoose from 'mongoose';

const supervisionSchema = new mongoose.Schema({
    faculty_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Faculty' 
    },
    student_id: { 
        type: String, 
        required: true 
    },
    program: { 
        type: String  
    },
    topic: { 
        type: String 
    },
    start_date: { 
        type: Date 
    },
    status: { 
        type: String 
    }
});

export default mongoose.model('Supervision', supervisionSchema);