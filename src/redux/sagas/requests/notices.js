import axios from "axios";

export function requestGetNotices() {
    return axios.get('https://www.dissidiacompendium.com/data/_dir/notices/notices.json', { 'muteHttpExceptions': true })
}
