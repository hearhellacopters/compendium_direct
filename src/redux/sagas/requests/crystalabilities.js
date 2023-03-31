import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetCrystalAbilities() {
  if (DevSwitch == true) {
    return axios.get('http://localhost:3005/data/_dir/index/crystal_abilities', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/crystal_abilities.json', { 'muteHttpExceptions': true })
  }
}
