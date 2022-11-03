export const GET_CHARACTERS = "GET_CHARACTERS";
const SET_CHARACTERS = "SET_CHARACTERS";

export const getCharacters = () => ({
  type: GET_CHARACTERS
});

export const setCharacters = (characters) => ({
  type: SET_CHARACTERS,
  characters: characters
});

const initialState = {
  characters: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CHARACTERS:
      const { characters } = action;
      return { ...state, characters: characters };
    default:
      return state;
  }
};
