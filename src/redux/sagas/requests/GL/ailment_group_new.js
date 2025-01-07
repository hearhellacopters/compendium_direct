import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLAilmentGroupNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/ailmentgroup/GLNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/ailmentgroup/GLNew.json', { 'muteHttpExceptions': true })
  }
}
