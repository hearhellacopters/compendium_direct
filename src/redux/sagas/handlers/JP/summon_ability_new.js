import { call, put } from "redux-saga/effects";
import { setJPSummonAbilityNew } from "../../../ducks/JP/summon_ability_new";
import { requestGetJPSummonAbilityNew } from "../../requests/JP/summon_ability_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPSummonAbilityNew(action) {
  try {
    const response = yield call(requestGetJPSummonAbilityNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPSummonAbilityNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
