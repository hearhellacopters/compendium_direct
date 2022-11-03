import { call, put } from "redux-saga/effects";
import { setEnemyBuffsDirect } from "../../ducks/enemybuffs_direct";
import { requestGetEnemyBuffsDirect } from "../requests/enemybuffs_direct";
import isJson from "./_JSON_CHECK";

export function* handleGetEnemyBuffsDirect(action) {
  try {
    const response = yield call(requestGetEnemyBuffsDirect);
    const { data } = response;
    if(isJson(data,"GetEnemyBuffsDirect") == true){
      yield put(setEnemyBuffsDirect(data));
    }
  } catch (error) {
    console.log(error);
  }
}
