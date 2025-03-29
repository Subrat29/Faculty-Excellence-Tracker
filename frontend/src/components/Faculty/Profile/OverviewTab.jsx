
import React from "react";
import AcademicIDs from "./AcademicIDs";
import StatsCard from "./StatsCard";
import {
  BookOpenIcon,
  FileTextIcon,
  AwardIcon,
  PackageIcon,
  BuildingIcon,
  BookmarkIcon,
  StarIcon,
  NetworkIcon
} from 'lucide-react';
import ProgressBars from "./ProgressBars";

function OverviewTab() {
  return (
    <div className="space-y-6 p-4 bg-gray-50">
      <AcademicIDs />

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Publication Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard
              title="Journal Articles"
              value="110"
              icon={FileTextIcon}
            />
            <StatsCard
              title="In Proceedings"
              value="25"
              icon={BookOpenIcon}
            />
            <StatsCard
              title="Books"
              value="6"
              icon={BookmarkIcon}
            />
            <StatsCard
              title="Conference Proceedings"
              value="129"
              icon={BuildingIcon}
            />
            <StatsCard
              title="Projects"
              value="42"
              icon={PackageIcon}
            />
            <StatsCard
              title="Awards"
              value="5"
              icon={AwardIcon}
            />
            <StatsCard
              title="Patents"
              value="3"
              icon={StarIcon}
            />
            <StatsCard
              title="Theses Guided"
              value="132"
              icon={NetworkIcon}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Citation Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatsCard
              title="Total Citations"
              value="1,515"
              icon={FileTextIcon}
            />
            <StatsCard
              title="H-Index"
              value="21"
              icon={StarIcon}
            />
            <StatsCard
              title="CrossRef Citations"
              value="888"
              icon={BookOpenIcon}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Google Scholar Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatsCard
              title="Citations"
              value="3,003"
              icon={FileTextIcon}
            />
            <StatsCard
              title="H-Index"
              value="28"
              icon={StarIcon}
            />
            <StatsCard
              title="i-10 Index"
              value="77"
              icon={BookmarkIcon}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Co-Author Network</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatsCard
              title="Total Publications"
              value="252"
              icon={FileTextIcon}
            />
            <StatsCard
              title="Total Co-authors"
              value="142"
              icon={NetworkIcon}
            />
          </div>
        </div>
      </div>

      <ProgressBars />
    </div>
  );
}

export default OverviewTab;