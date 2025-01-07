export const GET_GLCOMMANDGROUPCOMPARE = "GET_GLCOMMANDGROUPCOMPARE";
const SET_GLCOMMANDGROUPCOMPARE = "SET_GLCOMMANDGROUPCOMPARE";

export const getGLCommandGroupCompare = () => ({
  type: GET_GLCOMMANDGROUPCOMPARE
});

export const setGLCommandGroupCompare = (command_group_compare_gl) => ({
  type: SET_GLCOMMANDGROUPCOMPARE,
  command_group_compare_gl: command_group_compare_gl
});

const initialState = {
  command_group_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLCOMMANDGROUPCOMPARE:
      const { command_group_compare_gl } = action;
      return { ...state, command_group_compare_gl: command_group_compare_gl };
    default:
      return state;
  }
};
