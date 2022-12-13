import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetCharGuide() {
  if (DevSwitch == true) {
    //return axios.get('http://localhost:3001/data/characterlinks',{'muteHttpExceptions': true})
    return axios.get('https://dissidiacompendium.com/json/dev/CharacterLinks.json', { 'muteHttpExceptions': true })

  } else {
    return axios.get('https://dissidiacompendium.com/json/CharacterLinks.json', { 'muteHttpExceptions': true })
  }
}
