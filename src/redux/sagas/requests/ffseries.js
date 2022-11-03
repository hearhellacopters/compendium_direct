import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetFFSeries() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3005/data/index/MessageData_FFSeries/',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/MessageData_FFSeries.json',{'muteHttpExceptions': true})
}
}
