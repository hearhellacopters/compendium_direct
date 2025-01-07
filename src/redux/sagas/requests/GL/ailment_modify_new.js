import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLAilmentModifyNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/modify/GLNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/modify/GLNew.json', { 'muteHttpExceptions': true })
  }
}
