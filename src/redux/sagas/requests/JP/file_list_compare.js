import axios from "axios";
import DevSwitch from '../../../DevSwitch'

export function requestGetJPFileListCompare() {
  if (DevSwitch == true) {
    return axios.get('data/_dir/filelist/JPCompare.json', { 'muteHttpExceptions': true })
  } else {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/filelist/JPCompare.json', { 'muteHttpExceptions': true })
  }
}
