export const GET_GLAILMENTRANKNEW = "GET_GLAILMENTRANKNEW";
const SET_GLAILMENTRANKNEW = "SET_GLAILMENTRANKNEW";

export const getGLAilmentRankNew = () => ({
  type: GET_GLAILMENTRANKNEW
});

export const setGLAilmentRankNew = (ailment_rank_new_gl) => ({
  type: SET_GLAILMENTRANKNEW,
  ailment_rank_new_gl: ailment_rank_new_gl
});

const initialState = {
  ailment_rank_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLAILMENTRANKNEW:
      const { ailment_rank_new_gl } = action;
      return { ...state, ailment_rank_new_gl: ailment_rank_new_gl };
    default:
      return state;
  }
};
