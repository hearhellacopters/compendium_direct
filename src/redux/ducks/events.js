export const GET_EVENTS = "GET_EVENTS";
const SET_EVENTS = "SET_EVENTS";

export const getEvents = () => ({
  type: GET_EVENTS
});

export const setEvents = (events) => ({
  type: SET_EVENTS,
  events: events
});

const initialState = {
  events: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS:
      const { events } = action;
      return { ...state, events: events };
    default:
      return state;
  }
};
