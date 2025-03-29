// import { useState } from "react";
// import { User, FileText, Telescope, Briefcase, GraduationCap, Award, BookOpen, Medal, Network, Filter, BookmarkIcon, PenLine } from "phosphor-react";
// import OverviewTab from "./OverviewTab";
// import PersonalInformationTab from "./PersonalInformationTab";\
// import ExpertiseInformationTab from "./ExpertiseInformationTab";
// import ExperienceTab from "./ExperienceTab";
// import EducationTab from "./EducationTab";
// import HonoursTab from "./HonoursTab";
// import DoctoralThesesTab from "./DoctoralThesesTab";
// import ProfessionalBodiesTab from "./ProfessionalBodiesTab";
// import CommitteeMembershipTab from "./CommitteeMembershipTab";
// import ResearchProjectsTab from "./ResearchProjectsTab";
// import PatentsTab from "./PatentsTab";
// import PublicationsTab from ".././PublicationsTab";



// const TABS = [
//     { name: "Overview", icon: User, component: OverviewTab },
//     { name: "Personal Information", icon: FileText, component: PersonalInformationTab },
//     { name: "Expertise Information", icon: Telescope, component: ExpertiseInformationTab },
//     { name: "Experience", icon: Briefcase, component: ExperienceTab },
//     { name: "Education Qualification", icon: GraduationCap, component: EducationTab },
//     { name: "Honours and Awards", icon: Award, component: HonoursTab },
//     { name: "Doctoral Theses Guided", icon: BookOpen, component: DoctoralThesesTab },
//     { name: "Professional Bodies", icon: Medal, component: ProfessionalBodiesTab },
//     { name: "Membership in Committee", icon: Network, component: CommitteeMembershipTab },
//     { name: "Research Projects", icon: Filter, component: ResearchProjectsTab },
//     { name: "Patents", icon: BookmarkIcon, component: PatentsTab },
//     { name: "Publications", icon: PenLine, component: PublicationsTab }
// ];

// function ProfileTabs() {
//     const [activeTab, setActiveTab] = useState(TABS[0].name);
//     const ActiveComponent = TABS.find(tab => tab.name === activeTab)?.component || OverviewTab;

//     return (
//         <div className="bg-white shadow-md">
//             <div className="grid grid-cols-6 gap-2 p-2">
//                 {TABS.map((tab) => {
//                     const Icon = tab.icon;
//                     return (
//                         <button
//                             key={tab.name}
//                             onClick={() => setActiveTab(tab.name)}
//                             className={`flex items-center justify-center p-3 space-x-2 rounded transition-all ${activeTab === tab.name
//                                 ? 'bg-blue-600 text-white'
//                                 : 'hover:bg-blue-100 text-gray-700'
//                                 }`}
//                         >
//                             <Icon size={20} />
//                             <span className="text-sm font-medium">{tab.name}</span>
//                         </button>
//                     );
//                 })}
//             </div>
//             <div className="p-6 bg-gray-50">
//                 <ActiveComponent />
//             </div>
//         </div>
//     );
// }

// export default ProfileTabs;