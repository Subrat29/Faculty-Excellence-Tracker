import mongoose from 'mongoose';

const UniversitySchema = new mongoose.Schema({
    university_name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    contact_number: { 
        type: String, 
        default: null 
    },
    email: { 
        type: String, 
        default: null 
    },
    website: { 
        type: String, 
        default: null 
    },
    established_year: { 
        type: Number, 
        default: null 
    },
    session_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Session', 
        default: null
    },
}, { 
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at' 
    } 
});

export default mongoose.model('University', UniversitySchema);
