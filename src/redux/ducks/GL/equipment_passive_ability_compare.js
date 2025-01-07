export const GET_GLEQUIPMENTPASSIVEABILITYCOMPARE = "GET_GLEQUIPMENTPASSIVEABILITYCOMPARE";
const SET_GLEQUIPMENTPASSIVEABILITYCOMPARE = "SET_GLEQUIPMENTPASSIVEABILITYCOMPARE";

export const getGLEquipmentPassiveAbilityCompare = () => ({
  type: GET_GLEQUIPMENTPASSIVEABILITYCOMPARE
});

export const setGLEquipmentPassiveAbilityCompare = (equipment_passive_ability_compare_gl) => ({
  type: SET_GLEQUIPMENTPASSIVEABILITYCOMPARE,
  equipment_passive_ability_compare_gl: equipment_passive_ability_compare_gl
});

const initialState = {
  equipment_passive_ability_compare_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLEQUIPMENTPASSIVEABILITYCOMPARE:
      const { equipment_passive_ability_compare_gl } = action;
      return { ...state, equipment_passive_ability_compare_gl: equipment_passive_ability_compare_gl };
    default:
      return state;
  }
};
