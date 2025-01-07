export const GET_JPCOMMANDGROUPCOMPARE = "GET_JPCOMMANDGROUPCOMPARE";
const SET_JPCOMMANDGROUPCOMPARE = "SET_JPCOMMANDGROUPCOMPARE";

export const getJPCommandGroupCompare = () => ({
  type: GET_JPCOMMANDGROUPCOMPARE
});

export const setJPCommandGroupCompare = (command_group_compare_jp) => ({
  type: SET_JPCOMMANDGROUPCOMPARE,
  command_group_compare_jp: command_group_compare_jp
});

const initialState = {
  command_group_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPCOMMANDGROUPCOMPARE:
      const { command_group_compare_jp } = action;
      return { ...state, command_group_compare_jp: command_group_compare_jp };
    default:
      return state;
  }
};
