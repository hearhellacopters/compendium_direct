import { call, put } from "redux-saga/effects";
import { setJPCommandAbilityNew } from "../../../ducks/JP/command_ability_new";
import { requestGetJPCommandAbilityNew } from "../../requests/JP/command_ability_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPCommandAbilityNew(action) {
  try {
    const response = yield call(requestGetJPCommandAbilityNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPCommandAbilityNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
