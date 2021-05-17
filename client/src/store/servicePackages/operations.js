import { packagesIsLoading, setPackages, updatePackages } from "./actions";
import axios from "axios";
import { getPackages } from "./selectors";
import { toastr } from "react-redux-toastr";

export const loadPackages = () => async (dispatch) => {
  dispatch(packagesIsLoading(true));

  const servicePackagesFromServer = await axios({
    method: "GET",
    url: "/api/service-packages/",
  })
    .then((res) => res.data)
    .catch((err) => {
      toastr.error(err.response.data.message);
    });

  dispatch(setPackages(servicePackagesFromServer));
  dispatch(packagesIsLoading(false));
};

export const filterServicePackages = (id) => (dispatch, getStore) => {
  const packages = getPackages(getStore());

  const filtered = packages.filter(
    (servicePackage) => servicePackage._id !== id
  );
  dispatch(updatePackages(filtered));
};

export const updatePackagesByNewObject = (newPackage) => (
  dispatch,
  getStore
) => {
  const packages = getPackages(getStore());

  const updated = packages.map((service) => {
    if (service._id === newPackage._id) {
      return newPackage;
    } else {
      return service;
    }
  });

  dispatch(updatePackages(updated));
};
