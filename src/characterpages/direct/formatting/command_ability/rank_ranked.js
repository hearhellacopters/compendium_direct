const ranks_ranked =(rank)=>{

    if(rank == "BT+"){
        return(
            15
        )
    }
    if(rank == "BT"){
        return(
            14
        )
    }
    if(rank == "FRExt"){
        return(
            13
        )
    }
    if(rank == "FR"){
        return(
            12
        )
    }
    if(rank == "Call LD"){
        return(
            11
        )
    }
    if(rank == "Call 75"){
        return(
            10
        )
    }
    if(rank == "LD"){
        return(
            9
        )
    }
    if(rank == "EX"){
        return(
            8
        )
    }
    if(rank == "AA"){
        return(
            7
        )
    }
    if(rank == "S2"){
        return(
           6
        )
    }
    if(rank == "S1"){
        return(
            5
        )
    }
    if(rank == "HP"){
        return(
            4
        )
    }
    if(rank == "BRV"){
        return(
            3
        )
    }
    if(rank == "start"){
        return(
            2
        )
    }
    if(rank == "buff_state"){
        return(
            1
        )
    }
    if(rank == undefined){
        return(
            0
        )
    }
}
export default ranks_ranked