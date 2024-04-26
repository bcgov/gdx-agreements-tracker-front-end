import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { IChipNav } from "types";
import { ChipNav } from "../../../components/ChipNav";
import { useAxios } from "hooks/useAxios";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

/**
 * This reusable component renders the projects component
 *
 * @param   {object}             query React query that contains all projects
 * @returns {React.ReactElement}       The project component
 */

export const Project = () => {
  const { projectId } = useParams();

  // Queries
  const { axiosAll } = useAxios();
  const { updateTitle } = useTitle();

  const getProject = async () => {
    return await axiosAll()
      .get(`projects/${projectId}`)
      .then((projectData) => {
        updateTitle(projectData?.data?.data?.project_number);
      });
  };

  useEffect(() => {
    getProject();
  }, [projectId]);

  const chipNavLinks: IChipNav[] = [
    {
      key: 0,
      name: "Project Details",
      url: `/projects/${projectId}`,
    },
    {
      key: 1,
      name: "Status",
      url: `/projects/${projectId}/status`,
    },
    {
      key: 2,
      name: "Change Request",
      url: `/projects/${projectId}/change-request`,
    },
    {
      key: 3,
      name: "Billing",
      url: `/projects/${projectId}/billing`,
    },
  ];

  const chipNavLinksRight: IChipNav[] = [
    {
      key: 4,
      name: "Lessons Learned",
      url: `/projects/${projectId}/lessons-learned`,
    },
    {
      key: 5,
      name: "Close Out",
      url: `/projects/${projectId}/close-out`,
    },
  ];

  return (
    <>
      <ChipNav navLinks={chipNavLinks} navLinksRight={chipNavLinksRight} />
      <Outlet />
    </>
  );
};
