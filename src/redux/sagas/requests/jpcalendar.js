import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetJPCalendar() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3001/data/jpcalendar',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/jpcalendar.json',{'muteHttpExceptions': true})
}
}
