import { featuresIsLoading, setFeatures, updateFeatures } from "./actions";
import axios from "axios";
import { getFeatures } from "./selectors";
import { toastr } from "react-redux-toastr";

export const loadFeatures = () => async (dispatch) => {
  dispatch(featuresIsLoading(true));

  const featuresFromServer = await axios({
    method: "GET",
    url: "/api/features/",
  })
    .then((res) => res.data)
    .catch((err) => {
      toastr.error(err.response.data.message);
    });

  dispatch(setFeatures(featuresFromServer));
  dispatch(featuresIsLoading(false));
};

export const filterAboutUs = (id) => (dispatch, getStore) => {
  const features = getFeatures(getStore());

  const filtered = features.filter((feature) => feature._id !== id);
  dispatch(updateFeatures(filtered));
};

export const updateFeaturesByNewSrc = (src, id) => (dispatch, getStore) => {
  const features = getFeatures(getStore());

  const updated = features.map((feature) => {
    if (feature._id === id) {
      return {
        ...feature,
        imgPath: src,
      };
    } else {
      return feature;
    }
  });

  dispatch(updateFeatures(updated));
};

export const updateFeaturesByNewObject = (newFeature) => (
  dispatch,
  getStore
) => {
  const features = getFeatures(getStore());

  const updated = features.map((feature) => {
    if (feature._id === newFeature._id) {
      return newFeature;
    } else {
      return feature;
    }
  });

  dispatch(updateFeatures(updated));
};
