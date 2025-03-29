import mongoose from 'mongoose';

const SemesterSchema = new mongoose.Schema({
    semester: { 
        type: Number, 
        required: true 
    },
}, { 
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at' 
    } 
});

export default mongoose.model('Semester', SemesterSchema);
