import { call, put } from "redux-saga/effects";
import { setCrystalAbilities } from "../../ducks/crystalabilities";
import { requestGetCrystalAbilities } from "../requests/crystalabilities";
import isJson from "./_JSON_CHECK";

export function* handleGetCrystalAbilities(action) {
  try {
    const response = yield call(requestGetCrystalAbilities);
    const { data } = response;
    if (isJson(data, "GetCrystalAbilities") == true) {
      yield put(setCrystalAbilities(data));
    }
  } catch (error) {
    console.log(error);
  }
}
