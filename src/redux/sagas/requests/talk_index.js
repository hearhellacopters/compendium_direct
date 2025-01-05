import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetTalkIndex() {
  if (DevSwitch == true) {
    return axios.get('data/talk_index.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/talk_index.json', { 'muteHttpExceptions': true })
  }
}
