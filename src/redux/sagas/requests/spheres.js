import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetSpheres() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3001/data/spheres',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/spheres.json',{'muteHttpExceptions': true})
}
}
