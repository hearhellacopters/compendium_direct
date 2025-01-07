export const GET_JPENEMYRESISTCOMPARE = "GET_JPENEMYRESISTCOMPARE";
const SET_JPENEMYRESISTCOMPARE = "SET_JPENEMYRESISTCOMPARE";

export const getJPEnemyResistCompare = () => ({
  type: GET_JPENEMYRESISTCOMPARE
});

export const setJPEnemyResistCompare = (enemy_resist_compare_jp) => ({
  type: SET_JPENEMYRESISTCOMPARE,
  enemy_resist_compare_jp: enemy_resist_compare_jp
});

const initialState = {
  enemy_resist_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPENEMYRESISTCOMPARE:
      const { enemy_resist_compare_jp } = action;
      return { ...state, enemy_resist_compare_jp: enemy_resist_compare_jp };
    default:
      return state;
  }
};
