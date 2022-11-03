import { call, put } from "redux-saga/effects";
import { setEquipmentPassiveNames } from "../../ducks/equipmentpassivenames";
import { requestGetEquipmentPassiveNames } from "../requests/equipmentpassivenames";
import isJson from "./_JSON_CHECK";

export function* handleGetEquipmentPassiveNames(action) {
  try {
    const response = yield call(requestGetEquipmentPassiveNames);
    const { data } = response;
    if(isJson(data,"GetEquipmentPassiveNames") == true){
      yield put(setEquipmentPassiveNames(data));
    }
  } catch (error) {
    console.log(error);
  }
}
