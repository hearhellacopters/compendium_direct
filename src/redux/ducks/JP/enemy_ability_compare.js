export const GET_JPENEMYABILITYCOMPARE = "GET_JPENEMYABILITYCOMPARE";
const SET_JPENEMYABILITYCOMPARE = "SET_JPENEMYABILITYCOMPARE";

export const getJPEnemyAbilityCompare = () => ({
  type: GET_JPENEMYABILITYCOMPARE
});

export const setJPEnemyAbilityCompare = (enemy_ability_compare_jp) => ({
  type: SET_JPENEMYABILITYCOMPARE,
  enemy_ability_compare_jp: enemy_ability_compare_jp
});

const initialState = {
  enemy_ability_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPENEMYABILITYCOMPARE:
      const { enemy_ability_compare_jp } = action;
      return { ...state, enemy_ability_compare_jp: enemy_ability_compare_jp };
    default:
      return state;
  }
};
