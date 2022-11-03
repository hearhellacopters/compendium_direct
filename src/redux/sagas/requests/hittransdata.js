import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetHitTransData() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3005/data/index/hit_data_trans/',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/hit_data_trans.json',{'muteHttpExceptions': true})
}
}
