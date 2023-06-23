import React, { FC } from "react";
import { Typography } from "@mui/material";
import { Renderer } from "components/Renderer";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "hooks/useAxios";

export const Glossary: FC = () => {
  const { axiosAll } = useAxios();

  /**
   * Gets the glossary definition HTML.
   *
   * @returns {null|object}
   */
  const getGlossary = async () => {
    const response = await axiosAll().get(`/glossary`);
    return { __html: response.data as string };
  };

  // Queries
  const { data, isLoading } = useQuery(`glossary`, getGlossary, {
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  return (
    <>
      <Typography variant="h5" component="h2">
        Glossary
      </Typography>
      <Renderer isLoading={isLoading} component={<div dangerouslySetInnerHTML={data}></div>} />
    </>
  );
};
