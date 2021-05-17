import axios from "axios";
import {
  setSocialNetworks,
  updateSocialNetwroks,
  socialNetwroksLoading,
} from "./actions";
import { getSocialNetworks } from "./selectors";
import { toastr } from "react-redux-toastr";

export const loadSocialNetworks = () => async (dispatch) => {
  dispatch(socialNetwroksLoading(true));

  const socialNetworksFromDB = await axios({
    method: "GET",
    url: "/api/social-networks",
  })
    .then((r) => r.data)
    .catch((err) => {
      toastr.error(err.response.data.message);
    });

  dispatch(setSocialNetworks(socialNetworksFromDB));
  dispatch(socialNetwroksLoading(false));
};

export const filterSocialNetworks = (id) => (dispatch, getStore) => {
  const items = getSocialNetworks(getStore());
  const filtered = items.filter((item) => item._id !== id);
  dispatch(updateSocialNetwroks(filtered));
};

export const updateSocialNetwroksByNewSrc = (src, id) => (
  dispatch,
  getStore
) => {
  const items = getSocialNetworks(getStore());
  const updated = items.map((item) => {
    if (item._id === id) {
      return {
        ...item,
        iconSrc: src,
      };
    } else {
      return item;
    }
  });

  dispatch(updateSocialNetwroks(updated));
};

export const updateSocialNetworkNewObject = (newNetwork) => (
  dispatch,
  getStore
) => {
  const networks = getSocialNetworks(getStore());

  const updated = networks.map((item) => {
    if (item._id === newNetwork._id) {
      return newNetwork;
    } else {
      return item;
    }
  });

  dispatch(updateSocialNetwroks(updated));
};
