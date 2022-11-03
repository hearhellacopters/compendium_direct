import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetPassiveEffects() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3005/data/index/passive_effects/',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/passive_effects.json',{'muteHttpExceptions': true})
}
}
