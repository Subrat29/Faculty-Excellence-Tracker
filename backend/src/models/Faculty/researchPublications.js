import mongoose from 'mongoose';

const researchPublicationSchema = new mongoose.Schema({
    faculty_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Faculty' 
    },
    publication_type: { 
        type: String
    },
    title: { 
        type: String
    },
    journal_or_book_name: { 
        type: String
    },
    publisher: { 
        type: String 
    },
    publication_date: { 
        type: Date
    },
    authors: { 
        type: [String]
    },
    url: { 
        type: String 
    },
    doi: { 
        type: String 
    },
    volume: { 
        type: String 
    },
    page_no: { 
        type: String 
    },
    number: { // New field for issue number
        type: String 
    },
    year: { // New field for publication year
        type: Number 
    },
    document_type: { // New field for document type
        type: String 
    },
    access_type: { // New field for access type
        type: String 
    },
    editor: { 
        type: String 
    },
    citation_count: { 
        type: Number, 
        default: 0 
    },
    impact_factor: { 
        type: Number 
    },
    abstract: { 
        type: String 
    },
    funding_source: { 
        type: String 
    },
    is_peer_reviewed: { 
        type: Boolean, 
        default: false 
    }
});

export default mongoose.model('ResearchPublication', researchPublicationSchema);

