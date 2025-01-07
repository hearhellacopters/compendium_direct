import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLCharacterOptionNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/character_option/GLNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/character_option/GLNew.json', { 'muteHttpExceptions': true })
  }
}
