import axios from "axios";
import { setLogoData, logoDataLoading, updateLogoData } from "./actions";
import { getLogoData } from "./selectors";

export const loadLogoData = () => (dispatch) => {
  dispatch(logoDataLoading(true));
  axios("/api/logo").then((res) => {
    dispatch(setLogoData(...res.data));
    dispatch(logoDataLoading(false));
  });
};

export const updateLogoImgSrc = (newSrc) => (dispatch, getStore) => {
  const data = getLogoData(getStore());
  const updated = {...data, iconSrc: newSrc};
  dispatch(updateLogoData(updated));
};

