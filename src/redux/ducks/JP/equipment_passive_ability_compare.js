export const GET_JPEQUIPMENTPASSIVEABILITYCOMPARE = "GET_JPEQUIPMENTPASSIVEABILITYCOMPARE";
const SET_JPEQUIPMENTPASSIVEABILITYCOMPARE = "SET_JPEQUIPMENTPASSIVEABILITYCOMPARE";

export const getJPEquipmentPassiveAbilityCompare = () => ({
  type: GET_JPEQUIPMENTPASSIVEABILITYCOMPARE
});

export const setJPEquipmentPassiveAbilityCompare = (equipment_passive_ability_compare_jp) => ({
  type: SET_JPEQUIPMENTPASSIVEABILITYCOMPARE,
  equipment_passive_ability_compare_jp: equipment_passive_ability_compare_jp
});

const initialState = {
  equipment_passive_ability_compare_jp: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JPEQUIPMENTPASSIVEABILITYCOMPARE:
      const { equipment_passive_ability_compare_jp } = action;
      return { ...state, equipment_passive_ability_compare_jp: equipment_passive_ability_compare_jp };
    default:
      return state;
  }
};
