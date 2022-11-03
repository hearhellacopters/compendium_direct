import { call, put } from "redux-saga/effects";
import { setMaintenance } from "../../ducks/maintenance";
import { requestGetMaintenance } from "../requests/maintenance";
import isJson from "./_JSON_CHECK";

export function* handleGetMaintenance(action) {
  try {
    const response = yield call(requestGetMaintenance);
    const { data } = response;
    if(isJson(data,"GetMaintenance") == true){
      yield put(setMaintenance(data));
    }
  } catch (error) {
    console.log(error);
  }
}
