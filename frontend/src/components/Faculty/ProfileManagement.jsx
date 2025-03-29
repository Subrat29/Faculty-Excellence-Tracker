import React, { useState } from 'react';
import {
  User,
  FileText,
  Telescope,
  Briefcase,
  GraduationCap,
  Award,
  BookOpen,
  Medal,
  Network,
  Filter,
  BookmarkIcon,
  PenLine,
} from 'lucide-react';
import ProfileHeader from './Profile/ProfileHeader';
import OverviewTab from './Profile/OverviewTab';
import PersonalInformationTab from './Profile/PersonalInformationTab';
import ExperienceTab from './Profile/ExperienceTab';
import EducationTab from './Profile/EducationTab';
import AwardsTab from './Profile/AwardsTab';
import DoctoralThesesGuidedTab from './Profile/DoctoralThesesGuidedTab';
import ProfessionalBodiesMembershipTab from './Profile/ProfessionalBodiesMembershipTab';
import ResearchProjectsTab from './Profile/ResearchProjectsTab';
import IntellectualPropertyTab from './Profile/IntellectualPropertyTab';
import PublicationsTab from './Profile/PublicationsTab';
import ExpertiseInformationTab from './Profile/ExpertiseInformationTab';
import AccordCard from './Profile/OtherActivities';

const TABS = [
  { name: 'Overview', icon: User, component: OverviewTab },
  {
    name: 'Personal Information',
    icon: FileText,
    component: PersonalInformationTab,
  },
  {
    name: 'Expertise Information',
    icon: Telescope,
    component: ExpertiseInformationTab,
  },
  { name: 'Experience', icon: Briefcase, component: ExperienceTab },
  {
    name: 'Education Qualification',
    icon: GraduationCap,
    component: EducationTab,
  },
  { name: 'Honours and Awards', icon: Award, component: AwardsTab },
  {
    name: 'Doctoral Theses Guided',
    icon: BookOpen,
    component: DoctoralThesesGuidedTab,
  },
  {
    name: 'Professional Memberships',
    icon: Medal,
    component: ProfessionalBodiesMembershipTab,
  },
  { name: 'Research Projects', icon: Filter, component: ResearchProjectsTab },
  { name: 'Patents', icon: BookmarkIcon, component: IntellectualPropertyTab },
  { name: 'Publications', icon: PenLine, component: PublicationsTab },
  { name: 'Other Activities', icon: Network, component: AccordCard },
];

function ProfileTabs() {
  const [activeTab, setActiveTab] = useState(TABS[0].name);
  const ActiveComponent =
    TABS.find((tab) => tab.name === activeTab)?.component || OverviewTab;

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden max-w-7xl mx-auto">
      <div className="border-b border-gray-200">
        <div className="grid grid-cols-6 gap-1 bg-gray-50">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`
                  group flex flex-col items-center justify-center 
                  p-3 transition-all duration-300 border-b-4
                  ${
                    activeTab === tab.name
                      ? 'bg-blue-50 border-blue-600 text-blue-700'
                      : 'hover:bg-gray-100 border-transparent text-gray-600 hover:text-blue-600'
                  }
                `}
              >
                <Icon
                  size={20}
                  className={`mb-2 
                    ${
                      activeTab === tab.name
                        ? 'text-blue-600'
                        : 'text-gray-500 group-hover:text-blue-500'
                    }
                  `}
                />
                <span className="text-xs font-medium text-center">
                  {tab.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6 bg-gray-50 min-h-[calc(100vh-300px)]">
        <div className="animate-fade-in">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <ProfileHeader />
      <ProfileTabs />
    </div>
  );
}

export default App;
