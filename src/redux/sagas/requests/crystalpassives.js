import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetCrystalPassives() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/index/crystal_passives.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/crystal_passives.json', { 'muteHttpExceptions': true })
  }
}
