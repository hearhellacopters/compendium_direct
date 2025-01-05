import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetEnemyAbilityDirect() {
  if (DevSwitch == true) {
    return axios.get(`data/enemies/abilities_direct.json`, { 'muteHttpExceptions': true })
  }
  if (DevSwitch == false) {
    return axios.get(`https://www.dissidiacompendium.com/data/enemies/abilities_direct.json`, { 'muteHttpExceptions': true })
  }
}
