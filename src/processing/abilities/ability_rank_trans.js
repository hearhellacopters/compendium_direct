export default function ability_rank_trans(rank) {

    const ranks = {
        "BRV": "brvattackiconbutton undertaga",
        "HP": "hpplusattackicon undertaga",
        "S1": "startingability undertaga",
        "S2": "cl20 undertaga",
        "AA": "aaabilityButton undertaga",
        "EX": "wpex undertaga",
        "LD": "wpld undertaga",
        "BT": "wpbt undertaga",
        "BT+": "wpbtplus undertaga",
        "FR":  "wpfr undertaga",
        "FRExt":  "FRExt undertaga",
        "Call 75": "call1 undertaga",
        "Call LD": "call2 undertaga"
    }

    if (rank == undefined) {
        return  ""
    } else {
        return ranks[rank]
    }
}