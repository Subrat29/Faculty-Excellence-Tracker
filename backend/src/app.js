import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/Admin/admin.routes.js";
import facutlyRouter from "./routes/faculty/faculty.routes.js";
import lectureRoutes from "./routes/faculty/lecture.routes.js";
import studentRouter from "./routes/Student/studentRoutes.js";
import universityRouter from "./routes/University/universityRoutes.js";
import studentFeedbackRouter from "./routes/Student/studentFeedbackRoutes.js";

import sessionRouter from "./routes/University/sessionRoutes.js";
import collegeRouter from "./routes/University/collegeRoutes.js";
import departmentRouter from "./routes/University/departmentRoutes.js";
import coursesRoutes from "./routes/faculty/courses.routes.js";
import eventsRoutes from "./routes/faculty/events.routes.js";
import experienceRoutes from "./routes/faculty/experience.routes.js";
import extracurricularActivitiesRoutes from "./routes/faculty/extracurricularActivities.routes.js";
import awardsRoutes from "./routes/faculty/awards.routes.js";
import communityServiceRoutes from "./routes/faculty/communityService.routes.js";
import intellectualPropertiesRoutes from "./routes/faculty/intellectualProperties.routes.js";
import membershipProfessionalRoutes from "./routes/faculty/membershipProfessional.routes.js";
import projectRoutes from "./routes/faculty/project.routes.js";
import qualificationsRoutes from "./routes/faculty/qualifications.routes.js";
import researchPublicationsRoutes from "./routes/faculty/researchPublications.routes.js";
import supervisionRoutes from "./routes/faculty/supervision.routes.js";
import academicIdRoutes from "./routes/faculty/academicIds.routes.js";
import fetchFacultiesActivitiesRoutes from "./routes/faculty/fetchFacultiesActivities.routes.js";
import peerReviewRoutes from "./routes/faculty/peerReview.routes.js";
import subjectRoutes from "./routes/Student/subjectRoutes.js";
import semesterRoutes from "./routes/Student/semesterRoutes.js";


//routes declaration
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/faculty", facutlyRouter);

app.use("/api/v1/student", studentRouter);
app.use("/api/v1/university", universityRouter);
app.use("/api/v1/college", collegeRouter);
app.use("/api/v1/session", sessionRouter);
app.use("/api/v1/department", departmentRouter);

app.use("/api/v1/student/feedback", studentFeedbackRouter);
app.use('/api/v1/subjects', subjectRoutes);    
app.use('/api/v1/semesters', semesterRoutes);

app.use("/api/v1/faculty/lecture", lectureRoutes);
app.use("/api/v1/faculty/courses", coursesRoutes);
app.use("/api/v1/faculty/events", eventsRoutes);
app.use("/api/v1/faculty/experience", experienceRoutes);
app.use(
  "/api/v1/faculty/extracurricularActivities",
  extracurricularActivitiesRoutes
);
app.use("/api/v1/faculty/awards", awardsRoutes);
app.use("/api/v1/faculty/communityService", communityServiceRoutes);
app.use("/api/v1/faculty/intellectualproperties", intellectualPropertiesRoutes);
app.use("/api/v1/faculty/professionalMembership", membershipProfessionalRoutes);
app.use("/api/v1/faculty/projects", projectRoutes);
app.use("/api/v1/faculty/qualifications", qualificationsRoutes);
app.use("/api/v1/faculty/researchpublications", researchPublicationsRoutes);
app.use("/api/v1/faculty/supervision", supervisionRoutes);
app.use("/api/v1/faculty/academicid", academicIdRoutes);
app.use("/api/v1/faculty/facultiesActivities", fetchFacultiesActivitiesRoutes);
app.use("/api/v1/faculty/peersfeedback", peerReviewRoutes);
export { app };
