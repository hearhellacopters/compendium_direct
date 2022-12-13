import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetCharacters() {
  if (DevSwitch == true) {
    return axios.get('http://localhost:3001/data/characters', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/characters.json', { 'muteHttpExceptions': true })
  }
}
