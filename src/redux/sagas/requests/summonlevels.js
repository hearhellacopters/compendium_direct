import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetSummonLevels() {
  if (DevSwitch == true) {
    return axios.get('http://localhost:3001/data/summonlevels', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/summonlevels.json', { 'muteHttpExceptions': true })
  }
}
