export const GET_GLEXSKILLNEW = "GET_GLEXSKILLNEW";
const SET_GLEXSKILLNEW = "SET_GLEXSKILLNEW";

export const getGLEXSkillNew = () => ({
  type: GET_GLEXSKILLNEW
});

export const setGLEXSkillNew = (ex_skill_new_gl) => ({
  type: SET_GLEXSKILLNEW,
  ex_skill_new_gl: ex_skill_new_gl
});

const initialState = {
  ex_skill_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLEXSKILLNEW:
      const { ex_skill_new_gl } = action;
      return { ...state, ex_skill_new_gl: ex_skill_new_gl };
    default:
      return state;
  }
};
