export const GET_NOTICES = "GET_NOTICES";
const SET_NOTICES = "SET_NOTICES";

export const getNotices = () => ({
  type: GET_NOTICES
});

export const setNotices = (notices) => ({
  type: SET_NOTICES,
  notices: notices
});

const initialState = {
    notices: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTICES:
      const { notices } = action;
      return { ...state, notices: notices };
    default:
      return state;
  }
};
