export const GET_JPGAMELISTSPHERE = "GET_JPGAMELISTSPHERE";
const SET_JPGAMELISTSPHERE= "SET_JPGAMELISTSPHERE";

export const getJPGameListSphere = () => ({
  type: GET_JPGAMELISTSPHERE
});

export const setJPGameListSphere= (jp_gamelist_sphere) => ({
  type: SET_JPGAMELISTSPHERE,
  jp_gamelist_sphere: jp_gamelist_sphere
});

const initialState = {
  jp_gamelist_sphere: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPGAMELISTSPHERE:
      const { jp_gamelist_sphere } = action;
      return { ...state, jp_gamelist_sphere: jp_gamelist_sphere };
    default:
      return state;
  }
};
