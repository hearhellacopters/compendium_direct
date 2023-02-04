import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetCrystalPassives() {
  if (DevSwitch == true) {
    return axios.get('http://localhost:3005/data/_dir/index/crystal_passives', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/crystal_passives.json', { 'muteHttpExceptions': true })
  }
}
