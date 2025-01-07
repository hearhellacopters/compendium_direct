export const GET_JPEQUIPMENTPASSIVEABILITYNEW = "GET_JPEQUIPMENTPASSIVEABILITYNEW";
const SET_JPEQUIPMENTPASSIVEABILITYNEW = "SET_JPEQUIPMENTPASSIVEABILITYNEW";

export const getJPEquipmentPassiveAbilityNew = () => ({
  type: GET_JPEQUIPMENTPASSIVEABILITYNEW
});

export const setJPEquipmentPassiveAbilityNew = (equipment_passive_ability_new_jp) => ({
  type: SET_JPEQUIPMENTPASSIVEABILITYNEW,
  equipment_passive_ability_new_jp: equipment_passive_ability_new_jp
});

const initialState = {
  equipment_passive_ability_new_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPEQUIPMENTPASSIVEABILITYNEW:
      const { equipment_passive_ability_new_jp } = action;
      return { ...state, equipment_passive_ability_new_jp: equipment_passive_ability_new_jp };
    default:
      return state;
  }
};
