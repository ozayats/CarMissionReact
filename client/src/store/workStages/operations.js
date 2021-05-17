import { setStages, setStagesLoading, updateStages } from "./actions";
import axios from "axios";
import { getWorkStages } from "./selectors";
import { toastr } from "react-redux-toastr";

export const loadWorkStages = () => async (dispatch) => {
  dispatch(setStagesLoading(true));

  const stagesFromDB = await axios({
    method: "GET",
    url: "/api/work-stages/",
  })
    .then((r) => r.data)
    .catch((err) => {
      toastr.error(err.response.data.message);
    });

  stagesFromDB.sort((a, b) => a.num - b.num);

  dispatch(setStages(stagesFromDB));
  dispatch(setStagesLoading(false));
};

export const filterWorkStages = (id) => (dispatch, getStore) => {
  const stages = getWorkStages(getStore());

  const filtered = stages.filter((stage) => stage._id !== id);
  dispatch(updateStages(filtered));
};

export const updateStagesByNewSrc = (src, id) => (dispatch, getStore) => {
  const stages = getWorkStages(getStore());

  const updated = stages.map((stage) => {
    if (stage._id === id) {
      return {
        ...stage,
        iconSrc: src,
      };
    } else {
      return stage;
    }
  });

  dispatch(updateStages(updated));
};

export const updateStagesByNewObject = (newStage) => (dispatch, getStore) => {
  const stages = getWorkStages(getStore());

  const updated = stages.map((stage) => {
    if (stage._id === newStage._id) {
      return newStage;
    } else {
      return stage;
    }
  });

  dispatch(updateStages(updated));
};
