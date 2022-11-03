import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetCharID() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3005/data/index/char_id/',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/char_id.json',{'muteHttpExceptions': true})
}
}
