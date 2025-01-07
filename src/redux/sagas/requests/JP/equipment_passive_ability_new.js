import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPEquipmentPassiveAbilityNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/equipment_passive/JPNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/equipment_passive/JPNew.json', { 'muteHttpExceptions': true })
  }
}
