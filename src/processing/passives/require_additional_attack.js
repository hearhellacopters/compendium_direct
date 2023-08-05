function joinWith(arr, and_or) {
    if (arr.length === 0){
        return ""; // Return an empty string for an empty array
    }
    if (arr.length === 1){
        return arr[0]; // Return the only item in the array if there's just one element
    } 
    if(and_or == undefined){
        return arr.join(", ")
    } else
    // If there are multiple elements, join them with " and / or " before the last item
    return arr.slice(0, -1).join(", ") + ` ${and_or} ` + arr[arr.length - 1];
}

export default function require_additional_attack(value, and_or, flag){
    var output = []
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
    if (value1 == flag) {
        output.push("before ability attack")
    }
    if (value2 == flag) {
        output.push("before Player turn attack")
    }
    if (value3 == flag) {
        output.push("Trap before Enemy turn")
    }
    if (value4 == flag) {
        output.push("Trap after enemy turn (including triggered)")
    }
    if (value5 == flag) {
        output.push("at start of next turn attack")
    }
    if (value6 == flag) {
        output.push("action against Enemy attack (including Summons)")
    }
    if (value7 == flag) {
        output.push("ability extension follow up attack")
    }
    if (value8 == flag) {
        output.push("other additional attack")
    }
    //if (value9 == 1) {
    //    output.push("")
    //}

    return (
        joinWith(output, and_or)
    )
}