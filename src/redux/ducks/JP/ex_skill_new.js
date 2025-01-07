export const GET_JPEXSKILLNEW = "GET_JPEXSKILLNEW";
const SET_JPEXSKILLNEW = "SET_JPEXSKILLNEW";

export const getJPEXSkillNew = () => ({
  type: GET_JPEXSKILLNEW
});

export const setJPEXSkillNew = (ex_skill_new_jp) => ({
  type: SET_JPEXSKILLNEW,
  ex_skill_new_jp: ex_skill_new_jp
});

const initialState = {
  ex_skill_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPEXSKILLNEW:
      const { ex_skill_new_jp } = action;
      return { ...state, ex_skill_new_jp: ex_skill_new_jp };
    default:
      return state;
  }
};
