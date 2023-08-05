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

export default function require_element_weakness(value, and_or, flag){
    if(flag == 0 && value == 111111111){
        return "none"
    } else
    if (flag == 1 && value == 11111111) {
        return "any"
    } else
    if (flag == 1 && value == 111111111) {
        return "any"
    }
    var output = []
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
    } else{
        return value
    }
    if (value9 == flag) {
        output.push("Non-Elemental")
    }
    if (value8 == flag) {
        output.push("<Fire>")
    }
    if (value7 == flag) {
        output.push("<Ice>")
    }
    if (value6 == flag) {
        output.push("<Thunder>")
    }
    if (value5 == flag) {
        output.push("<Wind>")
    }
    if (value4 == flag) {
        output.push("<Earth>")
    }
    if (value3 == flag) {
        output.push("<Water>")
    }
    if (value2 == flag) {
        output.push("<Dark>")
    }
    if (value1 == flag) {
        output.push("<Holy>")
    }
    return (
        joinWith(output,and_or)
    )
}