import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLAilmentCastCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/cast/GLCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/cast/GLCompare.json', { 'muteHttpExceptions': true })
  }
}
