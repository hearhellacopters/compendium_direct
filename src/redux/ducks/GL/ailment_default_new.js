export const GET_GLAILMENTDEFAULTNEW = "GET_GLAILMENTDEFAULTNEW";
const SET_GLAILMENTDEFAULTNEW = "SET_GLAILMENTDEFAULTNEW";

export const getGLAilmentDefaultNew = () => ({
  type: GET_GLAILMENTDEFAULTNEW
});

export const setGLAilmentDefaultNew = (ailment_default_new_gl) => ({
  type: SET_GLAILMENTDEFAULTNEW,
  ailment_default_new_gl: ailment_default_new_gl
});

const initialState = {
  ailment_default_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLAILMENTDEFAULTNEW:
      const { ailment_default_new_gl } = action;
      return { ...state, ailment_default_new_gl: ailment_default_new_gl };
    default:
      return state;
  }
};
