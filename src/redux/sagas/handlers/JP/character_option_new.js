import { call, put } from "redux-saga/effects";
import { setJPCharacterOptionNew } from "../../../ducks/JP/character_option_new";
import { requestGetJPCharacterOptionNew } from "../../requests/JP/character_option_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPCharacterOptionNew(action) {
  try {
    const response = yield call(requestGetJPCharacterOptionNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPCharacterOptionNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
