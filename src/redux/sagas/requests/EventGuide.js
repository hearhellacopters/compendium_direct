import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetEventGuide() {
  if (DevSwitch == true) {
    return axios.get('http://localhost:3001/data/eventlinks', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://dissidiacompendium.com/json/EventLinks.json', { 'muteHttpExceptions': true })
  }
}
