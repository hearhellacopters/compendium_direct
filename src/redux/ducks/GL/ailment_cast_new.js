export const GET_GLAILMENTCASTNEW = "GET_GLAILMENTCASTNEW";
const SET_GLAILMENTCASTNEW = "SET_GLAILMENTCASTNEW";

export const getGLAilmentCastNew = () => ({
  type: GET_GLAILMENTCASTNEW
});

export const setGLAilmentCastNew = (ailment_cast_new_gl) => ({
  type: SET_GLAILMENTCASTNEW,
  ailment_cast_new_gl: ailment_cast_new_gl
});

const initialState = {
  ailment_cast_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLAILMENTCASTNEW:
      const { ailment_cast_new_gl } = action;
      return { ...state, ailment_cast_new_gl: ailment_cast_new_gl };
    default:
      return state;
  }
};
