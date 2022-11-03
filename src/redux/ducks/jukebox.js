export const GET_JUKEBOX = "GET_JUKEBOX";
const SET_JUKEBOX = "SET_JUKEBOX";

export const getJukeBox = () => ({
  type: GET_JUKEBOX
});

export const setJukeBox = (jukebox) => ({
  type: SET_JUKEBOX,
  jukebox: jukebox
});

const initialState = {
  jukebox: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JUKEBOX:
      const { jukebox } = action;
      return { ...state, jukebox: jukebox };
    default:
      return state;
  }
};
