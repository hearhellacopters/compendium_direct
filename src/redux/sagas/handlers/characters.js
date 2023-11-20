import { call, put } from "redux-saga/effects";
import { setCharacters } from "../../ducks/characters";
import { requestGetCharacters } from "../requests/characters";
import { requestGetAccess } from "../requests/access";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetCharacters(action) {
  try {
    const response = yield call(requestGetCharacters);
    const data = response.data
    const response2 = yield call(requestGetAccess);
    const data2 = response2.data
    if (isJson(data, "GetCharacters") == true && isJson(data2, "GetAccess") == true) {
      _error_remove("characters");
      yield put(setCharacters(data, data2));
    }
  } catch (error) {
    _error("characters", error.message);
  }
}
