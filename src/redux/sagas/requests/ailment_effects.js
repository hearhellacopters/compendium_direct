import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetAilmentEffects() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3005/data/index/ailment_effect_id_index/',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/ailment_effect_id_index.json',{'muteHttpExceptions': true})
}
}
