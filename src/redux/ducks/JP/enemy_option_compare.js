export const GET_JPENEMYOPTIONCOMPARE = "GET_JPENEMYOPTIONCOMPARE";
const SET_JPENEMYOPTIONCOMPARE = "SET_JPENEMYOPTIONCOMPARE";

export const getJPEnemyOptionCompare = () => ({
  type: GET_JPENEMYOPTIONCOMPARE
});

export const setJPEnemyOptionCompare = (enemy_option_compare_jp) => ({
  type: SET_JPENEMYOPTIONCOMPARE,
  enemy_option_compare_jp: enemy_option_compare_jp
});

const initialState = {
  enemy_option_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPENEMYOPTIONCOMPARE:
      const { enemy_option_compare_jp } = action;
      return { ...state, enemy_option_compare_jp: enemy_option_compare_jp };
    default:
      return state;
  }
};
