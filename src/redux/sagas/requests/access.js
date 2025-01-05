import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetAccess() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/_m/Access/full.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/_m/Access/full.json', { 'muteHttpExceptions': true })
  }
}
