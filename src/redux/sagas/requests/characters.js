import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetCharacters() {
  if (DevSwitch == true) {
    return axios.get('data/characters.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/characters.json', { 'muteHttpExceptions': true })
  }
}
