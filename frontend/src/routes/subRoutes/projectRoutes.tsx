import React from "react";
import { Route } from "react-router-dom";
import { Projects, Project } from "../../pages";
const projectRoutes = [
  <Route key="project" path="projects" element={<Projects />} />,
  <Route key="projectprojectId" path="projects/:projectId" element={<Project />} />,
  <Route key="projectstatus" path="projects/:projectId/status" element={<div></div>} />,
  <Route key="project" path="projects/:projectId/change-request" element={<div></div>} />,
  <Route key="projectsbilling" path="projects/:projectId/billing" element={<div></div>} />,
  <Route
    key="projectLessonsLearned"
    path="projects/:projectId/lessons-learned"
    element={<div></div>}
  />,
  <Route key="projectCloseOut" path="projects/:projectId/close-out" element={<div></div>} />,
];

export default projectRoutes;
