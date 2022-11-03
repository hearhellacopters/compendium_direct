export const GET_FFSERIES = "GET_FFSERIES";
const SET_FFSERIES = "SET_FFSERIES";

export const getFFSeries = () => ({
  type: GET_FFSERIES
});

export const setFFSeries = (ffseries) => ({
  type: SET_FFSERIES,
  ffseries: ffseries
});

const initialState = {
    ffseries: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FFSERIES:
      const { ffseries } = action;
      return { ...state, ffseries: ffseries };
    default:
      return state;
  }
};
