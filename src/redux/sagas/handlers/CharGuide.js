import { call, put } from "redux-saga/effects";
import { setCharGuide } from "../../ducks/CharGuide";
import { requestGetCharGuide } from "../requests/CharGuide";
import isJson from "./_JSON_CHECK";

export function* handleGetCharGuide(action) {
  try {
    const response = yield call(requestGetCharGuide);
    const { data } = response;
    if (isJson(data, "GetCharGuide") == true) {
      yield put(setCharGuide(data));
    }
  } catch (error) {
    console.log(error);
  }
}
