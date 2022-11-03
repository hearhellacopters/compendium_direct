export const GET_MAINTENANCE = "GET_MAINTENANCE";
const SET_MAINTENANCE = "SET_MAINTENANCE";

export const getMaintenance = () => ({
  type: GET_MAINTENANCE
});

export const setMaintenance = (maintenance) => ({
  type: SET_MAINTENANCE,
  maintenance: maintenance
});

const initialState = {
  maintenance: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MAINTENANCE:
      const { maintenance } = action;
      return { ...state, maintenance: maintenance };
    default:
      return state;
  }
};
