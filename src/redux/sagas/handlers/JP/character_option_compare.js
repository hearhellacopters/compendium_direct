import { call, put } from "redux-saga/effects";
import { setJPCharacterOptionCompare } from "../../../ducks/JP/character_option_compare";
import { requestGetJPCharacterOptionCompare } from "../../requests/JP/character_option_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPCharacterOptionCompare(action) {
  try {
    const response = yield call(requestGetJPCharacterOptionCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPCharacterOptionCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
