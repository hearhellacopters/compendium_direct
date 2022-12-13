const element_weakness = (value) => {
    const value_str = value.toString()
    const value_len = value.toString().length
    var value1 = 0 //Holy       000000001
    var value2 = 0 //Dark       000000010
    var value3 = 0 //Water      000000100
    var value4 = 0 //Earth      000001000
    var value5 = 0 //Wind       000010000
    var value6 = 0 //Thunder    000100000
    var value7 = 0 //Ice        001000000
    var value8 = 0 //Fire       010000000
    var value9 = 0 //Non-Ele    100000000
    var output = ""
    if (value_len == 1) {
        value1 = value_str.substring(0, 1)
    }
    if (value_len == 2) {
        value2 = value_str.substring(0, 1)
        value1 = value_str.substring(1, 2)
    }
    if (value_len == 3) {
        value3 = value_str.substring(0, 1)
        value2 = value_str.substring(1, 2)
        value1 = value_str.substring(2, 3)
    }
    if (value_len == 4) {
        value4 = value_str.substring(0, 1)
        value3 = value_str.substring(1, 2)
        value2 = value_str.substring(2, 3)
        value1 = value_str.substring(3, 4)
    }
    if (value_len == 5) {
        value5 = value_str.substring(0, 1)
        value4 = value_str.substring(1, 2)
        value3 = value_str.substring(2, 3)
        value2 = value_str.substring(3, 4)
        value1 = value_str.substring(4, 5)
    }
    if (value_len == 6) {
        value6 = value_str.substring(0, 1)
        value5 = value_str.substring(1, 2)
        value4 = value_str.substring(2, 3)
        value3 = value_str.substring(3, 4)
        value2 = value_str.substring(4, 5)
        value1 = value_str.substring(5, 6)
    }
    if (value_len == 7) {
        value7 = value_str.substring(0, 1)
        value6 = value_str.substring(1, 2)
        value5 = value_str.substring(2, 3)
        value4 = value_str.substring(3, 4)
        value3 = value_str.substring(4, 5)
        value2 = value_str.substring(5, 6)
        value1 = value_str.substring(6, 7)
    }
    if (value_len == 8) {
        value8 = value_str.substring(0, 1)
        value7 = value_str.substring(1, 2)
        value6 = value_str.substring(2, 3)
        value5 = value_str.substring(3, 4)
        value4 = value_str.substring(4, 5)
        value3 = value_str.substring(5, 6)
        value2 = value_str.substring(6, 7)
        value1 = value_str.substring(7, 8)
    }
    if (value_len == 9) {
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
    if (value9 == 1) {
        output = output + "Non-Elemental "
    }
    if (value8 == 1) {
        output = output + "<Fire>"
    }
    if (value7 == 1) {
        output = output + "<Ice>"
    }
    if (value6 == 1) {
        output = output + "<Thunder>"
    }
    if (value5 == 1) {
        output = output + "<Wind>"
    }
    if (value4 == 1) {
        output = output + "<Earth>"
    }
    if (value3 == 1) {
        output = output + "<Water>"
    }
    if (value2 == 1) {
        output = output + "<Dark>"
    }
    if (value1 == 1) {
        output = output + "<Holy>"
    }
    if (value == 11111111) {
        output = "any"
    }
    if (value == 111111111) {
        output = "any"
    }
    return (
        output
    )
}
export default element_weakness