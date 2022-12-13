import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetStickers() {
  if (DevSwitch == true) {
    return axios.get('http://localhost:3001/data/stickers', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/stickers.json', { 'muteHttpExceptions': true })
  }
}
