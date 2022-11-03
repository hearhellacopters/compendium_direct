import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetOptionTransData() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3005/data/index/option_data_trans/',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/option_data_trans.json',{'muteHttpExceptions': true})
}
}
