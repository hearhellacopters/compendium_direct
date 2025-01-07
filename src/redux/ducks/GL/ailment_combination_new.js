export const GET_GLAILMENTCOMBINATIONNEW = "GET_GLAILMENTCOMBINATIONNEW";
const SET_GLAILMENTCOMBINATIONNEW = "SET_GLAILMENTCOMBINATIONNEW";

export const getGLAilmentCombinationNew = () => ({
  type: GET_GLAILMENTCOMBINATIONNEW
});

export const setGLAilmentCombinationNew = (ailment_combination_new_gl) => ({
  type: SET_GLAILMENTCOMBINATIONNEW,
  ailment_combination_new_gl: ailment_combination_new_gl
});

const initialState = {
  ailment_combination_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLAILMENTCOMBINATIONNEW:
      const { ailment_combination_new_gl } = action;
      return { ...state, ailment_combination_new_gl: ailment_combination_new_gl };
    default:
      return state;
  }
};
