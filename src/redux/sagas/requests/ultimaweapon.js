import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetUltimaWeapon() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/index/ultima_weapons.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/ultima_weapons.json', { 'muteHttpExceptions': true })
  }
}
