import { call, put } from "redux-saga/effects";
import { setCharacters } from "../../ducks/characters";
import { requestGetCharacters } from "../requests/characters";
import isJson from "./_JSON_CHECK";

export function* handleGetCharacters(action) {
  try {
    const response = yield call(requestGetCharacters);
    const { data } = response;
    if(isJson(data,"GetCharacters") == true){
      yield put(setCharacters(data));
    }
  } catch (error) {
    console.log(error);
  }
}
