export const GET_COMMANDTRANSDATA = "GET_COMMANDTRANSDATA";
const SET_COMMANDTRANSDATA= "SET_COMMANDTRANSDATA";

export const getCommandTransData = () => ({
  type: GET_COMMANDTRANSDATA
});

export const setCommandTransData = (command_trans_data) => ({
  type: SET_COMMANDTRANSDATA,
  command_trans_data: command_trans_data
});

const initialState = {
  command_trans_data: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMANDTRANSDATA:
      const { command_trans_data } = action;
      return { ...state, command_trans_data: command_trans_data };
    default:
      return state;
  }
};
