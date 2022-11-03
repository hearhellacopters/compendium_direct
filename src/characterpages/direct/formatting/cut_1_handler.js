const cut_1 = (cutype, value) =>{
    const len = value && value.toString().length 
    var valuepars = value == undefined ? 0 : value
    if(cutype == 1 ){

        if(len < 2){
            valuepars = 0
        } else {
            if(len == 2){
                valuepars = parseInt(value.toString().substring(0, 1));
            }
            if(len == 3){
                valuepars = parseInt(value.toString().substring(0, 2));
            }
            if(len == 4){
                valuepars = parseInt(value.toString().substring(0, 3));
            }
            if(len == 5){
                valuepars = parseInt(value.toString().substring(0, 4));
            }
            if(len == 6){
                valuepars = parseInt(value.toString().substring(0, 5));
            }
        }
    }
    if(cutype == 2){
        if(len < 1){
            valuepars = 0
        } else {
            if(len == 2){
                valuepars = parseInt(value.toString().substring(1, 2));
            }
            if(len == 3){
                valuepars = parseInt(value.toString().substring(2, 3));
            }
            if(len == 4){
                valuepars = parseInt(value.toString().substring(3, 4));
            }
            if(len == 5){
                valuepars = parseInt(value.toString().substring(4, 5));
            }
            if(len == 6){
                valuepars = parseInt(value.toString().substring(5, 6));
            }
        }
    }
    return valuepars
}

export default cut_1