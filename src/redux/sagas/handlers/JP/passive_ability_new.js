import { call, put } from "redux-saga/effects";
import { setJPPassiveAbilityNew } from "../../../ducks/JP/passive_ability_new";
import { requestGetJPPassiveAbilityNew } from "../../requests/JP/passive_ability_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPPassiveAbilityNew(action) {
  try {
    const response = yield call(requestGetJPPassiveAbilityNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPPassiveAbilityNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
