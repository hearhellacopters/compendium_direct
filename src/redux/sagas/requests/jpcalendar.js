import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetJPCalendar() {
  if (DevSwitch == true) {
    return axios.get('data/jpcalendar.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/jpcalendar.json', { 'muteHttpExceptions': true })
  }
}
