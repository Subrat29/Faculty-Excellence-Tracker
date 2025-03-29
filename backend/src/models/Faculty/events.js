import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    faculty_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Faculty' 
    },
    type: { 
        type: String 
    },
    title: { 
        type: String 
    },
    start_date: { 
        type: Date 
    }
});

export default mongoose.model('Events', eventSchema);