import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLAilmentModifyCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/modify/GLCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/modify/GLCompare.json', { 'muteHttpExceptions': true })
  }
}
