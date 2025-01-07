import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLPassiveAbilityNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/passive_ability/GLNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/passive_ability/GLNew.json', { 'muteHttpExceptions': true })
  }
}
