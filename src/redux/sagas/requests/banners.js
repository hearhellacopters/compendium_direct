import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetBanners() {
  if (DevSwitch == true) {
    return axios.get('http://localhost:3001/data/banners', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/banners.json', { 'muteHttpExceptions': true })
  }
}
