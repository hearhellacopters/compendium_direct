import { call, put } from "redux-saga/effects";
import { setJPCharacterAbilityNew } from "../../../ducks/JP/character_ability_new";
import { requestGetJPCharacterAbilityNew } from "../../requests/JP/character_ability_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPCharacterAbilityNew(action) {
  try {
    const response = yield call(requestGetJPCharacterAbilityNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPCharacterAbilityNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
