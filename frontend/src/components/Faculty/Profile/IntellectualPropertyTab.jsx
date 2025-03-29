import React, { useState } from 'react';
import { Edit2, Trash2, Plus, X, Check, FileText, Users, Award, Calendar, CheckCircle2 } from 'lucide-react';

function IntellectualPropertyTab() {
    const [ip, setIp] = useState([
        {
            "id": 1,
            "title": "IoT Based Person Identification System Using Footfall Signature",
            "inventors": "KAR Subrat | MUKHOPADHYAY Bodhibrata | ANCHAL Sahil",
            "patentNo": "IN201811016962A",
            "status": "Published",
            "filedDate": "2018-05-04",
            "publishedDate": "2019-11-08",
        },
        {
            "id": 2,
            "title": "Diagnosis of Sub-Clinical Mastitis in Dairy Animals",
            "inventors": "KAR Subrat | MUKHOPADHYAY Bodhibrata | ANCHAL Sahil",
            "patentNo": "IN201711034211A",
            "status": "Published",
            "filedDate": "2017-09-26",
            "publishedDate": "2019-06-07",
        }
    ]);

    const [editingIp, setEditingIp] = useState(null);
    const [newIp, setNewIp] = useState(null);

    const handleEdit = (ipItem) => {
        setEditingIp({...ipItem});
    };

    const handleDelete = (id) => {
        setIp(ip.filter(item => item.id !== id));
    };

    const handleSaveEdit = () => {
        if (editingIp && Object.values(editingIp).every(val => val !== "")) {
            setIp(ip.map(item => 
                item.id === editingIp.id ? editingIp : item
            ));
            setEditingIp(null);
        }
    };

    const handleAddNew = () => {
        setNewIp({
            id: Date.now(),
            title: "",
            inventors: "",
            patentNo: "",
            status: "",
            filedDate: "",
            publishedDate: ""
        });
    };

    const handleSaveNew = () => {
        if (newIp && 
            newIp.title && 
            newIp.inventors && 
            newIp.patentNo && 
            newIp.status && 
            newIp.filedDate && 
            newIp.publishedDate
        ) {
            setIp([...ip, newIp]);
            setNewIp(null);
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

    const renderIpContent = (ipItem, isEditing) => {
        if (isEditing) {
            return (
                <div className="flex-grow grid grid-cols-2 gap-3">
                    {renderInputWithIcon(
                        <FileText />, 
                        "text-blue-600", 
                        ipItem.title, 
                        (e) => setEditingIp({...ipItem, title: e.target.value}), 
                        "Title"
                    )}
                    {renderInputWithIcon(
                        <Users />, 
                        "text-green-600", 
                        ipItem.inventors, 
                        (e) => setEditingIp({...ipItem, inventors: e.target.value}), 
                        "Inventors"
                    )}
                    {renderInputWithIcon(
                        <Award />, 
                        "text-purple-600", 
                        ipItem.patentNo, 
                        (e) => setEditingIp({...ipItem, patentNo: e.target.value}), 
                        "Patent No."
                    )}
                    {renderInputWithIcon(
                        <CheckCircle2 />, 
                        "text-orange-600", 
                        ipItem.status, 
                        (e) => setEditingIp({...ipItem, status: e.target.value}), 
                        "Status"
                    )}
                    {renderInputWithIcon(
                        <Calendar />, 
                        "text-red-600", 
                        ipItem.filedDate, 
                        (e) => setEditingIp({...ipItem, filedDate: e.target.value}), 
                        "Filed Date"
                    )}
                    {renderInputWithIcon(
                        <Calendar />, 
                        "text-blue-600", 
                        ipItem.publishedDate, 
                        (e) => setEditingIp({...ipItem, publishedDate: e.target.value}), 
                        "Published Date"
                    )}
                </div>
            );
        }

        return (
            <div className="flex-grow">
                <h3 className="text-lg font-semibold">{ipItem.title}</h3>
                <div className="flex items-center text-gray-600 mt-1">
                    <Users size={16} className="mr-2 text-green-600" />
                    <span>{ipItem.inventors}</span>
                </div>
                <div className="flex items-center text-gray-700 mt-1">
                    <Award size={16} className="mr-2 text-purple-600" />
                    <span>{ipItem.patentNo}</span>
                </div>
                <div className="flex items-center text-gray-500 mt-1">
                    <CheckCircle2 size={14} className="mr-2 text-orange-600" />
                    <span>{ipItem.status}</span>
                </div>
                <div className="flex items-center text-gray-500 mt-1">
                    <Calendar size={14} className="mr-2 text-red-600" />
                    <span>Filed: {ipItem.filedDate}</span>
                </div>
                <div className="flex items-center text-gray-500 mt-1">
                    <Calendar size={14} className="mr-2 text-blue-600" />
                    <span>Published: {ipItem.publishedDate}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Intellectual Property</h2>
                <button 
                    onClick={handleAddNew} 
                    className="text-green-600 hover:bg-green-100 p-2 rounded-full"
                >
                    <Plus />
                </button>
            </div>

            {newIp && (
                <div className="flex items-center mb-4 pb-4 border-b bg-green-50 p-4 rounded">
                    <div className="flex-grow grid grid-cols-2 gap-3">
                        {renderInputWithIcon(
                            <FileText />, 
                            "text-blue-600", 
                            newIp.title, 
                            (e) => setNewIp({...newIp, title: e.target.value}), 
                            "Title"
                        )}
                        {renderInputWithIcon(
                            <Users />, 
                            "text-green-600", 
                            newIp.inventors, 
                            (e) => setNewIp({...newIp, inventors: e.target.value}), 
                            "Inventors"
                        )}
                        {renderInputWithIcon(
                            <Award />, 
                            "text-purple-600", 
                            newIp.patentNo, 
                            (e) => setNewIp({...newIp, patentNo: e.target.value}), 
                            "Patent No."
                        )}
                        {renderInputWithIcon(
                            <CheckCircle2 />, 
                            "text-orange-600", 
                            newIp.status, 
                            (e) => setNewIp({...newIp, status: e.target.value}), 
                            "Status"
                        )}
                        {renderInputWithIcon(
                            <Calendar />, 
                            "text-red-600", 
                            newIp.filedDate, 
                            (e) => setNewIp({...newIp, filedDate: e.target.value}), 
                            "Filed Date"
                        )}
                        {renderInputWithIcon(
                            <Calendar />, 
                            "text-blue-600", 
                            newIp.publishedDate, 
                            (e) => setNewIp({...newIp, publishedDate: e.target.value}), 
                            "Published Date"
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
                            onClick={() => setNewIp(null)} 
                            className="text-red-600 hover:bg-red-100 p-2 rounded-full"
                        >
                            <X />
                        </button>
                    </div>
                </div>
            )}

            {ip.map((ipItem) => (
                <div 
                    key={ipItem.id} 
                    className="flex items-center mb-4 pb-4 border-b"
                >
                    {editingIp && editingIp.id === ipItem.id ? (
                        <>
                            {renderIpContent(editingIp, true)}
                            <div className="flex ml-4">
                                <button 
                                    onClick={handleSaveEdit} 
                                    className="text-green-600 hover:bg-green-100 p-2 rounded-full mr-2"
                                >
                                    <Check />
                                </button>
                                <button 
                                    onClick={() => setEditingIp(null)} 
                                    className="text-red-600 hover:bg-red-100 p-2 rounded-full"
                                >
                                    <X />
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            {renderIpContent(ipItem, false)}
                            <div className="flex ml-4">
                                <button 
                                    onClick={() => handleEdit(ipItem)} 
                                    className="text-blue-600 hover:bg-blue-100 p-2 rounded-full mr-2"
                                >
                                    <Edit2 />
                                </button>
                                <button 
                                    onClick={() => handleDelete(ipItem.id)} 
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

export default IntellectualPropertyTab;