export const GET_JPGAMELISTABILITY = "GET_JPGAMELISTABILITY";
const SET_JPGAMELISTABILITY = "SET_JPGAMELISTABILITY";

export const getJPGameListAbility = () => ({
  type: GET_JPGAMELISTABILITY
});

export const setJPGameListAbility = (jp_gamelist_ability) => ({
  type: SET_JPGAMELISTABILITY,
  jp_gamelist_ability: jp_gamelist_ability
});

const initialState = {
  jp_gamelist_ability: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPGAMELISTABILITY:
      const { jp_gamelist_ability } = action;
      return { ...state, jp_gamelist_ability: jp_gamelist_ability };
    default:
      return state;
  }
};
