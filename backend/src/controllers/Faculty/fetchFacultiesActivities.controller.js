import Awards from "../../models/Faculty/awards.js";
import CommunityService from "../../models/Faculty/communityService.js";
import Courses from "../../models/Faculty/courseName.js";
import Events from "../../models/Faculty/events.js";
import Experience from "../../models/Faculty/experience.js";
import ExtracurricularActivities from "../../models/Faculty/extracurricularActivities.js";
import IntellectualProperties from "../../models/Faculty/intellectualProperties.js";
import Lectures from "../../models/Faculty/lectures.js";
import MembershipProfessional from "../../models/Faculty/membershipProfessional.js";
import Projects from "../../models/Faculty/project.js";
import Qualifications from "../../models/Faculty/qualifications.js";
import ResearchPublications from "../../models/Faculty/researchPublications.js";
import Supervision from "../../models/Faculty/supervision.js";
import AcademicIds from "../../models/Faculty/academicIds.js";
import { formattedResponse } from "../../utils/ApiResponse.js";

export const fetchFacultiesActivities = async (req, res) => {
  try {
    const facultyId = req.query.faculty_id;

    if (!facultyId) {
      return formattedResponse(400, null, "Faculty ID is required");
    }

    const [
      awards,
      communityService,
      courses,
      events,
      experience,
      extracurricularActivities,
      intellectualProperties,
      lectures,
      membershipProfessional,
      projects,
      qualifications,
      researchPublications,
      supervision,
      academicIds,
    ] = await Promise.all([
      Awards.find({ faculty_id: facultyId }),
      CommunityService.find({ faculty_id: facultyId }),
      Courses.find(),
      Events.find({ faculty_id: facultyId }),
      Experience.find({ faculty_id: facultyId }),
      ExtracurricularActivities.find({ faculty_id: facultyId }),
      IntellectualProperties.find({ faculty_id: facultyId }),
      Lectures.find({ faculty_id: facultyId }),
      MembershipProfessional.find({ faculty_id: facultyId }),
      Projects.find({ faculty_id: facultyId }),
      Qualifications.find({ faculty_id: facultyId }),
      ResearchPublications.find({ faculty_id: facultyId }),
      Supervision.find({ faculty_id: facultyId }),
      AcademicIds.find({ faculty_id: facultyId }),
    ]);

    const activities = {
      awards,
      communityService,
      courses,
      events,
      experience,
      extracurricularActivities,
      intellectualProperties,
      lectures,
      membershipCommittee,
      membershipProfessional,
      projects,
      qualifications,
      researchPublications,
      supervision,
      academicIds,
    };

    return formattedResponse(
      200,
      activities,
      "Faculty activities fetched successfully"
    );
  } catch (error) {
    return formattedResponse(500, null, "Error fetching faculty activities");
  }
};
