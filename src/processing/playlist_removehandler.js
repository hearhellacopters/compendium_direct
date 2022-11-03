const playlist_removehandler =(playlist,remove_track,state,current_list)=>{
    var fullList = []
    const final_list =[]
    if(playlist != "master"){
        if(playlist == "list1"){
            fullList.push(...state.list1)
        }
        if(playlist == "list2"){
            fullList.push(...state.list2)
        }
        if(playlist == "list3"){
            fullList.push(...state.list3)
        }

        fullList.map(self3=>{
            remove_track.map(self2=>{
                if(self3.MusicKey != self2.MusicKey){
                    final_list.push(self3)
                }
            })
        })

        window.localStorage.setItem(playlist, JSON.stringify(final_list))
    } else {
        fullList.push(...current_list)
        fullList.map(self3=>{
            remove_track.map(self2=>{
                if(self3.MusicKey != self2.MusicKey){
                    final_list.push(self3)
                }
            })
        })
        
    }
    return final_list
}

export default playlist_removehandler