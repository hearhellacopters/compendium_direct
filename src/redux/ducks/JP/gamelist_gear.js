export const GET_JPGAMELISTGEAR = "GET_JPGAMELISTGEAR";
const SET_JPGAMELISTGEAR= "SET_JPGAMELISTGEAR";

export const getJPGameListGear = () => ({
  type: GET_JPGAMELISTGEAR
});

export const setJPGameListGear= (jp_gamelist_gear) => ({
  type: SET_JPGAMELISTGEAR,
  jp_gamelist_gear: jp_gamelist_gear
});

const initialState = {
  jp_gamelist_gear: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPGAMELISTGEAR:
      const { jp_gamelist_gear } = action;
      return { ...state, jp_gamelist_gear: jp_gamelist_gear };
    default:
      return state;
  }
};
