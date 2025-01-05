import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetEnemiesDirect() {
  if (DevSwitch == true) {
    return axios.get('data/enemies_direct.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/enemies_direct.json', { 'muteHttpExceptions': true })
  }
}
