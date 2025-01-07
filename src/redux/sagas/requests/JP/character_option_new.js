import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPCharacterOptionNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/character_option/JPNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/character_option/JPNew.json', { 'muteHttpExceptions': true })
  }
}
