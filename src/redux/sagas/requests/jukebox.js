import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetJukeBox() {
  if(DevSwitch == true ){
    return axios.get('http://localhost:3001/data/music',{'muteHttpExceptions': true})
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/music.json',{'muteHttpExceptions': true})
}
}
