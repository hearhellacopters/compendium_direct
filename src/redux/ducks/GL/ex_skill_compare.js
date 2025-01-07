export const GET_GLEXSKILLCOMPARE = "GET_GLEXSKILLCOMPARE";
const SET_GLEXSKILLCOMPARE = "SET_GLEXSKILLCOMPARE";

export const getGLEXSkillCompare = () => ({
  type: GET_GLEXSKILLCOMPARE
});

export const setGLEXSkillCompare = (ex_skill_compare_gl) => ({
  type: SET_GLEXSKILLCOMPARE,
  ex_skill_compare_gl: ex_skill_compare_gl
});

const initialState = {
  ex_skill_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLEXSKILLCOMPARE:
      const { ex_skill_compare_gl } = action;
      return { ...state, ex_skill_compare_gl: ex_skill_compare_gl };
    default:
      return state;
  }
};
