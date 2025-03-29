import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
    session_name: { 
        type: String, 
        required: true,
        unique: true
    },
    start_date: { 
        type: Date, 
        required: true 
    },
    end_date: { 
        type: Date, 
        required: true 
    },
    is_active: { 
        type: Boolean, 
        default: true 
    },
}, { 
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at' 
    } 
});

export default mongoose.model('Session', SessionSchema);
