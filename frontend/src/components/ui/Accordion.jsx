import React, { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import {
  Edit2,
  Trash2,
  Plus,
  X,
  Check,
  Calendar,
  Building2,
  UserCircle2,
  Award,
  Link2,
  ChevronDown,
} from 'lucide-react';

function AccordionReviewCard({ title, data }) {
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState(null);

  // Helper methods for handling edit, delete, save, and adding new items
  const handleEdit = (item) => {
    setEditingItem(JSON.parse(JSON.stringify(item))); // Deep copy to avoid mutating original data
  };

  const handleDelete = (id) => {
    const filteredData = data.filter((item) => item.reviewGroupId !== id);
    setNewItem(filteredData); // Update state after deletion
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      setNewItem(
        data.map((item) =>
          item.reviewGroupId === editingItem.reviewGroupId ? editingItem : item
        )
      );
      setEditingItem(null); // Close editing mode
    }
  };

  const handleAddNew = () => {
    setNewItem({
      reviewGroupId: Date.now(),
      reviewerRole: '',
      completionYear: '',
      reviewType: '',
      reviewUrl: '',
      sourceName: '',
      organizationName: '',
      organizationCity: '',
      organizationRegion: '',
      organizationCountry: '',
    });
  };

  const handleSaveNew = () => {
    if (newItem && newItem.reviewerRole && newItem.sourceName) {
      setNewItem([...data, newItem]);
      setNewItem(null); // Clear new item form
    }
  };

  const renderInputWithIcon = (icon, color, value, onChange, placeholder) => (
    <div className="flex items-center border rounded">
      <span className={`pl-2 ${color}`}>
        {React.cloneElement(icon, { size: 18 })}
      </span>
      <input
        className="p-1 pl-2 w-full rounded outline-none"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );

  const renderItemContent = (item, isEditing) => {
    if (isEditing) {
      return (
        <div className="flex-grow grid grid-cols-2 gap-3">
          {renderInputWithIcon(
            <Calendar />,
            'text-blue-600',
            item.completionYear,
            (e) =>
              setEditingItem({
                ...item,
                completionYear: e.target.value,
              }),
            'Year'
          )}
          {renderInputWithIcon(
            <Building2 />,
            'text-red-600',
            item.sourceName,
            (e) =>
              setEditingItem({
                ...item,
                sourceName: e.target.value,
              }),
            'Organization'
          )}
          {renderInputWithIcon(
            <Award />,
            'text-purple-600',
            item.reviewType,
            (e) =>
              setEditingItem({
                ...item,
                reviewType: e.target.value,
              }),
            'Review Type'
          )}
          {renderInputWithIcon(
            <UserCircle2 />,
            'text-green-600',
            item.organizationRegion,
            (e) =>
              setEditingItem({
                ...item,
                organizationRegion: e.target.value,
              }),
            'Region'
          )}
          {renderInputWithIcon(
            <Link2 />,
            'text-indigo-600',
            item.reviewUrl,
            (e) =>
              setEditingItem({
                ...item,
                reviewUrl: e.target.value,
              }),
            'URL (if not N/A)'
          )}
        </div>
      );
    }

    return (
      <div className="flex-grow">
        <h3 className="text-xl font-semibold">{item.sourceName}</h3>
        <div className="flex items-center text-gray-600 mt-1">
          <Award size={16} className="mr-2 text-purple-600" />
          <span>Type: {item.reviewType}</span>
        </div>
        {item.organizationCountry && (
          <div className="flex items-center text-gray-700 mt-1">
            <UserCircle2 size={16} className="mr-2 text-green-600" />
            <span>Country: {item.organizationCountry}</span>
          </div>
        )}
        {item.reviewGroupId && (
          <div className="flex items-center text-gray-700 mt-1">
            <UserCircle2 size={16} className="mr-2 text-green-600" />
            <span>Id: {item.reviewGroupId}</span>
          </div>
        )}
        {item.organizationName && (
          <div className="flex items-center text-gray-700 mt-1">
            <UserCircle2 size={16} className="mr-2 text-green-600" />
            <span>By: {item.organizationName}</span>
          </div>
        )}
        {item.reviewUrl && (
          <div className="flex items-center text-gray-700 mt-1">
            <Link2 size={16} className="mr-2 text-indigo-600" />
            {item.reviewUrl !== 'N/A' ? (
              <a
                href={item.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {item.reviewUrl}
              </a>
            ) : (
              <span>{item.reviewUrl}</span>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <Accordion.Root
      type="single"
      collapsible
      className="bg-white shadow rounded-lg p-6 mb-4"
    >
      <Accordion.Item value="review-section">
        <Accordion.Header>
          <Accordion.Trigger className="flex justify-between items-center w-full">
            <h2 className="text-2xl font-bold ">{title}</h2>
            <div className="flex items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddNew();
                }}
                className="text-green-600 hover:bg-green-100 p-2 rounded-full mr-2"
              >
                <Plus />
              </button>
              <ChevronDown
                className="transition-transform duration-300 group-data-[state=open]:rotate-180"
                aria-hidden
              />
            </div>
          </Accordion.Trigger>
        </Accordion.Header>

        <Accordion.Content className="AccordionContent">
          {/* New Item Section */}
          {newItem && (
            <div className="flex items-center mb-4 pb-4 border-b bg-green-50 p-4 rounded">
              <div className="flex-grow grid grid-cols-2 gap-3">
                {renderInputWithIcon(
                  <Calendar />,
                  'text-blue-600',
                  newItem.completionYear,
                  (e) =>
                    setNewItem({
                      ...newItem,
                      completionYear: e.target.value,
                    }),
                  'Year'
                )}
                {renderInputWithIcon(
                  <Building2 />,
                  'text-red-600',
                  newItem.sourceName,
                  (e) =>
                    setNewItem({
                      ...newItem,
                      sourceName: e.target.value,
                    }),
                  'Organization'
                )}
                {renderInputWithIcon(
                  <Award />,
                  'text-purple-600',
                  newItem.reviewType,
                  (e) =>
                    setNewItem({
                      ...newItem,
                      reviewType: e.target.value,
                    }),
                  'Review Type'
                )}
                {renderInputWithIcon(
                  <UserCircle2 />,
                  'text-green-600',
                  newItem.organizationRegion,
                  (e) =>
                    setNewItem({
                      ...newItem,
                      organizationRegion: e.target.value,
                    }),
                  'Region'
                )}
                {renderInputWithIcon(
                  <Link2 />,
                  'text-indigo-600',
                  newItem.reviewUrl,
                  (e) =>
                    setNewItem({
                      ...newItem,
                      reviewUrl: e.target.value,
                    }),
                  'URL (if not N/A)'
                )}
                {/* Render other fields similarly */}
              </div>
              <div className="flex ml-4">
                <button
                  onClick={handleSaveNew}
                  className="text-green-600 hover:bg-green-100 p-2 rounded-full mr-2"
                >
                  <Check />
                </button>
                <button
                  onClick={() => setNewItem(null)}
                  className="text-red-600 hover:bg-red-100 p-2 rounded-full"
                >
                  <X />
                </button>
              </div>
            </div>
          )}

          {/* Existing Items List */}
          {data.length > 0 ? (
            data.map((item) => (
              <div
                key={item.reviewGroupId}
                className="flex items-center my-4 pb-4 border-b"
              >
                <div className="w-20 mr-4 text-right">
                  <div className="flex items-center justify-end">
                    <Calendar size={14} className="mr-1 text-blue-600" />
                    <p className="text-sm text-gray-500 font-semibold">
                      {item.completionYear}
                    </p>
                  </div>
                </div>

                {editingItem &&
                editingItem.reviewGroupId === item.reviewGroupId ? (
                  <>
                    {renderItemContent(editingItem, true)}
                    <div className="flex ml-4">
                      <button
                        onClick={handleSaveEdit}
                        className="text-green-600 hover:bg-green-100 p-2 rounded-full mr-2"
                      >
                        <Check />
                      </button>
                      <button
                        onClick={() => setEditingItem(null)}
                        className="text-red-600 hover:bg-red-100 p-2 rounded-full"
                      >
                        <X />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {renderItemContent(item, false)}
                    <div className="flex ml-4">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:bg-blue-100 p-2 rounded-full mr-2"
                      >
                        <Edit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(item.reviewGroupId)}
                        className="text-red-600 hover:bg-red-100 p-2 rounded-full"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center py-4">
              {' '}
              No data available{' '}
            </div>
          )}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

export default AccordionReviewCard;
