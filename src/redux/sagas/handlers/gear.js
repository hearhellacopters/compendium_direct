import { call, put } from "redux-saga/effects";
import { setGear } from "../../ducks/gear";
import { requestGetGear } from "../requests/gear";
import isJson from "./_JSON_CHECK";

export function* handleGetGear(action) {
  try {
    const response = yield call(requestGetGear);
    const { data } = response;
    if(isJson(data,"GetGear") == true){
      yield put(setGear(data));
    }
  } catch (error) {
    console.log(error);
  }
}
