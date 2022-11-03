export const GET_ACCESS = "GET_ACCESS";
const SET_ACCESS = "SET_ACCESS";

export const getAccess = () => ({
  type: GET_ACCESS
});

export const setAccess = (access) => ({
  type: SET_ACCESS,
  access: access
});

const initialState = {
  access: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCESS:
      const { access } = action;
      return { ...state, access: access };
    default:
      return state;
  }
};
