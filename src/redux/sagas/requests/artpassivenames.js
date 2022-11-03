import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetArtPassiveNames() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3005/data/index/artpassives/',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/artpassives.json',{'muteHttpExceptions': true})
}
}
