export const GET_TALK = "GET_TALK";
const SET_TALK = "SET_TALK";

export const getTalk = () => ({
  type: GET_TALK
});

export const setTalk = (talk) => ({
  type: SET_TALK,
  talk: talk
});

const initialState = {
    talk: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TALK:
      const { talk } = action;
      return { ...state, talk: talk };
    default:
      return state;
  }
};
