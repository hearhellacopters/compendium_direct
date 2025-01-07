import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLArtPassiveNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/art_passive/GLNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/art_passive/GLNew.json', { 'muteHttpExceptions': true })
  }
}
