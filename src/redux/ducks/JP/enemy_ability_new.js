export const GET_JPENEMYABILITYNEW = "GET_JPENEMYABILITYNEW";
const SET_JPENEMYABILITYNEW = "SET_JPENEMYABILITYNEW";

export const getJPEnemyAbilityNew = () => ({
  type: GET_JPENEMYABILITYNEW
});

export const setJPEnemyAbilityNew = (enemy_ability_new_jp) => ({
  type: SET_JPENEMYABILITYNEW,
  enemy_ability_new_jp: enemy_ability_new_jp
});

const initialState = {
  enemy_ability_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPENEMYABILITYNEW:
      const { enemy_ability_new_jp } = action;
      return { ...state, enemy_ability_new_jp: enemy_ability_new_jp };
    default:
      return state;
  }
};
