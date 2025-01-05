import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetSummons() {
  if (DevSwitch == true) {
    return axios.get('data/summons.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/summons.json', { 'muteHttpExceptions': true })
  }
}
