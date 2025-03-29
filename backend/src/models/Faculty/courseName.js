import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    course_name: { 
        type: String
    },
    course_duration: { 
        type: Number
    },
    degree_type: { 
        type: String 
    }
});

export default mongoose.model('Courses', courseSchema);