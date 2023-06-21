export default function require_element_other(value){
    var output = ""
    if(typeof value == "number"){
       var value9 = Math.floor((value % 1000000000) / 100000000) //100000000 Non-Ele    
       var value8 = Math.floor((value % 100000000) / 10000000)   //010000000 Fire       
       var value7 = Math.floor((value % 10000000) / 1000000)     //001000000 Ice        
       var value6 = Math.floor((value % 1000000) / 100000)       //000100000 Thunder    
       var value5 = Math.floor((value % 100000) / 10000)         //000010000 Wind       
       var value4 = Math.floor((value % 10000) / 1000)           //000001000 Earth      
       var value3 = Math.floor((value % 1000) / 100)             //000000100 Water      
       var value2 = Math.floor((value % 100) / 10)               //000000010 Dark       
       var value1 = Math.floor(value % 10)                       //000000001 Holy       
    }
    if (value9 == 0) {
        output = output + "Non-Elemental "
    }
    if (value1 == 0) {
        output = output + "<Holy>"
    }
    if (value2 == 0) {
        output = output + "<Dark>"
    }
    if (value3 == 0) {
        output = output + "<Water>"
    }
    if (value4 == 0) {
        output = output + "<Earth>"
    }
    if (value5 == 0) {
        output = output + "<Wind>"
    }
    if (value6 == 0) {
        output = output + "<Thunder>"
    }
    if (value7 == 0) {
        output = output + "<Ice>"
    }
    if (value8 == 0) {
        output = output + "<Fire>"
    }
    if (value == 111111111) {
        output = "none"
    }
    return (
        output
    )
}