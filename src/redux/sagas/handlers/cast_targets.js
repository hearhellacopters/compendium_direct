import { call, put } from "redux-saga/effects";
import { setCastTargets } from "../../ducks/cast_targets";
import { requestGetCastTargets } from "../requests/cast_targets";
import isJson from "./_JSON_CHECK";

export function* handleGetCastTargets(action) {
  try {
    const response = yield call(requestGetCastTargets);
    const { data } = response;
    if(isJson(data,"GetCastTargets") == true){
      yield put(setCastTargets(data));
    }
  } catch (error) {
    console.log(error);
  }
}
