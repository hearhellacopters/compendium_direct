export const GET_CASTTARGETS = "GET_CASTTARGETS";
const SET_CASTTARGETS= "SET_CASTTARGETS";

export const getCastTargets = () => ({
  type: GET_CASTTARGETS
});

export const setCastTargets = (casttargets) => ({
  type: SET_CASTTARGETS,
  casttargets: casttargets
});

const initialState = {
    casttargets: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CASTTARGETS:
      const { casttargets } = action;
      return { ...state, casttargets: casttargets };
    default:
      return state;
  }
};
