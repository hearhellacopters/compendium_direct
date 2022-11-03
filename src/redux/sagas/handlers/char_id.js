import { call, put } from "redux-saga/effects";
import { setCharID } from "../../ducks/char_id";
import { requestGetCharID } from "../requests/char_id";
import isJson from "./_JSON_CHECK";

export function* handleGetCharID(action) {
  try {
    const response = yield call(requestGetCharID);
    const { data } = response;
    if(isJson(data,"getCharID ") == true){
      yield put(setCharID(data));
    }
  } catch (error) {
    console.log(error);
  }
}
