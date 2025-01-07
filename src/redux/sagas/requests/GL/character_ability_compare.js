import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLCharacterAbilityCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/character_ability/GLCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/character_ability/GLCompare.json', { 'muteHttpExceptions': true })
  }
}
