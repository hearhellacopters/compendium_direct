import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetEnemyBuffsDirect() {
  if (DevSwitch == true) {
    return axios.get(`data/enemies/buffs_direct.json`, { 'muteHttpExceptions': true })
  }
  if (DevSwitch == false) {
    return axios.get(`https://www.dissidiacompendium.com/data/enemies/buffs_direct.json`, { 'muteHttpExceptions': true })
  }
}
