export const GET_EVENTGUIDE = "GET_EVENTGUIDE";
const SET_EVENTGUIDE = "SET_EVENTGUIDE";

export const getEventGuide = () => ({
  type: GET_EVENTGUIDE
});

export const setEventGuide = (eventGuide) => ({
  type: SET_EVENTGUIDE,
  eventGuide: eventGuide
});

const initialState = {
  eventGuide: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTGUIDE:
      const { eventGuide } = action;
      return { ...state, eventGuide: eventGuide };
    default:
      return state;
  }
};