import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetEventsIndex() {
  if (DevSwitch == true) {
    return axios.get('http://localhost:3001/data/eventsIndex', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/eventsIndex.json', { 'muteHttpExceptions': true })
  }
}
