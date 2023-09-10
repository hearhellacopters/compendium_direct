export const GET_TALK_INDEX = "GET_TALK_INDEX";
const SET_TALK_INDEX = "SET_TALK_INDEX";

export const getTalkIndex = () => ({
  type: GET_TALK_INDEX
});

export const setTalkIndex = (talk_index) => ({
  type: SET_TALK_INDEX,
  talk_index: talk_index
});

const initialState = {
    talk_index: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TALK_INDEX:
      const { talk_index } = action;
      return { ...state, talk_index: talk_index };
    default:
      return state;
  }
};
