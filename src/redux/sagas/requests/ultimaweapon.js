import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetUltimaWeapon() {
  if (DevSwitch == true) {
    return axios.get('http://localhost:3005/data/_dir/index/ultima_weapons', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/ultima_weapons.json', { 'muteHttpExceptions': true })
  }
}
