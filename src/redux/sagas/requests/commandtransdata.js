import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetCommandTransData() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3005/data/index/command_data_trans/',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/command_data_trans.json',{'muteHttpExceptions': true})
}
}
