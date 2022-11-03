export const GET_COMMANDGROUPFULL = "GET_COMMANDGROUPFULL";
const SET_COMMANDGROUPFULL= "SET_COMMANDGROUPFULL";

export const getCommandGroupFull = () => ({
  type: GET_COMMANDGROUPFULL
});

export const setCommandGroupFull = (command_group_full) => ({
  type: SET_COMMANDGROUPFULL,
  command_group_full: command_group_full
});

const initialState = {
  command_group_full: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMANDGROUPFULL:
      const { command_group_full } = action;
      return { ...state, command_group_full: command_group_full };
    default:
      return state;
  }
};
