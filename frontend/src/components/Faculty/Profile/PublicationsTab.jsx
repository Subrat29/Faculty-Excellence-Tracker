import React, { useEffect, useState } from 'react';
import {
  FileText,
  Newspaper,
  BookOpen,
  Filter,
  Edit2,
  Trash2,
  Plus,
  X,
  Check,
  BookmarkPlus,
  Users,
  Calendar,
  FileSpreadsheet,
  Link2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import axiosInstance from '../../../services/admin';
import { useSelector } from 'react-redux';
import consoleTerminal from '../../../utils/consoleTerminal';

function PublicationsTab() {
  const faculty_id = useSelector((state) => state.auth.user._id);

  // Enhanced state management
  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [editingPublication, setEditingPublication] = useState(null);
  const [newPublication, setNewPublication] = useState(null);

  // New state for managing component state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Comprehensive publication type mapping
  const PUBLICATION_TYPES = {
    'journal-article': 'Journal Article',
    'conference-paper': 'Conference Paper',
    'book-chapter': 'Book Chapter',
    review: 'Review',
    editorial: 'Editorial',
  };

  // Fetch publications with comprehensive error handling
  const fetchPublications = async () => {
    if (!faculty_id) {
      setError('No faculty ID found');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(
        `/v1/faculty/researchpublications/fetch/${faculty_id}`
      );

      if (response.status === 200) {
        const fetchedPublications = response.data.data.map((pub) => ({
          ...pub,
          id: pub._id,
          type: PUBLICATION_TYPES[pub.publication_type] || pub.publication_type,
          publication: pub.journal_or_book_name,
          year: pub.publication_year,
          doi: pub.doi,
          citations: pub.citation_count,
          authors: pub.authors.length > 0 ? pub.authors.join('; ') : 'N/A',
        }));

        setPublications(fetchedPublications);
        setFilteredPublications(fetchedPublications);
      } else {
        throw new Error('Failed to fetch publications');
      }
    } catch (error) {
      console.error('Error fetching publications:', error);
      setError(error.response?.data?.message || 'Failed to fetch publications');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, [faculty_id]);

  // Publication type filter configuration
  const publicationTypes = [
    { key: 'all', label: 'All', icon: <FileText /> },
    ...Object.entries(PUBLICATION_TYPES).map(([key, label]) => ({
      key: label,
      label,
      icon: getIconForPublicationType(label),
    })),
  ];

  // Icon selection helper
  function getIconForPublicationType(type) {
    const iconMap = {
      'Journal Article': <FileSpreadsheet />,
      'Conference Paper': <BookOpen />,
      'Book Chapter': <BookmarkPlus />,
      Review: <Filter />,
      Editorial: <Edit2 />,
    };
    return iconMap[type] || <Newspaper />;
  }

  // Enhanced filtering
  const handleFilter = (type) => {
    setActiveFilter(type);
    setFilteredPublications(
      type === 'all'
        ? publications
        : publications.filter((pub) => pub.type === type)
    );
  };

  // Edit publication handler
  const handleEdit = (publication) => {
    setEditingPublication({
      ...publication,
      authors: publication.authors || '',
    });
  };

  // Delete publication with error handling
  const handleDelete = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      consoleTerminal('Deleting publication with ID:', id);
      //   const response = await axiosInstance.delete(
      //     `/v1/faculty/researchpublications/${id}`
      //   );

      //   if (response.status === 200) {
      //     const updatedPublications = publications.filter((pub) => pub.id !== id);
      //     setPublications(updatedPublications);
      //     setFilteredPublications(
      //       activeFilter === 'all'
      //         ? updatedPublications
      //         : updatedPublications.filter((pub) => pub.type === activeFilter)
      //     );
      //   }
    } catch (error) {
      console.error('Error deleting publication:', error);
      setError(error.response?.data?.message || 'Failed to delete publication');
    } finally {
      setIsLoading(false);
    }
  };

  // New publication input fields rendering
  const renderNewPublicationFields = () => {
    return (
      <div className="flex-grow grid grid-cols-2 gap-3">
        {renderInputWithIcon(
          <FileText />,
          'text-blue-600',
          newPublication.title,
          (e) =>
            setNewPublication({
              ...newPublication,
              title: e.target.value,
            }),
          'Publication Title'
        )}
        {renderInputWithIcon(
          <Users />,
          'text-green-600',
          newPublication.authors,
          (e) =>
            setNewPublication({
              ...newPublication,
              authors: e.target.value,
            }),
          'Authors (Semicolon separated)'
        )}
        <select
          className="p-1 rounded border"
          value={newPublication.publication_type}
          onChange={(e) =>
            setNewPublication({
              ...newPublication,
              publication_type: e.target.value,
            })
          }
        >
          <option value="">Select Publication Type</option>
          {Object.keys(PUBLICATION_TYPES).map((type) => (
            <option key={type} value={type}>
              {PUBLICATION_TYPES[type]}
            </option>
          ))}
        </select>
        {renderInputWithIcon(
          <Newspaper />,
          'text-red-600',
          newPublication.journal_or_book_name,
          (e) =>
            setNewPublication({
              ...newPublication,
              journal_or_book_name: e.target.value,
            }),
          'Publication Name'
        )}
        {renderInputWithIcon(
          <Calendar />,
          'text-orange-600',
          newPublication.publication_year,
          (e) =>
            setNewPublication({
              ...newPublication,
              publication_year: e.target.value,
            }),
          'Year'
        )}
        {renderInputWithIcon(
          <Link2 />,
          'text-blue-400',
          newPublication.doi,
          (e) => setNewPublication({ ...newPublication, doi: e.target.value }),
          'DOI (Optional)'
        )}
      </div>
    );
  };

  // Validation helper
  const validatePublication = (publication) => {
    const requiredFields = [
      'title',
      'authors',
      'publication_type',
      'publication_year',
    ];
    return requiredFields.every(
      (field) =>
        publication[field] && publication[field].toString().trim() !== ''
    );
  };

  // Save new publication with comprehensive error handling
  const handleSaveNew = async () => {
    if (!validatePublication(newPublication)) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const publicationData = {
        faculty_id,
        title: newPublication.title,
        authors: newPublication.authors.split(';').map((a) => a.trim()),
        publication_type: newPublication.publication_type,
        journal_or_book_name: newPublication.journal_or_book_name,
        publication_year: newPublication.publication_year,
        doi: newPublication.doi || '',
        volume: newPublication.volume || '',
        page_no: newPublication.page_no || '',
      };

      const response = await axiosInstance.post(
        '/v1/faculty/researchpublications',
        publicationData
      );

      if (response.status === 201) {
        await fetchPublications();
        setNewPublication(null);
      }
    } catch (error) {
      console.error('Error saving new publication:', error);
      setError(error.response?.data?.message || 'Failed to save publication');
    } finally {
      setIsLoading(false);
    }
  };

  // Update publication with error handling
  const handleSaveEdit = async () => {
    if (!validatePublication(editingPublication)) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const publicationData = {
        title: editingPublication.title,
        authors: editingPublication.authors.split(';').map((a) => a.trim()),
        publication_type: editingPublication.publication_type,
        journal_or_book_name: editingPublication.publication,
        publication_year: editingPublication.year,
        doi: editingPublication.doi || '',
        volume: editingPublication.volume || '',
        page_no: editingPublication.page_no || '',
      };

      consoleTerminal('Publication Data :: ', publicationData);

      //   const response = await axiosInstance.put(
      //     `/v1/faculty/researchpublications/${editingPublication.id}`,
      //     publicationData
      //   );

      //   if (response.status === 200) {
      //     await fetchPublications();
      //     setEditingPublication(null);
      //   }
    } catch (error) {
      console.error('Error updating publication:', error);
      setError(error.response?.data?.message || 'Failed to update publication');
    } finally {
      setIsLoading(false);
    }
  };

  // Render error message
  const renderErrorMessage = () => {
    if (!error) return null;
    return (
      <div
        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4"
        role="alert"
      >
        <div className="flex items-center">
          <AlertCircle className="mr-2" size={20} />
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  };

  // Render loading spinner
  const renderLoadingSpinner = () => {
    if (!isLoading) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <Loader2 className="animate-spin text-white" size={48} />
      </div>
    );
  };

  const renderInputWithIcon = (icon, color, value, onChange, placeholder) => (
    <div className="flex items-center border rounded">
      <span className={`pl-2 ${color}`}>
        {React.cloneElement(icon, { size: 18 })}
      </span>
      <input
        className="p-1 pl-2 w-full rounded outline-none"
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );

  const renderPublicationContent = (publication, isEditing) => {
    if (isEditing) {
      return (
        <div className="flex-grow grid grid-cols-2 gap-3">
          {renderInputWithIcon(
            <FileText />,
            'text-blue-600',
            publication.title,
            (e) =>
              setEditingPublication({
                ...publication,
                title: e.target.value,
              }),
            'Publication Title'
          )}
          {renderInputWithIcon(
            <Users />,
            'text-green-600',
            publication.authors || 'N/A',
            (e) =>
              setEditingPublication({
                ...publication,
                authors: e.target.value,
              }),
            'Authors (Semicolon separated)'
          )}
          <select
            className="p-1 rounded border"
            value={publication.publication_type}
            onChange={(e) =>
              setEditingPublication({
                ...publication,
                publication_type: e.target.value,
              })
            }
          >
            <option value="">Select Publication Type</option>
            {Object.keys(PUBLICATION_TYPES).map((type) => (
              <option key={type} value={type}>
                {PUBLICATION_TYPES[type]}
              </option>
            ))}
          </select>
          {renderInputWithIcon(
            <Newspaper />,
            'text-red-600',
            publication.publication,
            (e) =>
              setEditingPublication({
                ...publication,
                publication: e.target.value,
              }),
            'Publication Name'
          )}
          {renderInputWithIcon(
            <Calendar />,
            'text-orange-600',
            publication.year,
            (e) =>
              setEditingPublication({
                ...publication,
                year: e.target.value,
              }),
            'Year'
          )}
          {renderInputWithIcon(
            <Link2 />,
            'text-blue-400',
            publication.doi,
            (e) =>
              setEditingPublication({ ...publication, doi: e.target.value }),
            'DOI'
          )}
        </div>
      );
    }

    return (
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{publication.title}</h3>
        <div className="flex items-center text-gray-600 mt-1">
          <Users size={16} className="mr-2 text-green-600" />
          <span>{publication.authors}</span>
        </div>
        <div className="flex items-center text-gray-700 mt-1">
          <Filter size={16} className="mr-2 text-purple-600" />
          <span>{publication.type}</span>
        </div>
        {publication.publication && (
          <div className="flex items-center text-gray-600 mt-1">
            <Newspaper size={16} className="mr-2 text-red-600" />
            <span>{publication.publication}</span>
          </div>
        )}
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <Calendar size={14} className="mr-2 text-orange-600" />
          <span>{publication.year}</span>
        </div>
        {publication.doi && (
          <div className="flex items-center text-sm text-blue-500 mt-1">
            <Link2 size={14} className="mr-2 text-blue-600" />
            <a
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-700"
            >
              {publication.doi}
            </a>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 relative">
      {renderLoadingSpinner()}
      {renderErrorMessage()}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Publications</h2>
        <button
          onClick={() =>
            setNewPublication({
              title: '',
              authors: '',
              publication_type: '',
              journal_or_book_name: '',
              publication_year: '',
              doi: '',
              volume: '',
              page_no: '',
            })
          }
          className="text-green-600 hover:bg-green-100 p-2 rounded-full"
        >
          <Plus />
        </button>
      </div>

      <div className="flex overflow-x-auto space-x-2 mb-4 pb-2 border-b">
        {publicationTypes.map((type) => (
          <button
            key={type.key}
            onClick={() => handleFilter(type.key)}
            className={`
              flex items-center px-3 py-2 rounded-full text-sm 
              ${
                activeFilter === type.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {React.cloneElement(type.icon, {
              size: 16,
              className: 'mr-2',
            })}
            {type.label}
          </button>
        ))}
      </div>

      <p className="text-gray-600 mb-4">
        Total Publications: {publications.length}
      </p>

      {newPublication && (
        <div className="flex items-center mb-4 pb-4 border-b bg-green-50 p-4 rounded">
          {renderNewPublicationFields()}
          <div className="flex ml-4">
            <button
              onClick={handleSaveNew}
              className="text-green-600 hover:bg-green-100 p-2 rounded-full mr-2"
            >
              <Check />
            </button>
            <button
              onClick={() => setNewPublication(null)}
              className="text-red-600 hover:bg-red-100 p-2 rounded-full"
            >
              <X />
            </button>
          </div>
        </div>
      )}

      {filteredPublications.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          No publications found.
        </div>
      ) : (
        filteredPublications.map((publication) => (
          <div
            key={publication.id}
            className="flex items-center mb-4 pb-4 border-b"
          >
            {editingPublication && editingPublication.id === publication.id ? (
              <>
                {renderPublicationContent(editingPublication, true)}
                <div className="flex ml-4">
                  <button
                    onClick={handleSaveEdit}
                    className="text-green-600 hover:bg-green-100 p-2 rounded-full mr-2"
                  >
                    <Check />
                  </button>
                  <button
                    onClick={() => setEditingPublication(null)}
                    className="text-red-600 hover:bg-red-100 p-2 rounded-full"
                  >
                    <X />
                  </button>
                </div>
              </>
            ) : (
              <>
                {renderPublicationContent(publication, false)}
                <div className="flex ml-4">
                  <button
                    onClick={() => handleEdit(publication)}
                    className="text-blue-600 hover:bg-blue-100 p-2 rounded-full mr-2"
                  >
                    <Edit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(publication.id)}
                    className="text-red-600 hover:bg-red-100 p-2 rounded-full"
                  >
                    <Trash2 />
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default PublicationsTab;
