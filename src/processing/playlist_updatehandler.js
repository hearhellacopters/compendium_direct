const playlist_updatehandler = (playlist, add_track, state) => {
    if (playlist != "master") {
        window.localStorage.setItem(playlist, JSON.stringify(add_track))
    }
    return add_track
}

export default playlist_updatehandler