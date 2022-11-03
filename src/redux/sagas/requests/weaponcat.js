import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetWeaponCat() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3005/data/index/MessageData_Category/',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/index/MessageData_Category.json',{'muteHttpExceptions': true})
}
}
