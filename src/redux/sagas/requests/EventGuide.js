import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetEventGuide() {
  if (DevSwitch == true) {
    return axios.get('json/EventLinks.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://dissidiacompendium.com/json/EventLinks.json', { 'muteHttpExceptions': true })
  }
}
