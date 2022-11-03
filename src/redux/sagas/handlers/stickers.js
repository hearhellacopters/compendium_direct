import { call, put } from "redux-saga/effects";
import { setStickers } from "../../ducks/stickers";
import { requestGetStickers } from "../requests/stickers";
import isJson from "./_JSON_CHECK";

export function* handleGetStickers(action) {
  try {
    const response = yield call(requestGetStickers);
    const { data } = response;
    if(isJson(data,"GetStickers") == true){
      yield put(setStickers(data));
    }
  } catch (error) {
    console.log(error);
  }
}
