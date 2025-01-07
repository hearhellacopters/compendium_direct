export const GET_JPAILMENTCOMBINATIONNEW = "GET_JPAILMENTCOMBINATIONNEW";
const SET_JPAILMENTCOMBINATIONNEW = "SET_JPAILMENTCOMBINATIONNEW";

export const getJPAilmentCombinationNew = () => ({
  type: GET_JPAILMENTCOMBINATIONNEW
});

export const setJPAilmentCombinationNew = (ailment_combination_new_jp) => ({
  type: SET_JPAILMENTCOMBINATIONNEW,
  ailment_combination_new_jp: ailment_combination_new_jp
});

const initialState = {
  ailment_combination_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPAILMENTCOMBINATIONNEW:
      const { ailment_combination_new_jp } = action;
      return { ...state, ailment_combination_new_jp: ailment_combination_new_jp };
    default:
      return state;
  }
};
