export default function ability_rank_ranked(rank){

    const ranks = {
        "BT+": 15,
        "BT": 14,
        "FRExt": 13,
        "FR": 12,
        "Call LD": 11,
        "Call 75": 10,
        "LD": 9,
        "EX": 8,
        "AA": 7,
        "S2": 6,
        "S1": 5,
        "HP": 4,
        "BRV": 3,
        "start": 2,
        "buff_state": 0
    }

    if (rank == undefined) {
        return (
            0
        )
    } else {
        return ranks[rank]
    }
}