import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLEquipmentPassiveAbilityNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/equipment_passive/GLNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/equipment_passive/GLNew.json', { 'muteHttpExceptions': true })
  }
}
