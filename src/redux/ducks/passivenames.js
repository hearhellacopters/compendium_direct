export const GET_PASSIVENAMES = "GET_PASSIVENAMES";
const SET_PASSIVENAMES = "SET_PASSIVENAMES";

export const getPassiveNames = () => ({
  type: GET_PASSIVENAMES
});

export const setPassiveNames = (passivenames) => ({
  type: SET_PASSIVENAMES,
  passivenames: passivenames
});

const initialState = {
    passivenames: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PASSIVENAMES:
      const { passivenames } = action;
      return { ...state, passivenames: passivenames };
    default:
      return state;
  }
};