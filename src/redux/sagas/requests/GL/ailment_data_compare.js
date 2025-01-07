import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLAilmentDataCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/ailments/GLCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/ailments/GLCompare.json', { 'muteHttpExceptions': true })
  }
}
