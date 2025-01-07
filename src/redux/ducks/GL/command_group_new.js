export const GET_GLCOMMANDGROUPNEW = "GET_GLCOMMANDGROUPNEW";
const SET_GLCOMMANDGROUPNEW = "SET_GLCOMMANDGROUPNEW";

export const getGLCommandGroupNew = () => ({
  type: GET_GLCOMMANDGROUPNEW
});

export const setGLCommandGroupNew = (command_group_new_gl) => ({
  type: SET_GLCOMMANDGROUPNEW,
  command_group_new_gl: command_group_new_gl
});

const initialState = {
  command_group_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLCOMMANDGROUPNEW:
      const { command_group_new_gl } = action;
      return { ...state, command_group_new_gl: command_group_new_gl };
    default:
      return state;
  }
};
