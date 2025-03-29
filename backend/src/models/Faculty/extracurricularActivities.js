import mongoose from 'mongoose';

const extracurricularActivitySchema = new mongoose.Schema({
    faculty_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Faculty' 
    },
    title: { 
        type: String
    },
    type: { 
        type: String
    },
    start_date: { 
        type: Date  },
    end_date: { 
        type : Date 
    }
});

export default mongoose.model('ExtracurricularActivities', extracurricularActivitySchema);