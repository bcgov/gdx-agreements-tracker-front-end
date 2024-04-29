import { useContext } from "react";
import { TitleContext, SubTitleContext } from "context";

const useTitle = () => {
  const { setTitle, title } = useContext(TitleContext);
  const { setSubTitle, subTitle } = useContext(SubTitleContext);

  const updateTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  const updateSubTitle = (newTitle: string) => {
    setSubTitle(newTitle);
  };

  return {
    updateTitle,
    title,
    updateSubTitle,
    subTitle,
  };
};

export default useTitle;
