import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
    department_name: { 
        type: String, 
        required: true 
    },
    head_of_department: { 
        type: String, 
        required: true 
    },
    college_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'College', 
        required: true 
    },
}, { 
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at' 
    } 
}); 

export default mongoose.model('Department', DepartmentSchema);
