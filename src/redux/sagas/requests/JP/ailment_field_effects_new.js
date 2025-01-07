import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPAilmentFieldEffectsNew() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/fieldeffects/JPNew.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/fieldeffects/JPNew.json', { 'muteHttpExceptions': true })
  }
}
