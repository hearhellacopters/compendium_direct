const ememy_resist_str = (input)=>{
    var resist_str = ""
    var fire = ""
    var ice = ""
    var thunder = ""
    var water = ""
    var earth = ""
    var wind = ""
    var holy = ""
    var dark =""
    var melee = ""
    var ranged = ""
    var magic = ""
    if(input == undefined){
        return(
            ""
        )
    } else {
        if(input.fire != 1){
            fire = `<Fire>: <resist${input.fire}s>`
        }
        if(input.ice != 1){
            ice = ` / <Ice>: <resist${input.ice}s>`
        }
        if(input.thunder != 1){
            thunder = ` / <Thunder>: <resist${input.thunder}s>`
        }
        if(input.water != 1){
            water = ` / <Water>: <resist${input.water}s>`
        }
        if(input.soil != 1){
            earth = ` / <Earth>: <resist${input.soil}s>`
        }
        if(input.wind != 1){
            wind = ` / <Wind>: <resist${input.wind}s>`
        }
        if(input.darkness != 1){
            dark = ` / <Dark>: <resist${input.darkness}s>`
        }
        if(input.light != 1){
            holy = ` / <Holy>: <resist${input.light}s>`
        }
        if(input.near_physics != 1){
            melee = ` / <Melee>: <resist${input.near_physics}s>`
        }
        if(input.far_physics != 1){
            ranged = ` / <Ranged>: <resist${input.far_physics}s>`
        }
        if(input.magic != 1){
            magic = ` / <Magic>: <resist${input.magic}s>`
        }

        resist_str= `[${fire}${ice}${thunder}${water}${earth}${wind}${dark}${holy}${melee}${ranged}${magic}]`

        if(input.fire == 1 && 
            input.ice == 1 && 
        input.thunder == 1 && 
          input.water == 1 && 
           input.soil == 1 && 
           input.wind == 1 && 
       input.darkness == 1 &&
          input.light == 1 &&
   input.near_physics == 1 &&
    input.far_physics == 1 &&
    input.magic == 1){
                resist_str = "[Normal]"
            }
        const final_str = resist_str.replace(/^\[ \/ /g,"[")
        return(
            final_str
        )

    }
    
}
export default ememy_resist_str