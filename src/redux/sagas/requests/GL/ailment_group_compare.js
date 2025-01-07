import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLAilmentGroupCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/ailmentgroup/GLCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/ailmentgroup/GLCompare.json', { 'muteHttpExceptions': true })
  }
}
