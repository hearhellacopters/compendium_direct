export const GET_JPCOMMANDGROUPNEW = "GET_JPCOMMANDGROUPNEW";
const SET_JPCOMMANDGROUPNEW = "SET_JPCOMMANDGROUPNEW";

export const getJPCommandGroupNew = () => ({
  type: GET_JPCOMMANDGROUPNEW
});

export const setJPCommandGroupNew = (command_group_new_jp) => ({
  type: SET_JPCOMMANDGROUPNEW,
  command_group_new_jp: command_group_new_jp
});

const initialState = {
  command_group_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPCOMMANDGROUPNEW:
      const { command_group_new_jp } = action;
      return { ...state, command_group_new_jp: command_group_new_jp };
    default:
      return state;
  }
};
