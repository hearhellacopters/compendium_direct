export const GET_COMMANDNAMES = "GET_COMMANDNAMES";
const SET_COMMANDNAMES= "SET_COMMANDNAMES";

export const getCommandNames = () => ({
  type: GET_COMMANDNAMES
});

export const setCommandNames = (commandnames) => ({
  type: SET_COMMANDNAMES,
  commandnames: commandnames
});

const initialState = {
  commandnames: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMANDNAMES:
      const { commandnames } = action;
      return { ...state, commandnames: commandnames };
    default:
      return state;
  }
};
