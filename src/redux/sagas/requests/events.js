import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetEvents() {
  if (DevSwitch == true) {
    return axios.get('data/events.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/events.json', { 'muteHttpExceptions': true })
  }
}
