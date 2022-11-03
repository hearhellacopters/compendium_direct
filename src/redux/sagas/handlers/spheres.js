import { call, put } from "redux-saga/effects";
import { setSpheres } from "../../ducks/spheres";
import { requestGetSpheres } from "../requests/spheres";
import isJson from "./_JSON_CHECK";

export function* handleGetSpheres(action) {
  try {
    const response = yield call(requestGetSpheres);
    const { data } = response;
    if(isJson(data,"GetSpheres") == true){
      yield put(setSpheres(data));
    }
  } catch (error) {
    console.log(error);
  }
}
