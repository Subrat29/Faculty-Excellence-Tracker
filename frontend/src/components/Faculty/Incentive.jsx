import React, { useState } from 'react';

// Sample data for incentives
const incentiveData = {
  totalIncentives: 5,
  totalValue: '₹50,000',
  categories: {
    monetary: [
      { id: 1, name: 'Research Grant', value: '₹20,000', earned: true, date: '2023-05-20' },
      { id: 2, name: 'Salary Hike', value: '₹10,000', earned: true, date: '2023-06-15' },
      { id: 3, name: 'Conference Travel Fund', value: '₹20,000', earned: false, progress: 80 }
    ],
    nonMonetary: [
      { id: 1, name: 'Certified Data Scientist', earned: true, date: '2022-10-10' },
      { id: 2, name: 'Faculty of the Year', earned: false, progress: 50 }
    ]
  },
  promotions: {
    nextPromotion: 'Associate Professor',
    progress: 60,
    criteria: ['10 research papers', '5 years of service', '1 major grant'],
    metCriteria: ['10 research papers', '1 major grant'],
  },
  leaderboardRank: 3,
  specialRecognitions: ['Best Researcher 2022', 'Top Contributor AI Department'],
};

// Function to render progress bar based on percentage
const ProgressBar = ({ progress }) => (
  <div className="w-full bg-gray-200 rounded-lg">
    <div
      className="bg-green-500 text-xs font-medium text-center text-white p-0.5 leading-none rounded-lg"
      style={{ width: `${progress}%` }}
    >
      {progress}%
    </div>
  </div>
);

const IncentivePage = () => {
  const { totalIncentives, totalValue, categories, promotions, leaderboardRank, specialRecognitions } = incentiveData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-green-200 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">

          {/* Incentive Overview */}
          <h2 className="text-3xl font-bold mb-6 text-center">Faculty Incentives</h2>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <h4 className="text-lg font-semibold">Total Incentives Earned</h4>
              <p className="text-4xl font-bold">{totalIncentives}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg text-center">
              <h4 className="text-lg font-semibold">Total Value</h4>
              <p className="text-4xl font-bold">{totalValue}</p>
            </div>
          </div>

          {/* Incentive Categories: Monetary & Non-Monetary */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Incentive Categories</h3>

            <h4 className="text-xl font-bold mb-2">Monetary Incentives</h4>
            <div className="space-y-4">
              {categories.monetary.map((incentive) => (
                <div key={incentive.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
                  <div>
                    <h5 className="text-lg font-semibold">{incentive.name}</h5>
                    {incentive.earned ? (
                      <p className="text-green-600">Earned on: {incentive.date}</p>
                    ) : (
                      <ProgressBar progress={incentive.progress} />
                    )}
                  </div>
                  <p className="font-bold">{incentive.value}</p>
                </div>
              ))}
            </div>

            <h4 className="text-xl font-bold mt-6 mb-2">Non-Monetary Incentives</h4>
            <div className="space-y-4">
              {categories.nonMonetary.map((incentive) => (
                <div key={incentive.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
                  <div>
                    <h5 className="text-lg font-semibold">{incentive.name}</h5>
                    {incentive.earned ? (
                      <p className="text-green-600">Earned on: {incentive.date}</p>
                    ) : (
                      <ProgressBar progress={incentive.progress} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Promotion Eligibility */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Promotion Eligibility</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-lg font-semibold">Next Promotion: {promotions.nextPromotion}</h4>
              <ProgressBar progress={promotions.progress} />
              <div className="mt-4">
                <h5 className="font-bold mb-2">Criteria:</h5>
                <ul className="list-disc list-inside">
                  {promotions.criteria.map((criterion, index) => (
                    <li
                      key={index}
                      className={`${
                        promotions.metCriteria.includes(criterion) ? 'text-green-600' : 'text-gray-600'
                      }`}
                    >
                      {criterion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Leaderboard Rank */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Leaderboard</h3>
            <div className="bg-yellow-100 p-4 rounded-lg text-center">
              <h4 className="text-lg font-semibold">Current Rank</h4>
              <p className="text-4xl font-bold">{leaderboardRank}</p>
            </div>
          </div>

          {/* Special Recognitions */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Special Recognitions</h3>
            <div className="bg-purple-100 p-4 rounded-lg">
              {specialRecognitions.length > 0 ? (
                specialRecognitions.map((recognition, index) => (
                  <p key={index} className="font-semibold">
                    {recognition}
                  </p>
                ))
              ) : (
                <p>No special recognitions yet.</p>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">Claim Available Incentives</button>
            <button className="ml-4 bg-gray-500 text-white py-2 px-4 rounded-lg">View Incentive Guidelines</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncentivePage;
