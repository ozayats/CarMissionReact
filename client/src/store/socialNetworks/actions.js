import { LOAD_SOCIAL_NETWORKS, ADD_NEW_SOCIAL_NETWORKS, UPDATE_SOCIAL_NETWORKS, SOCIAL_NETWORKS_LOADING } from "./actionTypes";

export const setSocialNetworks = (data) => ({
  type: LOAD_SOCIAL_NETWORKS,
  payload: data,
});

export const addNewSocialNetworks = (newItem) => ({
  type: ADD_NEW_SOCIAL_NETWORKS,
  payload: newItem,
});

export const updateSocialNetwroks = (item) => ({
  type: UPDATE_SOCIAL_NETWORKS,
  payload: item,
});

export const socialNetwroksLoading = (isLoading) => ({
  type: SOCIAL_NETWORKS_LOADING,
  payload: isLoading,
});



