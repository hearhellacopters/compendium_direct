import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetPassiveNames() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/index/passives.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/passives.json', { 'muteHttpExceptions': true })
  }
}
