export const GET_GLEQUIPMENTPASSIVEABILITYNEW = "GET_GLEQUIPMENTPASSIVEABILITYNEW";
const SET_GLEQUIPMENTPASSIVEABILITYNEW = "SET_GLEQUIPMENTPASSIVEABILITYNEW";

export const getGLEquipmentPassiveAbilityNew = () => ({
  type: GET_GLEQUIPMENTPASSIVEABILITYNEW
});

export const setGLEquipmentPassiveAbilityNew = (equipment_passive_ability_new_gl) => ({
  type: SET_GLEQUIPMENTPASSIVEABILITYNEW,
  equipment_passive_ability_new_gl: equipment_passive_ability_new_gl
});

const initialState = {
  equipment_passive_ability_new_gl: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLEQUIPMENTPASSIVEABILITYNEW:
      const { equipment_passive_ability_new_gl } = action;
      return { ...state, equipment_passive_ability_new_gl: equipment_passive_ability_new_gl };
    default:
      return state;
  }
};
