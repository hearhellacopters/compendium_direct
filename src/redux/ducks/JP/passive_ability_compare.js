export const GET_JPPASSIVEABILITYCOMPARE = "GET_JPPASSIVEABILITYCOMPARE";
const SET_JPPASSIVEABILITYCOMPARE = "SET_JPPASSIVEABILITYCOMPARE";

export const getJPPassiveAbilityCompare = () => ({
  type: GET_JPPASSIVEABILITYCOMPARE
});

export const setJPPassiveAbilityCompare = (passive_ability_compare_jp) => ({
  type: SET_JPPASSIVEABILITYCOMPARE,
  passive_ability_compare_jp: passive_ability_compare_jp
});

const initialState = {
  passive_ability_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPPASSIVEABILITYCOMPARE:
      const { passive_ability_compare_jp } = action;
      return { ...state, passive_ability_compare_jp: passive_ability_compare_jp };
    default:
      return state;
  }
};
