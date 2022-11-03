export const GET_PASSIVES = "GET_PASSIVES";
const SET_PASSIVES = "SET_PASSIVES";

export const getPassives = () => ({
  type: GET_PASSIVES
});

export const setPassives = (passives) => ({
  type: SET_PASSIVES,
  passives: passives
});

const initialState = {
  passives: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PASSIVES:
      const { passives } = action;
      return { ...state, passives: passives };
    default:
      return state;
  }
};
