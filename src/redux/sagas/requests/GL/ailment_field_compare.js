import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLAilmentFieldCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/field/GLCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/field/GLCompare.json', { 'muteHttpExceptions': true })
  }
}
