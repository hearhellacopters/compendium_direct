export default function ability_rank_trans(rank) {

    const ranks = {
        "BRV": "brv+",
        "HP": "hp+",
        "S1": "cl1",
        "S2": "cl20",
        "AA": "AA",
        "EX": "wpex",
        "LD": "wpld",
        "BT": "bt",
        "BT+": "bt+m",
        "FR":  "fr",
        "FRExt":  "frext",
        "Call 75": "call1",
        "Call LD": "call2"
    }

    if (rank == undefined) {
        return  ""
    } else {
        return ranks[rank]
    }
}