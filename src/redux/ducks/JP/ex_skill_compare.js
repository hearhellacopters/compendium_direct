export const GET_JPEXSKILLCOMPARE = "GET_JPEXSKILLCOMPARE";
const SET_JPEXSKILLCOMPARE = "SET_JPEXSKILLCOMPARE";

export const getJPEXSkillCompare = () => ({
  type: GET_JPEXSKILLCOMPARE
});

export const setJPEXSkillCompare = (ex_skill_compare_jp) => ({
  type: SET_JPEXSKILLCOMPARE,
  ex_skill_compare_jp: ex_skill_compare_jp
});

const initialState = {
  ex_skill_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPEXSKILLCOMPARE:
      const { ex_skill_compare_jp } = action;
      return { ...state, ex_skill_compare_jp: ex_skill_compare_jp };
    default:
      return state;
  }
};
