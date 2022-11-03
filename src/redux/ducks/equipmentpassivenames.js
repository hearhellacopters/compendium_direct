export const GET_EQUIPMENTPASSIVENAMES = "GET_EQUIPMENTPASSIVENAMES";
const SET_EQUIPMENTPASSIVENAMES = "SET_EQUIPMENTPASSIVENAMES";

export const getEquipmentPassiveNames = () => ({
  type: GET_EQUIPMENTPASSIVENAMES
});

export const setEquipmentPassiveNames = (equipmentpassivenames) => ({
  type: SET_EQUIPMENTPASSIVENAMES,
  equipmentpassivenames: equipmentpassivenames
});

const initialState = {
    equipmentpassivenames: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EQUIPMENTPASSIVENAMES:
      const { equipmentpassivenames } = action;
      return { ...state, equipmentpassivenames: equipmentpassivenames };
    default:
      return state;
  }
};