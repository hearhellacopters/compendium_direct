import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetTalkIndex() {
  if (DevSwitch == true) {
    return axios.get('http://localhost:3001/data/talk_index', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/talk_index.json', { 'muteHttpExceptions': true })
  }
}
