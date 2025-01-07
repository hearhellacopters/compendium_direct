import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPEquipmentPassiveAbilityCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/equipment_passive/JPCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/equipment_passive/JPCompare.json', { 'muteHttpExceptions': true })
  }
}
