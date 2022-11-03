export const GET_CHARGUIDE = "GET_CHARGUIDE";
const SET_CHARGUIDE = "SET_CHARGUIDE";

export const getCharGuide = () => ({
  type: GET_CHARGUIDE
});

export const setCharGuide = (charGuide) => ({
  type: SET_CHARGUIDE,
  charGuide: charGuide
});

const initialState = {
  charGuide: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CHARGUIDE:
      const { charGuide } = action;
      return { ...state, charGuide: charGuide };
    default:
      return state;
  }
};
