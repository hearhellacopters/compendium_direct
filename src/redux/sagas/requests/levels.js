import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetLevels() {
  if (DevSwitch == true) {
    return axios.get('data/levels.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/levels.json', { 'muteHttpExceptions': true })
  }
}
