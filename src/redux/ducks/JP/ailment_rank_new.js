export const GET_JPAILMENTRANKNEW = "GET_JPAILMENTRANKNEW";
const SET_JPAILMENTRANKNEW = "SET_JPAILMENTRANKNEW";

export const getJPAilmentRankNew = () => ({
  type: GET_JPAILMENTRANKNEW
});

export const setJPAilmentRankNew = (ailment_rank_new_jp) => ({
  type: SET_JPAILMENTRANKNEW,
  ailment_rank_new_jp: ailment_rank_new_jp
});

const initialState = {
  ailment_rank_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPAILMENTRANKNEW:
      const { ailment_rank_new_jp } = action;
      return { ...state, ailment_rank_new_jp: ailment_rank_new_jp };
    default:
      return state;
  }
};
