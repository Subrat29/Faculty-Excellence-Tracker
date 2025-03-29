import React, { useEffect, useState } from 'react';
import {
  Edit2,
  Trash2,
  Plus,
  X,
  Check,
  DollarSign,
  Clock,
  Users,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import axiosInstance from '../../../services/admin';
import { useSelector } from 'react-redux';
import consoleTerminal from '../../../utils/consoleTerminal';

function ResearchProjectsTab() {
  const faculty_id = useSelector((state) => state.auth.user._id);
  const [researchProjects, setResearchProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState(null);

  const fetchResearchData = async () => {
    const response = await axiosInstance.get(
      `/v1/faculty/projects/fetch/${faculty_id}`
    );

    if (response.status === 200) {
      consoleTerminal('Research data :: ', response.data.data);
      setResearchProjects(response.data.data);
    }
  };

  useEffect(() => {
    if (faculty_id) {
      fetchResearchData();
    }
  }, [faculty_id]);

  const handleEdit = (project) => {
    setEditingProject({ ...project });
  };

  const handleDelete = (id) => {
    setResearchProjects(
      researchProjects.filter((project) => project._id !== id)
    );
  };

  const handleSaveEdit = () => {
    if (
      editingProject &&
      Object.values(editingProject).every((val) => val !== '')
    ) {
      setResearchProjects(
        researchProjects.map((project) =>
          project._id === editingProject._id ? editingProject : project
        )
      );
      setEditingProject(null);
    }
  };

  const handleAddNew = () => {
    setNewProject({
      _id: Date.now(),
      project_name: '',
      organization_name: '',
      status: '',
      team: '',
      funding_amount: '',
      project_start_date: '',
      project_end_date: '',
    });
  };

  const handleSaveNew = () => {
    if (
      newProject &&
      newProject.project_name &&
      newProject.organization_name &&
      newProject.status &&
      newProject.team &&
      newProject.funding_amount &&
      newProject.project_start_date &&
      newProject.project_end_date
    ) {
      setResearchProjects([...researchProjects, newProject]);
      setNewProject(null);
    } else {
      alert('Please fill in all fields');
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

  const renderProjectContent = (project, isEditing) => {
    if (isEditing) {
      return (
        <div className="flex-grow grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <input
              className="w-full border p-1 rounded"
              value={project.project_name}
              onChange={(e) =>
                setEditingProject({ ...project, project_name: e.target.value })
              }
              placeholder="Project Title"
            />
          </div>
          {renderInputWithIcon(
            <Building2 />,
            'text-red-600',
            project.organization_name,
            (e) =>
              setEditingProject({
                ...project,
                organization_name: e.target.value,
              }),
            'Funding Agency'
          )}
          {renderInputWithIcon(
            <CheckCircle2 />,
            'text-green-600',
            project.status,
            (e) => setEditingProject({ ...project, status: e.target.value }),
            'Status'
          )}
          {renderInputWithIcon(
            <Users />,
            'text-blue-600',
            project.team,
            (e) => setEditingProject({ ...project, team: e.target.value }),
            'Team'
          )}
          {renderInputWithIcon(
            <DollarSign />,
            'text-purple-600',
            project.funding_amount,
            (e) =>
              setEditingProject({
                ...project,
                funding_amount: e.target.value,
              }),
            'Funding Amount'
          )}
          {renderInputWithIcon(
            <Clock />,
            'text-orange-600',
            project.project_start_date,
            (e) =>
              setEditingProject({
                ...project,
                project_start_date: e.target.value,
              }),
            'Start Date'
          )}
          {renderInputWithIcon(
            <Clock />,
            'text-orange-600',
            project.project_end_date,
            (e) =>
              setEditingProject({
                ...project,
                project_end_date: e.target.value,
              }),
            'End Date'
          )}
        </div>
      );
    }

    const duration =
      project.project_start_date && project.project_end_date
        ? `${project.project_start_date} - ${project.project_end_date}`
        : 'N/A'; // Fallback if no start or end date exists

    return (
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{project.project_name}</h3>
        <div className="flex items-center text-gray-600 mt-1">
          <Building2 size={16} className="mr-2 text-red-600" />
          <span>{project.organization_name || 'N/A'}</span>
          {project.organization_city && (
            <span className="ml-1">({project.organization_city})</span>
          )}
        </div>
        <div className="flex items-center text-gray-700 mt-1">
          <Users size={16} className="mr-2 text-blue-600" />
          <span>{project.team || 'N/A'}</span>
        </div>
        <div className="flex items-center text-gray-600 mt-1">
          <DollarSign size={16} className="mr-2 text-purple-600" />
          <span>{project.funding_amount || 'N/A'}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <Clock size={14} className="mr-2 text-orange-600" />
          <span>{duration || 'N/A'}</span>
        </div>
        <div className="flex items-center text-gray-600 mt-1">
          <CheckCircle2 size={16} className="mr-2 text-green-600" />
          <span>{project.status || 'N/A'}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Research Projects</h2>
        <button
          onClick={handleAddNew}
          className="text-green-600 hover:bg-green-100 p-2 rounded-full"
        >
          <Plus />
        </button>
      </div>

      {newProject && (
        <div className="flex items-center mb-4 pb-4 border-b bg-green-50 p-4 rounded">
          <div className="flex-grow grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <input
                className="w-full border p-1 rounded"
                value={newProject.project_name}
                onChange={(e) =>
                  setNewProject({ ...newProject, project_name: e.target.value })
                }
                placeholder="Project Title"
              />
            </div>
            {renderInputWithIcon(
              <Building2 />,
              'text-red-600',
              newProject.organization_name,
              (e) =>
                setNewProject({
                  ...newProject,
                  organization_name: e.target.value,
                }),
              'Funding Agency'
            )}
            {renderInputWithIcon(
              <CheckCircle2 />,
              'text-green-600',
              newProject.status,
              (e) => setNewProject({ ...newProject, status: e.target.value }),
              'Status'
            )}
            {renderInputWithIcon(
              <Users />,
              'text-blue-600',
              newProject.team,
              (e) => setNewProject({ ...newProject, team: e.target.value }),
              'Team'
            )}
            {renderInputWithIcon(
              <DollarSign />,
              'text-purple-600',
              newProject.funding_amount,
              (e) =>
                setNewProject({
                  ...newProject,
                  funding_amount: e.target.value,
                }),
              'Funding Amount'
            )}
            {renderInputWithIcon(
              <Clock />,
              'text-orange-600',
              newProject.project_start_date,
              (e) =>
                setNewProject({
                  ...newProject,
                  project_start_date: e.target.value,
                }),
              'Start Date'
            )}
            {renderInputWithIcon(
              <Clock />,
              'text-orange-600',
              newProject.project_end_date,
              (e) =>
                setNewProject({
                  ...newProject,
                  project_end_date: e.target.value,
                }),
              'End Date'
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
              onClick={() => setNewProject(null)}
              className="text-red-600 hover:bg-red-100 p-2 rounded-full"
            >
              <X />
            </button>
          </div>
        </div>
      )}

      {researchProjects.map((project) => (
        <div key={project._id} className="flex items-center mb-4 pb-4 border-b">
          <div className="w-20 mr-4 text-right">
            <div className="flex items-center justify-end">
              <Clock size={14} className="mr-1 text-orange-600" />
              <p className="text-sm text-gray-500 font-semibold">
                {project.project_start_date}-{project.project_end_date}
              </p>
            </div>
            <div className="flex items-center justify-end">
              <CheckCircle2 size={14} className="mr-1 text-green-600" />
              <p className="text-xs text-gray-400">{project.status}</p>
            </div>
          </div>

          {editingProject && editingProject._id === project._id ? (
            <>
              {renderProjectContent(editingProject, true)}
              <div className="flex ml-4">
                <button
                  onClick={handleSaveEdit}
                  className="text-green-600 hover:bg-green-100 p-2 rounded-full mr-2"
                >
                  <Check />
                </button>
                <button
                  onClick={() => setEditingProject(null)}
                  className="text-red-600 hover:bg-red-100 p-2 rounded-full"
                >
                  <X />
                </button>
              </div>
            </>
          ) : (
            <>
              {renderProjectContent(project, false)}
              <div className="flex ml-4">
                <button
                  onClick={() => handleEdit(project)}
                  className="text-blue-600 hover:bg-blue-100 p-2 rounded-full mr-2"
                >
                  <Edit2 />
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
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

export default ResearchProjectsTab;
