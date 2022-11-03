export const GET_JPGAMELISTAILMENT = "GET_JPGAMELISTAILMENT";
const SET_JPGAMELISTAILMENT= "SET_JPGAMELISTAILMENT";

export const getJPGameListAilment = () => ({
  type: GET_JPGAMELISTAILMENT
});

export const setJPGameListAilment= (jp_gamelist_ailment) => ({
  type: SET_JPGAMELISTAILMENT,
  jp_gamelist_ailment: jp_gamelist_ailment
});

const initialState = {
  jp_gamelist_ailment: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPGAMELISTAILMENT:
      const { jp_gamelist_ailment } = action;
      return { ...state, jp_gamelist_ailment: jp_gamelist_ailment };
    default:
      return state;
  }
};
