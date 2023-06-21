export default function passive_element_weakness(value){
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