export const GET_JPPASSIVEABILITYNEW = "GET_JPPASSIVEABILITYNEW";
const SET_JPPASSIVEABILITYNEW = "SET_JPPASSIVEABILITYNEW";

export const getJPPassiveAbilityNew = () => ({
  type: GET_JPPASSIVEABILITYNEW
});

export const setJPPassiveAbilityNew = (passive_ability_new_jp) => ({
  type: SET_JPPASSIVEABILITYNEW,
  passive_ability_new_jp: passive_ability_new_jp
});

const initialState = {
  passive_ability_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPPASSIVEABILITYNEW:
      const { passive_ability_new_jp } = action;
      return { ...state, passive_ability_new_jp: passive_ability_new_jp };
    default:
      return state;
  }
};
