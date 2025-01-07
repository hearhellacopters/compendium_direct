import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPLinkEffDataCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/link_effect/JPCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/link_effect/JPCompare.json', { 'muteHttpExceptions': true })
  }
}
