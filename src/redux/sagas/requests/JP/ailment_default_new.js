import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPAilmentDefaultNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/ailmentdefault/JPNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/ailmentdefault/JPNew.json', { 'muteHttpExceptions': true })
  }
}
