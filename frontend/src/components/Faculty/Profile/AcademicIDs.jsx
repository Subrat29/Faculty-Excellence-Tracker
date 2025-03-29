import React, { useEffect, useState } from 'react';
import { ImportIcon, RefreshCcwIcon } from 'lucide-react';
import consoleTerminal from '../../../utils/consoleTerminal';
import axiosInstance from '../../../services/admin';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function AcademicIDs() {
  const faculty_id = useSelector((state) => state.auth.user._id);
  consoleTerminal('Faculty ID :: ', faculty_id);

  const [academicIds, setAcademicIds] = useState([]);
  const [editedAcademicIds, setEditedAcademicIds] = useState([]);

  useEffect(() => {
    // Fetch academic IDs from the backend when the component mounts
    const fetchAcademicIds = async () => {
      setLoading(true);

      try {
        const response = await axiosInstance.get(
          `/v1/faculty/academicid/fetch/${faculty_id}`
        );

        consoleTerminal('Academic ID Response :: ', response.data.data);

        if (response.status === 200) {
          const fetchedIds =
            response.data.data.length > 0
              ? [
                  {
                    label: 'Employee Id',
                    value: faculty_id,
                    importable: false,
                  },
                  {
                    label: 'Orcid Id',
                    value: response.data.data[0].orcid || '',
                    importable: true,
                  },
                  {
                    label: 'Scopus Id',
                    value: response.data.data[0].scopus || '',
                    importable: false,
                  },
                  {
                    label: 'Researcher Id',
                    value: response.data.data[0].researcher || '',
                    importable: false,
                  },
                  {
                    label: 'Google Scholar Id',
                    value: response.data.data[0].google_scholar || '',
                    importable: false,
                  },
                ]
              : [
                  {
                    label: 'Employee Id',
                    value: faculty_id,
                    importable: false,
                  },
                  { label: 'Orcid Id', value: '', importable: true },
                  { label: 'Scopus Id', value: '', importable: false },
                  { label: 'Researcher Id', value: '', importable: false },
                  { label: 'Google Scholar Id', value: '', importable: false },
                ];

          setAcademicIds(fetchedIds);
          setEditedAcademicIds([...fetchedIds]);
        } else {
          toast.error('Failed to load academic IDs');
        }
      } catch (error) {
        console.error('Error fetching academic IDs:', error);
        toast.error('Error fetching academic IDs');
      } finally {
        setLoading(false);
      }
    };

    fetchAcademicIds();
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [orcidData, setOrcidData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [employmentData, setEmploymentData] = useState([]);
  const [distinctionData, setDistinctionData] = useState([]);
  const [membershipData, setMembershipData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [peerReviewData, setPeerReviewData] = useState([]);
  const [fundingData, setFundingData] = useState([]);
  const [invitedPositionData, setInvitedPositionData] = useState([]);
  const [qualificationsData, setQualificationsData] = useState([]);

  const handleToggleEdit = () => {
    if (isEditing) {
      // Reset edited values when cancelling edit
      setEditedAcademicIds([...academicIds]);
    }
    setIsEditing(!isEditing);
  };
  const handleValueChange = (index, newValue) => {
    const newEditedAcademicIds = [...editedAcademicIds];
    newEditedAcademicIds[index].value = newValue;
    setEditedAcademicIds(newEditedAcademicIds);
  };

  const fetchPublications = async (data) => {
    // Check if works and group arrays exist and are not empty
    const extractedPublications = data['activities-summary']?.['works']?.[
      'group'
    ]?.length
      ? data['activities-summary']['works']['group'].flatMap((group) => {
          return (
            group['work-summary']?.map((work) => {
              const doiValue =
                work['external-ids']?.['external-id']?.[0]?.[
                  'external-id-value'
                ] || 'N/A';
              const title = work['title']?.['title']?.['value'] || 'N/A';
              const publicationDate =
                `${work['publication-date']?.['year']?.['value']}` || 'N/A';
              const workType = work['type'] || 'N/A';
              const journalTitle = work['journal-title']?.['value'] || 'N/A';
              const sourceName =
                work['source']?.['source-name']?.['value'] || 'N/A';
              const url = work['url']?.['value'] || 'N/A';

              return {
                title,
                doiValue,
                publicationDate,
                workType,
                journalTitle,
                sourceName,
                url,
              };
            }) || []
          );
        })
      : []; // Default to an empty array if no works.group is present

    if (extractedPublications.length > 0) {
      setOrcidData(extractedPublications); // Assuming you're updating a state or variable with this data
    }
  };

  const fetchEmployment = async (data) => {
    const extractedEmployments = data['activities-summary']?.['employments']?.[
      'affiliation-group'
    ]?.length
      ? data['activities-summary']['employments']['affiliation-group'].flatMap(
          (group) => {
            return (
              group['summaries']?.map((summary) => {
                const employment = summary['employment-summary'];

                const sourceName =
                  employment['source']?.['source-name']?.value || 'N/A';
                const departmentName = employment['department-name'] || 'N/A';
                const roleTitle = employment['role-title'] || 'N/A';
                const startDate = `${
                  employment['start-date']?.year?.value || 'N/A'
                }`;
                const endDate = employment['end-date'] || 'Present'; // If there's no end date, assume ongoing
                const organizationName =
                  employment['organization']?.['name'] || 'N/A';
                const organizationAddress = employment['organization']?.[
                  'address'
                ]
                  ? `${employment['organization']['address'].city}, ${employment['organization']['address'].region}, ${employment['organization']['address'].country}`
                  : 'N/A';
                const organizationId =
                  employment['organization']?.['disambiguated-organization']?.[
                    'disambiguated-organization-identifier'
                  ] || 'N/A';

                return {
                  sourceName,
                  departmentName,
                  roleTitle,
                  startDate,
                  endDate,
                  organizationName,
                  organizationAddress,
                  organizationId,
                };
              }) || []
            );
          }
        )
      : []; // Default to an empty array if no affiliation-group is present

    if (extractedEmployments.length > 0) {
      setEmploymentData(extractedEmployments); // Assuming `setEmploymentData` is a state update function
    }
  };

  const fetchDistinctions = async (data) => {
    const extractedDistinctions = data['activities-summary']?.[
      'distinctions'
    ]?.['affiliation-group']?.length
      ? data['activities-summary']['distinctions']['affiliation-group'].flatMap(
          (group) => {
            return (
              group['summaries']?.map((summary) => {
                const distinctionSummary = summary['distinction-summary'];

                const departmentName =
                  distinctionSummary['department-name'] || 'N/A';
                const roleTitle = distinctionSummary['role-title'] || 'N/A';
                const startDate =
                  distinctionSummary['start-date']?.year?.value ||
                  `${distinctionSummary['start-date']?.month || 'N/A'}-${
                    distinctionSummary['start-date']?.day || 'N/A'
                  }`;
                const endDate = distinctionSummary['end-date'] || 'N/A';
                const organizationName =
                  distinctionSummary['organization']?.name || 'N/A';
                const organizationCity =
                  distinctionSummary['organization']?.address?.city || 'N/A';
                const organizationRegion =
                  distinctionSummary['organization']?.address?.region || 'N/A';
                const organizationCountry =
                  distinctionSummary['organization']?.address?.country || 'N/A';
                const url = distinctionSummary['url']?.value || 'N/A';
                const sourceName =
                  distinctionSummary['source']?.['source-name']?.value || 'N/A';

                return {
                  departmentName,
                  roleTitle,
                  startDate,
                  endDate,
                  organizationName,
                  organizationCity,
                  organizationRegion,
                  organizationCountry,
                  url,
                  sourceName,
                };
              }) || []
            );
          }
        )
      : []; // Default to an empty array if no affiliation-group is present

    if (extractedDistinctions.length > 0) {
      setDistinctionData(extractedDistinctions); // Assuming `setDistinctionData` is a state update function
    }
  };

  const fetchMemberships = async (data) => {
    const extractedMemberships = data['activities-summary']?.['memberships']?.[
      'affiliation-group'
    ]?.length
      ? data['activities-summary']['memberships']['affiliation-group'].flatMap(
          (group) => {
            return (
              group['summaries']?.map((summary) => {
                const membershipSummary = summary['membership-summary'];

                const roleTitle = membershipSummary['role-title'] || 'N/A';
                const startDate =
                  membershipSummary['start-date']?.year?.value || 'N/A';
                const endDate = membershipSummary['end-date'] || 'N/A';
                const organizationName =
                  membershipSummary['organization']?.name || 'N/A';
                const organizationCity =
                  membershipSummary['organization']?.address?.city || 'N/A';
                const organizationRegion =
                  membershipSummary['organization']?.address?.region || 'N/A';
                const organizationCountry =
                  membershipSummary['organization']?.address?.country || 'N/A';
                const url = membershipSummary['url']?.value || 'N/A';
                const sourceName =
                  membershipSummary['source']?.['source-name']?.value || 'N/A';

                return {
                  roleTitle,
                  startDate,
                  endDate,
                  organizationName,
                  organizationCity,
                  organizationRegion,
                  organizationCountry,
                  url,
                  sourceName,
                };
              }) || []
            );
          }
        )
      : []; // Default to an empty array if no affiliation-group is present

    if (extractedMemberships.length > 0) {
      setMembershipData(extractedMemberships); // Assuming `setMembershipData` is a state update function
    }
  };

  const fetchServices = async (data) => {
    const extractedServices = data['activities-summary']?.['services']?.[
      'affiliation-group'
    ]?.length
      ? data['activities-summary']['services']['affiliation-group'].flatMap(
          (group) => {
            return (
              group['summaries']?.map((summary) => {
                const serviceSummary = summary['service-summary'];

                const roleTitle = serviceSummary['role-title'] || 'N/A';
                const startDate =
                  serviceSummary['start-date']?.year?.value || 'N/A';
                const endDate = serviceSummary['end-date'] || 'N/A';
                const organizationName =
                  serviceSummary['organization']?.name || 'N/A';
                const organizationCity =
                  serviceSummary['organization']?.address?.city || 'N/A';
                const organizationRegion =
                  serviceSummary['organization']?.address?.region || 'N/A';
                const organizationCountry =
                  serviceSummary['organization']?.address?.country || 'N/A';
                const url = serviceSummary['url']?.value || 'N/A';
                const sourceName =
                  serviceSummary['source']?.['source-name']?.value || 'N/A';

                return {
                  roleTitle,
                  startDate,
                  endDate,
                  organizationName,
                  organizationCity,
                  organizationRegion,
                  organizationCountry,
                  url,
                  sourceName,
                };
              }) || []
            );
          }
        )
      : []; // Default to an empty array if no affiliation-group is present

    if (extractedServices.length > 0) {
      setServiceData(extractedServices); // Assuming `setServiceData` is a state update function
    }
  };

  const fetchPeerReviews = async (data) => {
    const extractedPeerReviews = data['activities-summary']?.['peer-reviews']?.[
      'group'
    ]?.length
      ? data['activities-summary']['peer-reviews']['group'].flatMap((group) => {
          return (
            group['peer-review-group']?.map((peerReviewGroup) => {
              const peerReviewSummary =
                peerReviewGroup['peer-review-summary']?.[0];

              const reviewerRole = peerReviewSummary['reviewer-role'] || 'N/A';
              const completionYear =
                peerReviewSummary['completion-date']?.year?.value || 'N/A';
              const reviewType = peerReviewSummary['review-type'] || 'N/A';
              const reviewUrl = peerReviewSummary['review-url']?.value || 'N/A';
              const reviewGroupId =
                peerReviewSummary['review-group-id'] || 'N/A';
              const sourceName =
                peerReviewSummary['source']?.['source-name']?.value || 'N/A';
              const organizationName =
                peerReviewSummary['convening-organization']?.name || 'N/A';
              const organizationCity =
                peerReviewSummary['convening-organization']?.address?.city ||
                'N/A';
              const organizationRegion =
                peerReviewSummary['convening-organization']?.address?.region ||
                'N/A';
              const organizationCountry =
                peerReviewSummary['convening-organization']?.address?.country ||
                'N/A';

              return {
                reviewerRole,
                completionYear,
                reviewType,
                reviewUrl,
                reviewGroupId,
                sourceName,
                organizationName,
                organizationCity,
                organizationRegion,
                organizationCountry,
              };
            }) || []
          );
        })
      : []; // Default to an empty array if no group is present

    if (extractedPeerReviews.length > 0) {
      setPeerReviewData(extractedPeerReviews); // Assuming `setPeerReviewData` is a state update function
    }
  };

  const fetchFundings = async (data) => {
    // Check if the fundings array exists and is not empty
    console.log('Checking if activities-summary and fundings are present...');
    if (
      !data['activities-summary'] ||
      !data['activities-summary']['fundings']
    ) {
      console.log('No fundings data found in the response.');
      return; // Exit early if no funding data exists
    }

    console.log('Found fundings data, proceeding with extraction...');
    consoleTerminal(
      'Fundings :: ',
      data['activities-summary']['fundings'].group[0]
    );

    const extractedFundings = data['activities-summary']?.['fundings']?.group
      ?.length
      ? data['activities-summary']['fundings'].group.flatMap((fundingGroup) => {
          return (
            fundingGroup['funding-summary'].map((fundingSummary) => {
              const fundingTitle =
                fundingSummary['title']?.['title']?.value || 'N/A';
              const fundingType = fundingSummary['type'] || 'N/A';
              const startYear =
                fundingSummary['start-date']?.['year']?.value || 'N/A';
              const endYear =
                fundingSummary['end-date']?.['year']?.value || 'N/A';
              const organizationName =
                fundingSummary['organization']?.['name'] || 'N/A';
              const organizationCity =
                fundingSummary['organization']?.['address']?.['city'] || 'N/A';
              const organizationCountry =
                fundingSummary['organization']?.['address']?.['country'] ||
                'N/A';
              const fundingPath = fundingSummary['path'] || 'N/A';
              return {
                fundingTitle,
                fundingType,
                startYear,
                endYear,
                organizationName,
                organizationCity,
                organizationCountry,
                fundingPath,
              };
            }) || []
          );
        })
      : []; // Default to an empty array if no fundings are present
    // Default to an empty array if no fundings are present

    // Check if we have successfully extracted any funding data
    if (extractedFundings.length > 0) {
      console.log('Successfully extracted fundings data:', extractedFundings);
      setFundingData(extractedFundings); // Assuming you're updating a state or variable with this data
    } else {
      console.log('No fundings found after extraction.');
    }
  };

  const fetchInvitedPositions = async (data) => {
    // Check if invited-positions array exists and is not empty
    const extractedInvitedPositions = data['activities-summary']?.[
      'invited-positions'
    ]?.length
      ? data['activities-summary']['invited-positions'].flatMap(
          (affiliationGroup) => {
            return (
              affiliationGroup['summaries']?.map((summary) => {
                const invitedPositionSummary =
                  summary['invited-position-summary'];

                // Extract the relevant details
                const sourceName =
                  invitedPositionSummary['source']?.['source-name']?.value ||
                  'N/A';
                const roleTitle = invitedPositionSummary['role-title'] || 'N/A';
                const departmentName =
                  invitedPositionSummary['department-name'] || 'N/A';
                const organizationName =
                  invitedPositionSummary['organization']?.['name'] || 'N/A';
                const organizationCity =
                  invitedPositionSummary['organization']?.['address']?.[
                    'city'
                  ] || 'N/A';
                const organizationCountry =
                  invitedPositionSummary['organization']?.['address']?.[
                    'country'
                  ] || 'N/A';
                const startDate = invitedPositionSummary['start-date']
                  ? `${invitedPositionSummary['start-date']['year'].value}-${
                      invitedPositionSummary['start-date']['month']?.value ||
                      'N/A'
                    }`
                  : 'N/A';
                const endDate = invitedPositionSummary['end-date']
                  ? `${invitedPositionSummary['end-date']['year'].value}-${
                      invitedPositionSummary['end-date']['month']?.value ||
                      'N/A'
                    }`
                  : 'N/A';
                const positionUrl =
                  invitedPositionSummary['url']?.value || 'N/A';
                const positionPath = invitedPositionSummary['path'] || 'N/A';

                // Return the extracted information
                return {
                  sourceName,
                  roleTitle,
                  departmentName,
                  organizationName,
                  organizationCity,
                  organizationCountry,
                  startDate,
                  endDate,
                  positionUrl,
                  positionPath,
                };
              }) || []
            );
          }
        )
      : []; // Default to an empty array if no invited-positions are present

    if (extractedInvitedPositions.length > 0) {
      setInvitedPositionData(extractedInvitedPositions); // Assuming you're updating a state or variable with this data
    }
  };

  const fetchQualifications = async (data) => {
    // Navigate to the qualifications data via the correct path
    const qualificationsData = data['activities-summary']?.qualifications;

    // Extract the affiliation-group if it exists
    const extractedQualifications = qualificationsData?.['affiliation-group']
      ?.length
      ? qualificationsData['affiliation-group'].flatMap((group) => {
          return (
            group['summaries']?.map((summary) => {
              const qualification = summary['qualification-summary'];

              // Extracting all necessary fields with fallback to 'N/A' if not found
              const sourceName =
                qualification['source']?.['source-name']?.value || 'N/A';
              const departmentName = qualification['department-name'] || 'N/A';
              const roleTitle = qualification['role-title'] || 'N/A';
              const startDate = `${
                qualification['start-date']?.year?.value || 'N/A'
              }`;
              const endDate = `${
                qualification['end-date']?.year?.value || 'N/A'
              }`; // Use end year if available
              const organizationName =
                qualification['organization']?.['name'] || 'N/A';
              const organizationAddress = qualification['organization']?.[
                'address'
              ]
                ? `${qualification['organization']['address'].city}, ${qualification['organization']['address'].region}, ${qualification['organization']['address'].country}`
                : 'N/A';
              const organizationId =
                qualification['organization']?.['disambiguated-organization']?.[
                  'disambiguated-organization-identifier'
                ] || 'N/A';

              return {
                departmentName,
                roleTitle,
                startDate,
                endDate,
                organizationName,
                organizationAddress,
                organizationId,
              };
            }) || []
          );
        })
      : []; // Default to an empty array if no affiliation-group is present

    // Update the state with the extracted qualifications if any data is found
    if (extractedQualifications.length > 0) {
      setQualificationsData(extractedQualifications); // Assuming `setQualificationsData` is your state update function
    }
  };

  const handleImport = async (index) => {
    setLoading(true); // Set loading to true to disable interactions
    consoleTerminal('Index :: ', index);

    try {
      const academicId = academicIds[index];

      // Validate input
      if (!academicId || !academicId.value) {
        toast.error('Invalid academic ID');
        return;
      }

      // Fetch ORCID record
      const response = await fetch(
        `https://pub.orcid.org/v3.0/${academicId.value}/record`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        toast.error(`Failed to fetch ORCID data: ${response.statusText}`);
        throw new Error(`ORCID API Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Response Data :: ', data);

      // Process and transform data
      fetchPublications(data);
      fetchEmployment(data);
      fetchDistinctions(data);
      fetchMemberships(data);
      fetchServices(data);
      fetchPeerReviews(data);
      fetchFundings(data);
      fetchInvitedPositions(data);
      fetchQualifications(data);

      // Use Promise.allSettled to handle multiple save operations concurrently
      const saveResults = await Promise.allSettled([
        handleSaveData(
          'Publications',
          orcidData,
          '/v1/faculty/researchpublications/import'
        ),
        handleSaveData(
          'Employment',
          employmentData,
          '/v1/faculty/experience/import'
        ),
        handleSaveData(
          'Distinctions',
          distinctionData,
          '/v1/faculty/awards/import'
        ),
        handleSaveData(
          'Memberships',
          membershipData,
          '/v1/faculty/professionalMembership/import'
        ),
        // // handleSaveData('Services', serviceData, '/v1/faculty/services/import'),
        handleSaveData(
          'Peer Reviews',
          peerReviewData,
          '/v1/faculty/peersfeedback/import'
        ),
        // handleSaveData('Fundings', fundingData, '/v1/faculty/projects/import'),
        // handleSaveData(
        //   'Invited Positions',
        //   invitedPositionData,
        //   '/v1/faculty/invitedpositions/import'
        // ),
        handleSaveData(
          'Qualifications',
          qualificationsData,
          '/v1/faculty/qualifications/import'
        ),
      ]);

      // Handle the results
      saveResults.forEach((result, index) => {
        const categoryNames = [
          'Publications',
          'Employment',
          'Distinctions',
          'Memberships',
          'Services',
          'Peer Reviews',
          'Fundings',
          'Invited Positions',
        ];
        const categoryName = categoryNames[index];

        if (result.status === 'fulfilled') {
          consoleTerminal(`${categoryName} imported successfully`);
        } else {
          console.error(`Error saving ${categoryName}:`, result.reason);
          toast.error(`Failed to save ${categoryName}`);
        }
      });

      // Handle final success feedback
      toast.success('All data processed and imported successfully');
    } catch (error) {
      console.error('Error during import:', error);
      toast.error('Failed to import ORCID data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle the save process for each category
  const handleSaveData = async (categoryName, data, apiEndpoint) => {
    if (data && data.length > 0) {
      try {
        const dataWithFaculty = data.map((item) => ({
          ...item,
          faculty_id, // Add the faculty ID to each data item
        }));

        const response = await axiosInstance.post(apiEndpoint, {
          [categoryName.toLowerCase()]: dataWithFaculty,
        });

        if (response.status === 201) {
          return { status: 'fulfilled' };
        } else {
          return {
            status: 'rejected',
            reason: `Failed to save ${categoryName}`,
          };
        }
      } catch (error) {
        return { status: 'rejected', reason: error.message };
      }
    } else {
      return {
        status: 'rejected',
        reason: `${categoryName} has no data to save.`,
      };
    }
  };

  const handleUpdate = (index) => {
    // Placeholder for update functionality
    alert(`Updating publications for ${academicIds[index].label}`);
  };

  consoleTerminal('Service Data :: ', serviceData);
  consoleTerminal('Invited Position Data :: ', invitedPositionData);
  consoleTerminal('Qualifications Data :: ', qualificationsData);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Validate input if needed
      const validatedIds = editedAcademicIds.map((id) => ({
        ...id,
        value: id.value.trim(),
      }));

      // API call to save academic IDs
      const response = await axiosInstance.post('/v1/faculty/academicid/add', {
        facultyId: faculty_id,
        academicIds: validatedIds,
      });

      if (response.status === 201) {
        // Update the displayed academic IDs with the saved data
        setAcademicIds(validatedIds);
        setEditedAcademicIds(validatedIds);
        setIsEditing(false);
        toast.success('Academic IDs updated successfully');
      } else {
        toast.error('Failed to update academic IDs');
      }
    } catch (error) {
      console.error('Error saving academic IDs:', error);
      toast.error('Error saving academic IDs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-full p-4 sm:p-6">
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Academic IDs</h2>
          <button
            onClick={handleToggleEdit}
            className={`px-3 py-1 rounded-md transition-colors duration-300 ${
              isEditing
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            disabled={loading}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          {isEditing && (
            <button
              onClick={handleSubmit}
              className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
              disabled={loading}
            >
              Save
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {editedAcademicIds.length > 0 ? (
            editedAcademicIds.map((id, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-gray-600 font-medium">{id.label}</span>
                  <div className="flex items-center space-x-2">
                    {id.importable && (
                      <>
                        <button
                          onClick={() => handleImport(index)}
                          className="text-blue-500 hover:text-blue-600"
                          title="Import Publications"
                          // disabled={loading || !isEditing}
                        >
                          <ImportIcon size={18} />
                        </button>
                        <button
                          onClick={() => handleUpdate(index)}
                          className="text-green-500 hover:text-green-600"
                          title="Update Publications"
                          disabled={loading || !isEditing}
                        >
                          <RefreshCcwIcon size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {isEditing ? (
                  <input
                    type="text"
                    value={id.value}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    className="w-full border border-blue-300 rounded px-2 py-1 text-gray-800"
                    disabled={loading}
                    placeholder={`Enter ${id.label}`}
                  />
                ) : (
                  <a
                    href={
                      id.label === 'Orcid Id'
                        ? `https://orcid.org/${id.value}`
                        : id.label === 'Scopus Id'
                        ? `https://www.scopus.com/authid/detail.uri?authorId=${id.value}`
                        : id.label === 'Researcher Id'
                        ? `https://www.researcherid.com/rid/${id.value}`
                        : id.label === 'Google Scholar Id'
                        ? `https://scholar.google.com/citations?user=${id.value}`
                        : '#'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold block truncate hover:underline hover:text-blue-800"
                  >
                    {id.value || 'Not set'}
                  </a>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No academic IDs available.</p>
          )}
        </div>

        {/* Show loading indicator */}
        {loading && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-200 bg-opacity-75 z-50">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4"></div>
              <p className="text-gray-800 text-lg font-semibold">Loading...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AcademicIDs;
