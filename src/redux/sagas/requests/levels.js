import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetLevels() {
  if (DevSwitch == true) {
    return axios.get('http://localhost:3001/data/levels', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/levels.json', { 'muteHttpExceptions': true })
  }
}
