export const GET_BANNERS = "GET_BANNERS";
const SET_BANNERS = "SET_BANNERS";

export const getBanners = () => ({
  type: GET_BANNERS
});

export const setBanners = (banners) => ({
  type: SET_BANNERS,
  banners: banners
});

const initialState = {
  banners: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BANNERS:
      const { banners } = action;
      return { ...state, banners: banners };
    default:
      return state;
  }
};
