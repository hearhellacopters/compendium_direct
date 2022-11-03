import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetEquipmentPassiveNames() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3005/data/index/equipmentpassives/',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/equipmentpassives.json',{'muteHttpExceptions': true})
}
}
