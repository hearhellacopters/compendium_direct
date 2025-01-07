export const GET_JPSUMMONABILITYNEW = "GET_JPSUMMONABILITYNEW";
const SET_JPSUMMONABILITYNEW = "SET_JPSUMMONABILITYNEW";

export const getJPSummonAbilityNew = () => ({
  type: GET_JPSUMMONABILITYNEW
});

export const setJPSummonAbilityNew = (summon_ability_new_jp) => ({
  type: SET_JPSUMMONABILITYNEW,
  summon_ability_new_jp: summon_ability_new_jp
});

const initialState = {
  summon_ability_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPSUMMONABILITYNEW:
      const { summon_ability_new_jp } = action;
      return { ...state, summon_ability_new_jp: summon_ability_new_jp };
    default:
      return state;
  }
};
