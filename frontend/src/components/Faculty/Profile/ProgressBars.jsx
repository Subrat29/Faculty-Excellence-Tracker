import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, User, Briefcase, Award, BookOpen, GraduationCap, FileText } from 'lucide-react';

function ProgressBars() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [progressData, setProgressData] = useState([
    { 
      label: "Personal", 
      value: 40,
      icon: <User className="text-neutral-600" />,
      description: "Complete your basic profile information",
      color: "bg-neutral-600"
    },
    { 
      label: "Expertise", 
      value: 20,
      icon: <Award className="text-neutral-600" />,
      description: "Add your skills and areas of expertise",
      color: "bg-neutral-600"
    },
    { 
      label: "Experience", 
      value: 10,
      icon: <Briefcase className="text-neutral-600" />,
      description: "Add your professional work experience",
      color: "bg-neutral-600"
    },
    { 
      label: "Qualification", 
      value: 30,
      icon: <GraduationCap className="text-neutral-600" />,
      description: "Update your educational qualifications",
      color: "bg-neutral-600"
    },
    { 
      label: "Academic Identity", 
      value: 40,
      icon: <BookOpen className="text-neutral-600" />,
      description: "Complete your academic profile and research interests",
      color: "bg-neutral-600"
    },
    { 
      label: "Publication", 
      value: 60,
      icon: <FileText className="text-neutral-600" />,
      description: "Add and verify your research publications",
      color: "bg-neutral-600"
    },
  ]);

  const [totalProgress, setTotalProgress] = useState(0);

  useEffect(() => {
    const averageProgress = progressData.reduce((sum, item) => sum + item.value, 0) / progressData.length;
    setTotalProgress(Math.round(averageProgress));
  }, [progressData]);

  const getProgressStatus = (progress) => {
    if (progress < 30) return "Getting Started";
    if (progress < 60) return "Making Progress";
    if (progress < 90) return "Almost There";
    return "Profile Completed";
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-neutral-800">Profile Completion</h2>
          <div className="flex items-center space-x-2">
            <div className="w-full bg-neutral-200 rounded-full h-1.5 mr-2">
              <div 
                className="bg-neutral-800 h-1.5 rounded-full" 
                style={{ width: `${totalProgress}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-neutral-600">
              {totalProgress}%
            </span>
          </div>
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-neutral-600 hover:bg-neutral-100 p-1.5 rounded-full transition-colors"
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-3">
          {progressData.map((item) => (
            <div key={item.label} className="group">
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center space-x-2">
                  {item.icon}
                  <span className="text-sm text-neutral-700">{item.label}</span>
                </div>
                <span className="text-xs text-neutral-500">{item.value}%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-1.5">
                <div
                  className={`${item.color} h-1.5 rounded-full`}
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProgressBars;