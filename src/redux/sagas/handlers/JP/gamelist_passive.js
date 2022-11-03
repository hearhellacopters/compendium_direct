import { call, put } from "redux-saga/effects";
import { setJPGameListPassive } from "../../../ducks/JP/gamelist_passive";
import { requestGetJPGameListPassive } from "../../requests/JP/gamelist_passive";
import isJson from "../_JSON_CHECK";

export function* handleGetJPGameListPassive(action) {
  try {
    const response = yield call(requestGetJPGameListPassive);
    const { data } = response;
    if(isJson(data) == true){
        yield put(setJPGameListPassive(data));
    }
  } catch (error) {
    console.log(error);
  }
}
