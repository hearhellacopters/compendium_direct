export const GET_PLAYING = "GET_PLAYING";
export const SET_PLAYING = "SET_PLAYING";

export const getPlaying = () => ({
  type: GET_PLAYING,
});

export const setPlaying = (playing) => ({
  type: SET_PLAYING,
  playing: playing
});

const initialState = {
  playing: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAYING:
      return { ...state, playing: state.playing };
    case SET_PLAYING:
      return { ...state, playing: action.playing };
    default:
      return state;
  }
};
