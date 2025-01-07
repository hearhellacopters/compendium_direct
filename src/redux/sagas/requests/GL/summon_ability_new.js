import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetGLSummonAbilityNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/summon_ability/GLNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/summon_ability/GLNew.json', { 'muteHttpExceptions': true })
  }
}
