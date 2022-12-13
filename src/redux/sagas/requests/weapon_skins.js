import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetWeaponSkins() {
  if (DevSwitch == true) {
    return axios.get('http://localhost:3005/data/_dir/index/weapon_skins/', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/weapon_skins.json', { 'muteHttpExceptions': true })
  }
}