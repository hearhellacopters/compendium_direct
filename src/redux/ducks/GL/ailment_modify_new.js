export const GET_GLAILMENTMODIFYNEW = "GET_GLAILMENTMODIFYNEW";
const SET_GLAILMENTMODIFYNEW = "SET_GLAILMENTMODIFYNEW";

export const getGLAilmentModifyNew = () => ({
  type: GET_GLAILMENTMODIFYNEW
});

export const setGLAilmentModifyNew = (ailment_modify_new_gl) => ({
  type: SET_GLAILMENTMODIFYNEW,
  ailment_modify_new_gl: ailment_modify_new_gl
});

const initialState = {
  ailment_modify_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLAILMENTMODIFYNEW:
      const { ailment_modify_new_gl } = action;
      return { ...state, ailment_modify_new_gl: ailment_modify_new_gl };
    default:
      return state;
  }
};
