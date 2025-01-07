import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLLinkEffDataCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/link_effect/GLCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/link_effect/GLCompare.json', { 'muteHttpExceptions': true })
  }
}
