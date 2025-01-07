export const GET_GLAILMENTGROUPCOMPARE = "GET_GLAILMENTGROUPCOMPARE";
const SET_GLAILMENTGROUPCOMPARE = "SET_GLAILMENTGROUPCOMPARE";

export const getGLAilmentGroupCompare = () => ({
  type: GET_GLAILMENTGROUPCOMPARE
});

export const setGLAilmentGroupCompare = (ailment_group_compare_gl) => ({
  type: SET_GLAILMENTGROUPCOMPARE,
  ailment_group_compare_gl: ailment_group_compare_gl
});

const initialState = {
  ailment_group_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLAILMENTGROUPCOMPARE:
      const { ailment_group_compare_gl } = action;
      return { ...state, ailment_group_compare_gl: ailment_group_compare_gl };
    default:
      return state;
  }
};
