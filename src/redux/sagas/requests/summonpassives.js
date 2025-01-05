import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetSummonPassives() {
  if (DevSwitch == true) {
    return axios.get('data/summonpassives.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/summonpassives.json', { 'muteHttpExceptions': true })
  }
}
