import axios from "axios";
import DevSwitch from '../../DevSwitch.js'

export function requestGetNotices() {
    if(DevSwitch){
        return axios.get('data/_dir/notices/notices.json', { 'muteHttpExceptions': true })
    } else {
        return axios.get('https://www.dissidiacompendium.com/data/_dir/notices/notices.json', { 'muteHttpExceptions': true })
    }
}
