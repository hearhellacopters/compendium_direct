export const GET_EVENTSINDEX = "GET_EVENTSINDEX";
const SET_EVENTSINDEX = "SET_EVENTSINDEX";

export const getEventsIndex = () => ({
  type: GET_EVENTSINDEX
});

export const setEventsIndex = (eventsIndex) => ({
  type: SET_EVENTSINDEX,
  eventsIndex: eventsIndex
});

const initialState = {
  eventsIndex: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTSINDEX:
      const { eventsIndex } = action;
      return { ...state, eventsIndex: eventsIndex };
    default:
      return state;
  }
};
