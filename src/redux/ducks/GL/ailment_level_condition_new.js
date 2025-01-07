export const GET_GLAILMENTLEVELCONTNEW = "GET_GLAILMENTLEVELCONTNEW";
const SET_GLAILMENTLEVELCONTNEW = "SET_GLAILMENTLEVELCONTNEW";

export const getGLAilmentLevelContNew = () => ({
  type: GET_GLAILMENTLEVELCONTNEW
});

export const setGLAilmentLevelContNew = (ailment_level_condition_new_gl) => ({
  type: SET_GLAILMENTLEVELCONTNEW,
  ailment_level_condition_new_gl: ailment_level_condition_new_gl
});

const initialState = {
  ailment_level_condition_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLAILMENTLEVELCONTNEW:
      const { ailment_level_condition_new_gl } = action;
      return { ...state, ailment_level_condition_new_gl: ailment_level_condition_new_gl };
    default:
      return state;
  }
};
