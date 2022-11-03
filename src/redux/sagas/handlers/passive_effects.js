import { call, put } from "redux-saga/effects";
import { setPassiveEffects } from "../../ducks/passive_effects";
import { requestGetPassiveEffects } from "../requests/passive_effects";
import isJson from "./_JSON_CHECK";

export function* handleGetPassiveEffects(action) {
  try {
    const response = yield call(requestGetPassiveEffects);
    const { data } = response;
    if(isJson(data,"GetPassiveEffects") == true){
      yield put(setPassiveEffects(data));
    }
  } catch (error) {
    console.log(error);
  }
}
