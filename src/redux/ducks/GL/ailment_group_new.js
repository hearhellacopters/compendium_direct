export const GET_GLAILMENTGROUPNEW = "GET_GLAILMENTGROUPNEW";
const SET_GLAILMENTGROUPNEW = "SET_GLAILMENTGROUPNEW";

export const getGLAilmentGroupNew = () => ({
  type: GET_GLAILMENTGROUPNEW
});

export const setGLAilmentGroupNew = (ailment_group_new_gl) => ({
  type: SET_GLAILMENTGROUPNEW,
  ailment_group_new_gl: ailment_group_new_gl
});

const initialState = {
  ailment_group_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLAILMENTGROUPNEW:
      const { ailment_group_new_gl } = action;
      return { ...state, ailment_group_new_gl: ailment_group_new_gl };
    default:
      return state;
  }
};
