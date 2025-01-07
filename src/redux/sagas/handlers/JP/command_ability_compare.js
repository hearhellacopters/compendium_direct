import { call, put } from "redux-saga/effects";
import { setJPCommandAbilityCompare } from "../../../ducks/JP/command_ability_compare";
import { requestGetJPCommandAbilityCompare } from "../../requests/JP/command_ability_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPCommandAbilityCompare(action) {
  try {
    const response = yield call(requestGetJPCommandAbilityCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPCommandAbilityCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
