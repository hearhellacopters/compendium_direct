export const GET_JPCALENDAR = "GET_JPCALENDAR";
const SET_JPCALENDAR = "SET_JPCALENDAR";

export const getJPCalendar = () => ({
  type: GET_JPCALENDAR
});

export const setJPCalendar = (jpcalendar) => ({
  type: SET_JPCALENDAR,
  jpcalendar: jpcalendar
});

const initialState = {
  jpcalendar: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPCALENDAR:
      const { jpcalendar } = action;
      return { ...state, jpcalendar: jpcalendar };
    default:
      return state;
  }
};
