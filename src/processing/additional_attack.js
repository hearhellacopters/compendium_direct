const additional_attack = (value) =>{
    const value_str = value.toString()
    const value_len = value.toString().length
    var value1 = 0 // 000000001 Before ability
    var value2 = 0 // 000000010 Before player turn
    var value3 = 0 // 000000100 Trap before enemy turn
    var value4 = 0 // 000001000 Trap after enemy turn (including triggered)
    var value5 = 0 // 000010000 At start of next turn
    var value6 = 0 // 000100000 Action against enemy (including summons)
    var value7 = 0 // 001000000 Ability extension follow up
    var value8 = 0 // 010000000 Reserved
    var value9 = 0 // 100000000 Not in use that we know of
    var output = ""
    if(value_len == 1){
        value1 = value_str.substring(0, 1)
    }
    if(value_len == 2){
        value2 = value_str.substring(0, 1)
        value1 = value_str.substring(1, 2)
    }
    if(value_len == 3){
        value3 = value_str.substring(0, 1)
        value2 = value_str.substring(1, 2)
        value1 = value_str.substring(2, 3)
    }
    if(value_len == 4){
        value4 = value_str.substring(0, 1)
        value3 = value_str.substring(1, 2)
        value2 = value_str.substring(2, 3)
        value1 = value_str.substring(3, 4)
    }
    if(value_len == 5){
        value5 = value_str.substring(0, 1)
        value4 = value_str.substring(1, 2)
        value3 = value_str.substring(2, 3)
        value2 = value_str.substring(3, 4)
        value1 = value_str.substring(4, 5)
    }
    if(value_len == 6){
        value6 = value_str.substring(0, 1)
        value5 = value_str.substring(1, 2)
        value4 = value_str.substring(2, 3)
        value3 = value_str.substring(3, 4)
        value2 = value_str.substring(4, 5)
        value1 = value_str.substring(5, 6)
    }
    if(value_len == 7){
        value7 = value_str.substring(0, 1)
        value6 = value_str.substring(1, 2)
        value5 = value_str.substring(2, 3)
        value4 = value_str.substring(3, 4)
        value3 = value_str.substring(4, 5)
        value2 = value_str.substring(5, 6)
        value1 = value_str.substring(6, 7)
    }
    if(value_len == 8){
        value8 = value_str.substring(0, 1)
        value7 = value_str.substring(1, 2)
        value6 = value_str.substring(2, 3)
        value5 = value_str.substring(3, 4)
        value4 = value_str.substring(4, 5)
        value3 = value_str.substring(5, 6)
        value2 = value_str.substring(6, 7)
        value1 = value_str.substring(7, 8)
    }
    if(value_len == 9){
        value9 = value_str.substring(0, 1)
        value8 = value_str.substring(1, 2)
        value7 = value_str.substring(2, 3)
        value6 = value_str.substring(3, 4)
        value5 = value_str.substring(4, 5)
        value4 = value_str.substring(5, 6)
        value3 = value_str.substring(6, 7)
        value2 = value_str.substring(7, 8)
        value1 = value_str.substring(8, 9)
    }
    if(value1 == 1){
        if(output != ""){
            output = output + " or "
        }
        output = output + "before ability attack"
    }
    if(value2 == 1){
        if(output != ""){
            output = output + " or "
        }
        output = output + "before Player turn attack"
    }
    if(value3 == 1){
        if(output != ""){
            output = output + " or "
        }
        output = output + "Trap before Enemy turn"
    }
    if(value4 == 1){
        if(output != ""){
            output = output + " or "
        }
        output = output + "Trap after enemy turn (including triggered)"
    }
    if(value5 == 1){
        if(output != ""){
            output = output + " or "
        }
        output = output + "at start of next turn attack"
    }
    if(value6 == 1){
        if(output != ""){
            output = output + " or "
        }
        output = output + "action against Enemy attack (including Summons)"
    }
    if(value7 == 1){
        if(output != ""){
            output = output + " or "
        }
        output = output + "ability extension follow up attack"
    }
    if(value8 == 1){
        if(output != ""){
            output = output + " or "
        }
        output = output + "other additional attack"
    }
    if(value9 == 1){
        if(output != ""){
            output = output + " or "
        }
        output = output + ""
    }
    
    return(
        output
    )
}
export default additional_attack