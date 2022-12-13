const rank_trans = (rank) => {
    if (rank == "BRV") {
        return (
            "brvattackiconbutton undertaga"
        )
    }
    if (rank == "HP") {
        return (
            "hpplusattackicon undertaga"
        )
    }
    if (rank == "S1") {
        return (
            "startingability undertaga"
        )
    }
    if (rank == "S2") {
        return (
            "cl20 undertaga"
        )
    }
    if (rank == "AA") {
        return (
            "aaabilityButton undertaga"
        )
    }
    if (rank == "EX") {
        return (
            "wpex undertaga"
        )
    }
    if (rank == "LD") {
        return (
            "wpld undertaga"
        )
    }
    if (rank == "BT") {
        return (
            "wpbt undertaga"
        )
    }
    if (rank == "BT+") {
        return (
            "wpbtplus undertaga"
        )
    }
    if (rank == "FR") {
        return (
            "wpfr undertaga"
        )
    }
    if (rank == "FRExt") {
        return (
            "FRExt undertaga"
        )
    }
    if (rank == "Call 75") {
        return (
            "call1 undertaga"
        )
    }
    if (rank == "Call LD") {
        return (
            "call2 undertaga"
        )
    }
    if (rank == undefined) {
        return (
            ""
        )
    }
}
export default rank_trans