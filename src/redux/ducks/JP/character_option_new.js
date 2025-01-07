export const GET_JPCHARACTEROPTIONNEW = "GET_JPCHARACTEROPTIONNEW";
const SET_JPCHARACTEROPTIONNEW = "SET_JPCHARACTEROPTIONNEW";

export const getJPCharacterOptionNew = () => ({
  type: GET_JPCHARACTEROPTIONNEW
});

export const setJPCharacterOptionNew = (character_option_new_jp) => ({
  type: SET_JPCHARACTEROPTIONNEW,
  character_option_new_jp: character_option_new_jp
});

const initialState = {
  character_option_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPCHARACTEROPTIONNEW:
      const { character_option_new_jp } = action;
      return { ...state, character_option_new_jp: character_option_new_jp };
    default:
      return state;
  }
};
