const element_other = (value) =>{
    const value_str = value.toString()
    const value_len = value.toString().length
    var value1 = 0 //Holy
    var value2 = 0 //Dark
    var value3 = 0 //Water
    var value4 = 0 //Earth
    var value5 = 0 //Wind
    var value6 = 0 //Thunder
    var value7 = 0 //Ice
    var value8 = 0 //Fire
    var value9 = 0 //Non-Elemental
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
    if(value9 == 0){
        output = output + "Non-Elemental "
    }
    if(value1 == 0){
        output = output + "<Holy>"
    }
    if(value2 == 0){
        output = output + "<Dark>"
    }
    if(value3 == 0){
        output = output + "<Water>"
    }
    if(value4 == 0){
        output = output + "<Earth>"
    }
    if(value5 == 0){
        output = output + "<Wind>"
    }
    if(value6 == 0){
        output = output + "<Thunder>"
    }
    if(value7 == 0){
        output = output + "<Ice>"
    }
    if(value8 == 0){
        output = output + "<Fire>"
    }
    if(value == 111111111){
        output = "none"
    }
    return(
        output
    )
}
export default element_other