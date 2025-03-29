import React, { useState } from 'react';
import { Save, DownloadCloud, X } from 'lucide-react';
import axiosInstance from '../../services/admin';

const CSVImport = ({ importUrl, sampleDataUrl, onImportSuccess, onCancel }) => {
  const [csvFile, setCsvFile] = useState(null);

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleImportCSV = () => {
    const formData = new FormData();
    formData.append('file', csvFile);
    console.log('formData', formData.file);

    // axiosInstance
    //   .post(importUrl, formData)
    //   .then((response) => {
    //     onImportSuccess(response.data.data); // Pass the imported data to the parent component
    //     setCsvFile(null); // Reset file input
    //   })
    //   .catch((error) => {
    //     console.error('Error importing CSV:', error);
    //   });
  };

  const handleDownloadSample = () => {
    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = sampleDataUrl;
    link.setAttribute('download', 'sample-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up after download trigger
  };

  return (
    <div className="bg-white border-2 border-blue-100 rounded-lg p-5 mb-4 shadow-sm">
      <h3 className="font-bold text-xl mb-4">Import Data from CSV</h3>
      <div className="flex items-center space-x-3 mb-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="p-2 border rounded-md focus:ring-2 focus:ring-blue-200 transition"
        />
      </div>
      <div className="flex justify-end space-x-3">
        <button
          onClick={handleImportCSV}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          <Save className="mr-2 h-4 w-4" /> Import
        </button>
        <button
          onClick={handleDownloadSample}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          <DownloadCloud className="mr-2 h-4 w-4" /> Download Sample
        </button>
        <button
          onClick={onCancel}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          <X className="mr-2 h-4 w-4" /> Cancel
        </button>
      </div>
    </div>
  );
};

export default CSVImport;
