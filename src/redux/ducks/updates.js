export const GET_UPDATES = "GET_UPDATES";
const SET_UPDATES = "SET_UPDATES";

export const getUpdates = () => ({
  type: GET_UPDATES
});

export const setUpdates = (updates) => ({
  type: SET_UPDATES,
  updates: updates
});

const initialState = {
  updates: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_UPDATES:
      const { updates } = action;
      return { ...state, updates: updates };
    default:
      return state;
  }
};
