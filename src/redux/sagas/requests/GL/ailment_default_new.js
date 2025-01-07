import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLAilmentDefaultNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/ailmentdefault/GLNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/ailmentdefault/GLNew.json', { 'muteHttpExceptions': true })
  }
}
