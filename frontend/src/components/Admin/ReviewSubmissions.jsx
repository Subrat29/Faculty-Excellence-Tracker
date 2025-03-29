import React, { useState } from 'react';

const ReviewSubmissions = () => {
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    // Handle submission logic here
    alert(`Review submitted: ${review}`);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Review Submissions</h2>
      <textarea
        className="w-full p-4 border border-gray-300 rounded mb-4"
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSubmit}>
        Submit Review
      </button>
    </div>
  );
};

export default ReviewSubmissions;
