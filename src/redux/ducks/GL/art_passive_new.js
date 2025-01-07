export const GET_GLARTPASSIVENEW = "GET_GLARTPASSIVENEW";
const SET_GLARTPASSIVENEW = "SET_GLARTPASSIVENEW";

export const getGLArtPassiveNew = () => ({
  type: GET_GLARTPASSIVENEW
});

export const setGLArtPassiveNew = (art_passive_new_gl) => ({
  type: SET_GLARTPASSIVENEW,
  art_passive_new_gl: art_passive_new_gl
});

const initialState = {
  art_passive_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLARTPASSIVENEW:
      const { art_passive_new_gl } = action;
      return { ...state, art_passive_new_gl: art_passive_new_gl };
    default:
      return state;
  }
};
