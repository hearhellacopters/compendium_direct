import { call, put } from "redux-saga/effects";
import { setJPCharacterAbilityCompare } from "../../../ducks/JP/character_ability_compare";
import { requestGetJPCharacterAbilityCompare } from "../../requests/JP/character_ability_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPCharacterAbilityCompare(action) {
  try {
    const response = yield call(requestGetJPCharacterAbilityCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPCharacterAbilityCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
