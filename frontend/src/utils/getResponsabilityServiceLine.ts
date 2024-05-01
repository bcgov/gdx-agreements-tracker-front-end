import apiAxios from "./apiAxios";

export const getResponsabilityServiceLine = async ({
  newValue,
  setFieldValue,
}: {
  newValue: { value: string | number };
  setFieldValue: Function;
}) => {
  const getCall = async () => {
    const results = await apiAxios()
      .get(`/responsibilityservice/${newValue?.value}`)
      .then((responsabilityServiceLine) => {
        return responsabilityServiceLine;
      });
    return results.data.data[0];
  };

  // Queries

  if (newValue) {
    return getCall().then((response) => {
      setFieldValue("responsibility_centre", response.responsibility_centre);
      setFieldValue("responsibility", response.responsibility_centre);
      setFieldValue("service_line", response.service_line);
    });
  }
  return "there was no portfolio ID provided";
};
