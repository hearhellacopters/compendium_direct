import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetFRWeapon() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3001/data/frweapon',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/frweapon.json',{'muteHttpExceptions': true})
}
}
