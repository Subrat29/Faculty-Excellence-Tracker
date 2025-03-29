import React, { useState } from 'react';
import { Edit2, Trash2, Plus, X, Check, Calendar, GraduationCap, Building2, UserCircle2, CheckCircle2 } from 'lucide-react';

function DoctoralThesesGuidedTab() {
    const [theses, setTheses] = useState([
        {
            "id": 1,
            "program": "Ph.D.",
            "year": "2023",
            "title": "Graph Signal Processing and Geometric Deep Learning in Optical Mesh Networks",
            "institution": "IIT Delhi",
            "student": "Anurag Prakash",
            "status": "Ongoing",
        },
        {
            "id": 2,
            "program": "M.Phil.",
            "year": "2022",
            "title": "Trust Models for Social IoT Networks",
            "institution": "IIT Delhi",
            "student": "Nishit Narang",
            "status": "Completed",
        }
    ]);

    const [editingThesis, setEditingThesis] = useState(null);
    const [newThesis, setNewThesis] = useState(null);

    const handleEdit = (thesis) => {
        setEditingThesis({...thesis});
    };

    const handleDelete = (id) => {
        setTheses(theses.filter(thesis => thesis.id !== id));
    };

    const handleSaveEdit = () => {
        if (editingThesis && Object.values(editingThesis).every(val => val !== "")) {
            setTheses(theses.map(thesis => 
                thesis.id === editingThesis.id ? editingThesis : thesis
            ));
            setEditingThesis(null);
        }
    };

    const handleAddNew = () => {
        setNewThesis({
            id: Date.now(),
            program: "",
            year: "",
            title: "",
            institution: "",
            student: "",
            status: ""
        });
    };

    const handleSaveNew = () => {
        if (newThesis && 
            newThesis.program && 
            newThesis.year && 
            newThesis.title && 
            newThesis.institution && 
            newThesis.student && 
            newThesis.status
        ) {
            setTheses([...theses, newThesis]);
            setNewThesis(null);
        } else {
            alert("Please fill in all fields");
        }
    };

    const renderInputWithIcon = (icon, color, value, onChange, placeholder) => (
        <div className="flex items-center border rounded">
            <span className={`pl-2 ${color}`}>{React.cloneElement(icon, { size: 18 })}</span>
            <input 
                className="p-1 pl-2 w-full rounded outline-none"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );

    const renderThesisContent = (thesis, isEditing) => {
        if (isEditing) {
            return (
                <div className="flex-grow grid grid-cols-2 gap-3">
                    {renderInputWithIcon(
                        <GraduationCap />, 
                        "text-purple-600", 
                        thesis.program, 
                        (e) => setEditingThesis({...thesis, program: e.target.value}), 
                        "Program"
                    )}
                    {renderInputWithIcon(
                        <Calendar />, 
                        "text-blue-600", 
                        thesis.year, 
                        (e) => setEditingThesis({...thesis, year: e.target.value}), 
                        "Year"
                    )}
                    {renderInputWithIcon(
                        <UserCircle2 />, 
                        "text-green-600", 
                        thesis.student, 
                        (e) => setEditingThesis({...thesis, student: e.target.value}), 
                        "Student"
                    )}
                    {renderInputWithIcon(
                        <Building2 />, 
                        "text-red-600", 
                        thesis.institution, 
                        (e) => setEditingThesis({...thesis, institution: e.target.value}), 
                        "Institution"
                    )}
                    <div className="col-span-2">
                        <input 
                            className="w-full border p-1 rounded"
                            value={thesis.title}
                            onChange={(e) => setEditingThesis({...thesis, title: e.target.value})}
                            placeholder="Thesis Title"
                        />
                    </div>
                    {renderInputWithIcon(
                        <CheckCircle2 />, 
                        "text-orange-600", 
                        thesis.status, 
                        (e) => setEditingThesis({...thesis, status: e.target.value}), 
                        "Status"
                    )}
                </div>
            );
        }

        return (
            <div className="flex-grow">
                <h3 className="text-lg font-semibold">{thesis.title}</h3>
                <div className="flex items-center text-gray-600 mt-1">
                    <Building2 size={16} className="mr-2 text-red-600" />
                    <span>{thesis.institution}</span>
                </div>
                <div className="flex items-center text-gray-700 mt-1">
                    <UserCircle2 size={16} className="mr-2 text-green-600" />
                    <span>{thesis.student}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                    <CheckCircle2 size={14} className="mr-2 text-orange-600" />
                    <span>{thesis.status}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Doctoral Theses Guided</h2>
                <button 
                    onClick={handleAddNew} 
                    className="text-green-600 hover:bg-green-100 p-2 rounded-full"
                >
                    <Plus />
                </button>
            </div>

            {newThesis && (
                <div className="flex items-center mb-4 pb-4 border-b bg-green-50 p-4 rounded">
                    <div className="flex-grow grid grid-cols-2 gap-3">
                        {renderInputWithIcon(
                            <GraduationCap />, 
                            "text-purple-600", 
                            newThesis.program, 
                            (e) => setNewThesis({...newThesis, program: e.target.value}), 
                            "Program"
                        )}
                        {renderInputWithIcon(
                            <Calendar />, 
                            "text-blue-600", 
                            newThesis.year, 
                            (e) => setNewThesis({...newThesis, year: e.target.value}), 
                            "Year"
                        )}
                        {renderInputWithIcon(
                            <UserCircle2 />, 
                            "text-green-600", 
                            newThesis.student, 
                            (e) => setNewThesis({...newThesis, student: e.target.value}), 
                            "Student"
                        )}
                        {renderInputWithIcon(
                            <Building2 />, 
                            "text-red-600", 
                            newThesis.institution, 
                            (e) => setNewThesis({...newThesis, institution: e.target.value}), 
                            "Institution"
                        )}
                        <div className="col-span-2">
                            <input 
                                className="w-full border p-1 rounded"
                                value={newThesis.title}
                                onChange={(e) => setNewThesis({...newThesis, title: e.target.value})}
                                placeholder="Thesis Title"
                            />
                        </div>
                        {renderInputWithIcon(
                            <CheckCircle2 />, 
                            "text-orange-600", 
                            newThesis.status, 
                            (e) => setNewThesis({...newThesis, status: e.target.value}), 
                            "Status"
                        )}
                    </div>
                    <div className="flex ml-4">
                        <button 
                            onClick={handleSaveNew} 
                            className="text-green-600 hover:bg-green-100 p-2 rounded-full mr-2"
                        >
                            <Check />
                        </button>
                        <button 
                            onClick={() => setNewThesis(null)} 
                            className="text-red-600 hover:bg-red-100 p-2 rounded-full"
                        >
                            <X />
                        </button>
                    </div>
                </div>
            )}

            {theses.map((thesis) => (
                <div 
                    key={thesis.id} 
                    className="flex items-center mb-4 pb-4 border-b"
                >
                    <div className="w-20 mr-4 text-right">
                        <div className="flex items-center justify-end">
                            <Calendar size={14} className="mr-1 text-blue-600" />
                            <p className="text-sm text-gray-500 font-semibold">{thesis.year}</p>
                        </div>
                        <div className="flex items-center justify-end">
                            <GraduationCap size={14} className="mr-1 text-purple-600" />
                            <p className="text-xs text-gray-400">{thesis.program}</p>
                        </div>
                    </div>

                    {editingThesis && editingThesis.id === thesis.id ? (
                        <>
                            {renderThesisContent(editingThesis, true)}
                            <div className="flex ml-4">
                                <button 
                                    onClick={handleSaveEdit} 
                                    className="text-green-600 hover:bg-green-100 p-2 rounded-full mr-2"
                                >
                                    <Check />
                                </button>
                                <button 
                                    onClick={() => setEditingThesis(null)} 
                                    className="text-red-600 hover:bg-red-100 p-2 rounded-full"
                                >
                                    <X />
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            {renderThesisContent(thesis, false)}
                            <div className="flex ml-4">
                                <button 
                                    onClick={() => handleEdit(thesis)} 
                                    className="text-blue-600 hover:bg-blue-100 p-2 rounded-full mr-2"
                                >
                                    <Edit2 />
                                </button>
                                <button 
                                    onClick={() => handleDelete(thesis.id)} 
                                    className="text-red-600 hover:bg-red-100 p-2 rounded-full"
                                >
                                    <Trash2 />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default DoctoralThesesGuidedTab;