export default function require_additional_attack(value){
    var output = ""
    if(typeof value == "number"){
       var value9 = Math.floor((value % 1000000000) / 100000000) // 100000000 Not in use that we know of
       var value8 = Math.floor((value % 100000000) / 10000000)   // 010000000 Reserved
       var value7 = Math.floor((value % 10000000) / 1000000)     // 001000000 Ability extension follow up
       var value6 = Math.floor((value % 1000000) / 100000)       // 000100000 Action against enemy (including summons)
       var value5 = Math.floor((value % 100000) / 10000)         // 000010000 At start of next turn
       var value4 = Math.floor((value % 10000) / 1000)           // 000001000 Trap after enemy turn (including triggered)   
       var value3 = Math.floor((value % 1000) / 100)             // 000000100 Trap before enemy turn
       var value2 = Math.floor((value % 100) / 10)               // 000000010 Before player turn
       var value1 = Math.floor(value % 10)                       // 000000001 Before ability
    }
    if (value1 == 1) {
        if (output != "") {
            output = output + " or "
        }
        output = output + "before ability attack"
    }
    if (value2 == 1) {
        if (output != "") {
            output = output + " or "
        }
        output = output + "before Player turn attack"
    }
    if (value3 == 1) {
        if (output != "") {
            output = output + " or "
        }
        output = output + "Trap before Enemy turn"
    }
    if (value4 == 1) {
        if (output != "") {
            output = output + " or "
        }
        output = output + "Trap after enemy turn (including triggered)"
    }
    if (value5 == 1) {
        if (output != "") {
            output = output + " or "
        }
        output = output + "at start of next turn attack"
    }
    if (value6 == 1) {
        if (output != "") {
            output = output + " or "
        }
        output = output + "action against Enemy attack (including Summons)"
    }
    if (value7 == 1) {
        if (output != "") {
            output = output + " or "
        }
        output = output + "ability extension follow up attack"
    }
    if (value8 == 1) {
        if (output != "") {
            output = output + " or "
        }
        output = output + "other additional attack"
    }
    if (value9 == 1) {
        if (output != "") {
            output = output + " or "
        }
        output = output + ""
    }

    return (
        output
    )
}