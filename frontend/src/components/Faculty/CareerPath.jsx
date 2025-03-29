import React, { useMemo } from 'react';
import { Radar } from 'react-chartjs-2';

const CareerPath = () => {
    // Sample performance data for the faculty
    const facultyPerformance = useMemo(() => ({
        research: 75,
        teaching: 80,
        leadership: 65,
        mentorship: 90,
        grantWriting: 55,
        communityService: 70,
    }), []);

    // AI-suggested skill development plan
    const skillDevelopmentPlan = [
        {
            category: 'Research',
            currentScore: '75',
            targetScore: '85',
            suggestion: 'Increase the number of published papers by collaborating with peers.',
            resources: ['Research Collaboration Workshops', 'Journal Paper Writing Guide'],
            timeline: '6 months',
        },
        {
            category: 'Teaching',
            currentScore: '80',
            targetScore: '90',
            suggestion: 'Adopt innovative teaching techniques such as flipped classroom and student-led discussions.',
            resources: ['Teaching Innovation Workshop', 'Online Course: Effective Teaching'],
            timeline: '12 months',
        },
        {
            category: 'Leadership',
            currentScore: '65',
            targetScore: '80',
            suggestion: 'Take up more leadership roles and participate in academic committees.',
            resources: ['Leadership in Academia Program', 'Book: The Art of Academic Leadership'],
            timeline: '6 months',
        },
        {
            category: 'Grant Writing',
            currentScore: '55',
            targetScore: '75',
            suggestion: 'Attend grant writing bootcamps and apply for small grants as practice.',
            resources: ['Grant Writing Bootcamp', 'Small Grants Opportunities'],
            timeline: '9 months',
        },
        {
            category: 'Mentorship',
            currentScore: '90',
            targetScore: 'Maintain',
            suggestion: 'Continue mentoring junior faculty and students.',
            resources: ['Mentorship Guides', 'Leadership in Mentorship'],
            timeline: 'Ongoing',
        },
    ];

    // Radar chart data to visually display performance across different areas
    const radarData = {
        labels: ['Research', 'Teaching', 'Leadership', 'Mentorship', 'Grant Writing', 'Community Service'],
        datasets: [
            {
                label: 'Current Performance',
                data: Object.values(facultyPerformance),
                backgroundColor: 'rgba(34, 202, 236, 0.2)',
                borderColor: 'rgba(34, 202, 236, 1)',
                borderWidth: 2,
            },
            {
                label: 'Target Performance',
                data: [85, 90, 80, 90, 75, 80],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Personalized Career Development Path</h2>

            {/* AI Suggestions and Development Plans */}
            <div className="mb-10">
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="border border-gray-300 p-2">Category</th>
                            <th className="border border-gray-300 p-2">Current Score</th>
                            <th className="border border-gray-300 p-2">Target Score</th>
                            <th className="border border-gray-300 p-2">AI Suggestion</th>
                            <th className="border border-gray-300 p-2">Resources</th>
                            <th className="border border-gray-300 p-2">Timeline</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skillDevelopmentPlan.map((plan, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="border border-gray-300 p-2">{plan.category}</td>
                                <td className="border border-gray-300 p-2">{plan.currentScore}</td>
                                <td className="border border-gray-300 p-2">{plan.targetScore}</td>
                                <td className="border border-gray-300 p-2">{plan.suggestion}</td>
                                <td className="border border-gray-300 p-2">
                                    <ul>
                                        {plan.resources.map((resource, index) => (
                                            <li key={index} className="list-disc ml-4">{resource}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="border border-gray-300 p-2">{plan.timeline}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Radar Chart for Performance Comparison */}
            <div className="bg-white p-4 rounded shadow mb-4">
                <h3 className="text-2xl font-semibold mb-4">Performance Overview</h3>
                <div style={{ maxWidth: '500px', margin: 'auto' }}>
                    <Radar data={radarData} />
                </div>
            </div>

            {/* Actionable Resources Section */}
            <div className="bg-white p-6 rounded shadow">
                <h3 className="text-xl font-bold mb-4">Actionable Resources for Career Development</h3>
                <ul className="list-disc ml-6">
                    <li className="mb-2">Research Collaboration Workshops</li>
                    <li className="mb-2">Effective Teaching Online Courses</li>
                    <li className="mb-2">Leadership in Academia Training</li>
                    <li className="mb-2">Grant Writing Bootcamp</li>
                </ul>
            </div>
        </div>
    );
};

export default CareerPath;
