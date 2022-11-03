export const GET_PANELS = "GET_PANELS";
const SET_PANELS = "SET_PANELS";

export const getPanels = () => ({
  type: GET_PANELS
});

export const setPanels = (panels) => ({
  type: SET_PANELS,
  panels: panels
});

const initialState = {
  panels: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PANELS:
      const { panels } = action;
      return { ...state, panels: panels };
    default:
      return state;
  }
};
