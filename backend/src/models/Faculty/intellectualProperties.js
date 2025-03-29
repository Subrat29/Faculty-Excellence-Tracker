import mongoose from 'mongoose';

const intellectualPropertySchema = new mongoose.Schema({
    faculty_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Faculty' 
    },
    ip_title: { 
        type: String 
    },
    type: { 
        type: String, 
        enum: ['Patent', 'Trademark', 'Copyright', 'Innovation'] 
    },
    applicant_name: { 
        type: [String] // Array to allow multiple applicants
    },
    ip_number: { 
        type: String 
    },
    filing_country: { 
        type: String 
    },
    subject_category: { 
        type: String 
    },
    filing_date: { 
        type: Date
         
    },
    publication_date: { 
        type: Date 
    },
    status: { 
        type: String, 
        enum: ['Filed', 'Granted', 'Published'], 
        default: 'Filed' 
    },
    description: { 
        type: String 
    },
    document_url: { 
        type: String 
    }
});

export default mongoose.model('IntellectualProperty', intellectualPropertySchema);
