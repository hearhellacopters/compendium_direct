import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetAccess() {
  if (DevSwitch == true) {
    return axios.get('http://localhost:3005/data/Access/full/', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/_m/Access/full.json', { 'muteHttpExceptions': true })
  }
}
