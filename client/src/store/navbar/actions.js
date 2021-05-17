import { LOAD_NAVBAR, NAVBAR_LOADING, ADD_NEW_ITEM, UPDATE_ITEM } from "./actionTypes";

export const setNavbarData = (data) => ({
  type: LOAD_NAVBAR,
  payload: data,
});

export const navbarDataLoading = (isLoading) => ({
  type: NAVBAR_LOADING,
  payload: isLoading,
});

export const addNewItem = (newItem) => ({
  type: ADD_NEW_ITEM,
  payload: newItem,
});

export const updateItem = (newItem) => ({
  type: UPDATE_ITEM,
  payload: newItem,
});

