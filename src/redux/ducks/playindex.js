export const GET_PLAYINDEX = "GET_PLAYINDEX";
export const SET_PLAYINDEX = "SET_PLAYINDEX";

export const GET_MUSICKEY = "GET_MUSICKEY";
export const SET_MUSICKEY = "SET_MUSICKEY";

export const getPlayIndex = () => ({
  type: GET_PLAYINDEX,
});

export const setPlayIndex = (playindex) => ({
  type: SET_PLAYINDEX,
  playindex: playindex
});

export const getMusicKey = () => ({
  type: GET_MUSICKEY,
});

export const setMusicKey = (musickey) => ({
  type: SET_MUSICKEY,
  musickey: musickey
});

const initialState = {
  playindex: undefined,
  musickey: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAYINDEX:
      return { ...state, playindex: state.playindex };
    case SET_PLAYINDEX:
      return { ...state, playindex: action.playindex };
    case GET_MUSICKEY:
      return { ...state, musickey: state.musickey };
    case SET_MUSICKEY:
      return { ...state, musickey: action.musickey };
    default:
      return state;
  }
};
