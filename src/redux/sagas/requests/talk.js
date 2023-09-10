import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetTalk() {
  if (DevSwitch == true) {
    return axios.get('http://localhost:3001/data/talk', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/talk.json', { 'muteHttpExceptions': true })
  }
}
