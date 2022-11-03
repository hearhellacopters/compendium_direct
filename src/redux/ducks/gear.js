export const GET_GEAR = "GET_GEAR";
const SET_GEAR = "SET_GEAR";

export const getGear = () => ({
  type: GET_GEAR
});

export const setGear = (gear) => ({
  type: SET_GEAR,
  gear: gear
});

const initialState = {
  gear: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GEAR:
      const { gear } = action;
      return { ...state, gear: gear };
    default:
      return state;
  }
};
