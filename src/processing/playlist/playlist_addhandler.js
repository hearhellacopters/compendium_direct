export default function playlist_addhandler(
    playlist, 
    add_track, 
    state
    ){
    var fullList = []
    if (playlist != "master") {
        if (playlist == "list1") {
            fullList.push(...state.list1)
        }
        if (playlist == "list2") {
            fullList.push(...state.list2)
        }
        if (playlist == "list3") {
            fullList.push(...state.list3)
        }
        const checker = new Set()
        fullList.map(self3 => { checker.add(self3.MusicKey) })

        add_track && add_track.map(self => {
            if (checker.has(self.MusicKey) == false) {
                fullList.push(self)
            }
        })
        window.localStorage.setItem(playlist, JSON.stringify(fullList))
    }
    return fullList
}