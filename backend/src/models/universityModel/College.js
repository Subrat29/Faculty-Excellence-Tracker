import mongoose from 'mongoose';

const CollegeSchema = new mongoose.Schema({
    university_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'University', 
        required: true 
    },
    college_name: {
        type: String,
        required: true
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
    director_name: { 
        type: String, 
        required: true 
    },
}, { 
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at' 
    } 
}); 

export default mongoose.model('College', CollegeSchema);
