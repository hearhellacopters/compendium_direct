import axios from "axios";
import DevSwitch from '../../DevSwitch'

export function requestGetCommandGroupFull() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3005/data/command_group/Full/',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/command_group/Full.json',{'muteHttpExceptions': true})
}
}
