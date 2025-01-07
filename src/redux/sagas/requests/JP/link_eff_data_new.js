import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPLinkEffDataNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/link_effect/JPNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/link_effect/JPNew.json', { 'muteHttpExceptions': true })
  }
}
