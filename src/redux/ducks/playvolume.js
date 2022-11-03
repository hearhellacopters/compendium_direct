export const GET_PLAYVOLUME = "GET_PLAYVOLUME";
export const SET_PLAYVOLUME = "SET_PLAYVOLUME";

export const getPlayVolume = () => ({
  type: GET_PLAYVOLUME,
});

export const setPlayVolume = (volume) => ({
  type: SET_PLAYVOLUME,
  volume: volume
});

const initialState = {
  volume: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAYVOLUME:
      return { ...state, volume: state.volume };
    case SET_PLAYVOLUME:
      return { ...state, volume: action.volume };
    default:
      return state;
  }
};
