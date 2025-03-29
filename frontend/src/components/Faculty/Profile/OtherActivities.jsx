import React, { useEffect, useState } from 'react';
import AccordionCard from '../../ui/Accordion'; // Adjust the path if necessary
import consoleTerminal from '../../../utils/consoleTerminal';
import axiosInstance from '../../../services/admin';
import { useSelector } from 'react-redux';

const OtherActivities = () => {
  const facultyId = useSelector((state) => state.auth.user._id);
  const [prData, setPrData] = useState([]);

  const data = [
    {
      reviewerRole: 'reviewer',
      completionYear: '2023',
      reviewType: 'review',
      reviewUrl: 'N/A',
      reviewGroupId: 'issn:1089-7623',
      sourceName: 'AIP Publishing',
      organizationName: 'AIP Publishing LLC',
      organizationCity: 'Melville, New York',
      organizationRegion: 'NE',
      organizationCountry: 'US',
    },
    {
      reviewerRole: 'reviewer',
      completionYear: '2023',
      reviewType: 'review',
      reviewUrl: 'https://publons.com/wos-op/review/author/SADXlb95/',
      reviewGroupId: 'issn:0974-6900',
      sourceName: 'Web of Science Researcher Profile Sync',
      organizationName: 'Publons',
      organizationCity: 'Wellington',
      organizationRegion: 'N/A',
      organizationCountry: 'NZ',
    },
  ];

  const fetchPRData = async () => {
    try {
      const response = await axiosInstance.get(
        `/v1/faculty/peersfeedback/fetch/${facultyId}`
      );

      if (response.status === 200) {
        consoleTerminal(
          'Peer review data fetched successfully',
          response.data.data
        );
        setPrData(response.data.data);
      }
    } catch (error) {
      consoleTerminal('Error fetching peer review data', error);
    }
  };

  useEffect(() => {
    if (facultyId) {
      fetchPRData();
    }
  }, [facultyId]);

  return (
    <div className="App select-none">
      {/* Passing data and API functions to AccordionCard */}
      <AccordionCard title="Peer Review Activities" data={prData} />
      <AccordionCard title="Services" data={[]} />
      <AccordionCard title="Events" data={[]} />
      <AccordionCard title="Extracurricular Activities" data={[]} />
    </div>
  );
};

export default OtherActivities;
