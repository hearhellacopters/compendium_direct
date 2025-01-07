import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPCharacterAbilityCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/character_ability/JPCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/character_ability/JPCompare.json', { 'muteHttpExceptions': true })
  }
}
