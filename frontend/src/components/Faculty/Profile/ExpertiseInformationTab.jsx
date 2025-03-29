import React, { useState } from 'react';
import { Edit2, Trash2, Plus, X, Check, Lightbulb } from 'lucide-react';

function ExpertiseInformationTab() {
    const [expertise, setExpertise] = useState([
        "Machine Learning",
        "Artificial Intelligence",
        "Data Science",
        "Computer Vision",
        "Natural Language Processing"
    ]);

    const [editingIndex, setEditingIndex] = useState(null);
    const [newExpertise, setNewExpertise] = useState("");

    const handleAddExpertise = () => {
        if (newExpertise.trim()) {
            setExpertise([...expertise, newExpertise.trim()]);
            setNewExpertise("");
        } else {
            alert("Please enter an expertise area");
        }
    };

    const handleEditExpertise = (index) => {
        setEditingIndex(index);
    };

    const handleSaveEdit = (index) => {
        const updatedExpertise = [...expertise];
        if (updatedExpertise[index].trim()) {
            setExpertise(updatedExpertise);
            setEditingIndex(null);
        } else {
            alert("Expertise area cannot be empty");
        }
    };

    const handleDeleteExpertise = (index) => {
        const updatedExpertise = expertise.filter((_, i) => i !== index);
        setExpertise(updatedExpertise);
    };

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Research Expertise</h2>
                <button 
                    onClick={() => setNewExpertise("new")} 
                    className="text-green-600 hover:bg-green-100 p-2 rounded-full"
                >
                    <Plus />
                </button>
            </div>

            {newExpertise && (
                <div className="flex items-center mb-4 pb-4 border-b bg-green-50 p-4 rounded">
                    <div className="flex items-center flex-grow">
                        <Lightbulb className="text-yellow-600 mr-2" size={18} />
                        <input 
                            className="flex-grow border p-1 rounded mr-2"
                            value={newExpertise === "new" ? "" : newExpertise}
                            onChange={(e) => setNewExpertise(e.target.value)}
                            placeholder="Enter new expertise area"
                        />
                    </div>
                    <div className="flex ml-4">
                        <button 
                            onClick={handleAddExpertise} 
                            className="text-green-600 hover:bg-green-100 p-2 rounded-full mr-2"
                        >
                            <Check />
                        </button>
                        <button 
                            onClick={() => setNewExpertise("")} 
                            className="text-red-600 hover:bg-red-100 p-2 rounded-full"
                        >
                            <X />
                        </button>
                    </div>
                </div>
            )}

            <div className="flex flex-wrap gap-3">
                {expertise.map((skill, index) => (
                    <div key={index} className="flex items-center">
                        {editingIndex === index ? (
                            <div className="flex items-center">
                                <input 
                                    className="border p-1 rounded mr-2"
                                    value={skill}
                                    onChange={(e) => {
                                        const updatedExpertise = [...expertise];
                                        updatedExpertise[index] = e.target.value;
                                        setExpertise(updatedExpertise);
                                    }}
                                />
                                <button 
                                    onClick={() => handleSaveEdit(index)} 
                                    className="text-green-600 hover:bg-green-100 p-1 rounded-full mr-1"
                                >
                                    <Check size={16} />
                                </button>
                                <button 
                                    onClick={() => setEditingIndex(null)} 
                                    className="text-red-600 hover:bg-red-100 p-1 rounded-full"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full mr-2">
                                    {skill}
                                </span>
                                <button 
                                    onClick={() => handleEditExpertise(index)} 
                                    className="text-blue-600 hover:bg-blue-100 p-1 rounded-full mr-1"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button 
                                    onClick={() => handleDeleteExpertise(index)} 
                                    className="text-red-600 hover:bg-red-100 p-1 rounded-full"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExpertiseInformationTab;