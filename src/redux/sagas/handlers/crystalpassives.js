import { call, put } from "redux-saga/effects";
import { setCrystalPassives } from "../../ducks/crystalpassives";
import { requestGetCrystalPassives } from "../requests/crystalpassives";
import isJson from "./_JSON_CHECK";

export function* handleGetCrystalPassives(action) {
  try {
    const response = yield call(requestGetCrystalPassives);
    const { data } = response;
    if (isJson(data, "GetCrystalPassives") == true) {
      yield put(setCrystalPassives(data));
    }
  } catch (error) {
    console.log(error);
  }
}
