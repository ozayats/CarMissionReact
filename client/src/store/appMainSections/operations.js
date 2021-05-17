import axios from "axios";
import { setMainSections, setIsLoading, updateMainSections } from "./actions";
import { toastr } from "react-redux-toastr";
import { getMainSections } from "./selectors";

export const loadMainSection = () => async (dispatch) => {
  dispatch(setIsLoading(true));

  const sectionsFromServer = await axios
    .get("/api/sections-main/")
    .then((r) => r.data)
    .catch((err) => {
      toastr.error(err.response.data.message);
    });

  sectionsFromServer.sort((a, b) => a.index - b.index);

  dispatch(setMainSections(sectionsFromServer));
  dispatch(setIsLoading(false));
};

export const updateMainSectionByNewSrc = (src, id) => (dispatch, getStore) => {
  const sections = getMainSections(getStore());

  const updated = sections.map((section) => {
    if (section._id === id) {
      return {
        ...section,
        imgPath: src,
      };
    } else {
      return section;
    }
  });

  dispatch(updateMainSections(updated));
};

export const updateMainSectionsByNewObject = (newSection) => (
  dispatch,
  getStore
) => {
  const sections = getMainSections(getStore());

  const updated = sections.map((section) => {
    if (section._id === newSection._id) {
      return newSection;
    } else {
      return section;
    }
  });

  dispatch(updateMainSections(updated));
};
