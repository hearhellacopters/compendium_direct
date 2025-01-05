import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetSummonLevels() {
  if (DevSwitch == true) {
    return axios.get('data/summonlevels.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/summonlevels.json', { 'muteHttpExceptions': true })
  }
}
