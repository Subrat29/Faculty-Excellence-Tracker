import mongoose from 'mongoose';

const communityServiceSchema = new mongoose.Schema({
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
    description: { 
        type: String  
    },
    start_date: { 
        type: Date  
    },
    end_date: { 
        type: Date  
    }
});

export default mongoose.model('CommunityService', communityServiceSchema);