import { call, put } from "redux-saga/effects";
import { setJPPassiveAbilityCompare } from "../../../ducks/JP/passive_ability_compare";
import { requestGetJPPassiveAbilityCompare } from "../../requests/JP/passive_ability_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPPassiveAbilityCompare(action) {
  try {
    const response = yield call(requestGetJPPassiveAbilityCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPPassiveAbilityCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
