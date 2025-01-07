import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLAilmentCastNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/cast/GLNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/cast/GLNew.json', { 'muteHttpExceptions': true })
  }
}
