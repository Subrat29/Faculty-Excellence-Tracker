import React, { useState } from 'react';

// Sample faculty data for searching
const facultyData = [
    { id: 1, name: 'Dr. Alice Smith', department: 'Physics', expertise: 'Quantum Mechanics' },
    { id: 2, name: 'Prof. John Johnson', department: 'Computer Science', expertise: 'AI and Machine Learning' },
    { id: 3, name: 'Dr. Emma Davis', department: 'Chemistry', expertise: 'Organic Chemistry' },
    // Add more faculty members here
];

// Sample data for collaboration requests and peer feedback
const collaborationRequests = [
    { id: 1, requester: 'Dr. Smith', area: 'Research Collaboration', description: 'Looking for a partner for a climate change research project.', status: 'Open' },
    { id: 2, requester: 'Prof. Johnson', area: 'Teaching Methods', description: 'Seeking advice on student engagement techniques.', status: 'Open' },
];

const peerFeedbackData = [
    { id: 1, giver: 'Dr. Adams', receiver: 'Dr. Smith', feedback: 'Great research collaboration partner.', date: '2024-05-12' },
    { id: 2, giver: 'Prof. Lee', receiver: 'Dr. Smith', feedback: 'Insightful advice on community service programs.', date: '2024-06-25' },
];

const CollaborationToolsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [newRequest, setNewRequest] = useState({ area: '', description: '' });
    const [feedback, setFeedback] = useState({ receiver: '', feedbackText: '' });

    // Filter faculty based on search query
    const filteredFaculty = facultyData.filter(faculty =>
        faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.expertise.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // When a faculty is selected, automatically populate the "To" field in the collaboration request and feedback forms
    const handleFacultySelect = (faculty) => {
        setSelectedFaculty(faculty);
        setSearchQuery(faculty.name); // Autofill the search bar with the selected faculty name
        setNewRequest({ ...newRequest, to: faculty.name }); // Autofill the "To" field in the collaboration request
        setFeedback({ ...feedback, receiver: faculty.name }); // Autofill the "Receiver" field in the feedback form
    };

    // Handle feedback submission
    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        alert(`Feedback for ${feedback.receiver} submitted: ${feedback.feedbackText}`);
        setFeedback({ receiver: '', feedbackText: '' });
    };

    // Handle collaboration request submission
    const handleCollaborationSubmit = (e) => {
        e.preventDefault();
        alert(`Collaboration Request submitted for ${newRequest.area}`);
        setNewRequest({ area: '', description: '' });
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6">Collaboration & Peer Feedback Tools</h2>

            {/* Faculty Search Section */}
            <div className="bg-white p-6 rounded shadow mb-6">
                <h3 className="text-xl font-semibold mb-4">Search for Faculty</h3>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded mb-4"
                    placeholder="Search faculty by name, department, or expertise"
                />
                {searchQuery && (
                    <ul className="border border-gray-300 rounded max-h-40 overflow-auto">
                        {filteredFaculty.length > 0 ? (
                            filteredFaculty.map((faculty) => (
                                <li
                                    key={faculty.id}
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleFacultySelect(faculty)}
                                >
                                    <strong>{faculty.name}</strong> - {faculty.department} ({faculty.expertise})
                                </li>
                            ))
                        ) : (
                            <li className="p-2 text-gray-500">No faculty found</li>
                        )}
                    </ul>
                )}
            </div>

            {/* Collaboration Requests Section */}
            <div className="bg-white p-6 rounded shadow mb-6">
                <h3 className="text-xl font-semibold mb-4">Collaboration Requests</h3>
                <table className="min-w-full table-auto border-collapse border border-gray-200 mb-6">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 p-2">Requester</th>
                            <th className="border border-gray-300 p-2">Area</th>
                            <th className="border border-gray-300 p-2">Description</th>
                            <th className="border border-gray-300 p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {collaborationRequests.map((request) => (
                            <tr key={request.id} className="bg-gray-100">
                                <td className="border border-gray-300 p-2">{request.requester}</td>
                                <td className="border border-gray-300 p-2">{request.area}</td>
                                <td className="border border-gray-300 p-2">{request.description}</td>
                                <td className="border border-gray-300 p-2">{request.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* // Updated Collaboration Request form with the "To" field autofilled */}
                <form onSubmit={handleCollaborationSubmit} className="flex flex-col gap-4">
                    <label>
                        <span className="font-semibold">To</span>
                        <input
                            type="text"
                            value={newRequest.to}
                            onChange={(e) => setNewRequest({ ...newRequest, to: e.target.value })}
                            className="border border-gray-300 p-2 w-full rounded"
                            placeholder="Select a faculty member from search"
                            readOnly // Make this field read-only since it's populated automatically
                        />
                    </label>
                    <label>
                        <span className="font-semibold">Collaboration Area</span>
                        <input
                            type="text"
                            value={newRequest.area}
                            onChange={(e) => setNewRequest({ ...newRequest, area: e.target.value })}
                            className="border border-gray-300 p-2 w-full rounded"
                            placeholder="e.g., Research Collaboration"
                        />
                    </label>
                    <label>
                        <span className="font-semibold">Description</span>
                        <textarea
                            value={newRequest.description}
                            onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                            className="border border-gray-300 p-2 w-full rounded"
                            placeholder="Describe your collaboration need"
                        ></textarea>
                    </label>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Submit Collaboration Request
                    </button>
                </form>
            </div>

            {/* Peer Feedback Section */}
            <div className="bg-white p-6 rounded shadow mb-6">
                <h3 className="text-xl font-semibold mb-4">Peer Feedback</h3>
                <table className="min-w-full table-auto border-collapse border border-gray-200 mb-6">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 p-2">Giver</th>
                            <th className="border border-gray-300 p-2">Receiver</th>
                            <th className="border border-gray-300 p-2">Feedback</th>
                            <th className="border border-gray-300 p-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {peerFeedbackData.map((feedback) => (
                            <tr key={feedback.id} className="bg-gray-100">
                                <td className="border border-gray-300 p-2">{feedback.giver}</td>
                                <td className="border border-gray-300 p-2">{feedback.receiver}</td>
                                <td className="border border-gray-300 p-2">{feedback.feedback}</td>
                                <td className="border border-gray-300 p-2">{feedback.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* // Updated Feedback form with the "Receiver" field autofilled */}
                <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-4">
                    <label>
                        <span className="font-semibold">Receiver</span>
                        <input
                            type="text"
                            value={feedback.receiver}
                            onChange={(e) => setFeedback({ ...feedback, receiver: e.target.value })}
                            className="border border-gray-300 p-2 w-full rounded"
                            placeholder="Select a faculty member from search"
                            readOnly // Make this field read-only since it's populated automatically
                        />
                    </label>
                    <label>
                        <span className="font-semibold">Feedback</span>
                        <textarea
                            value={feedback.feedbackText}
                            onChange={(e) => setFeedback({ ...feedback, feedbackText: e.target.value })}
                            className="border border-gray-300 p-2 w-full rounded"
                            placeholder="Write your feedback here"
                        ></textarea>
                    </label>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Submit Feedback
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CollaborationToolsPage;
