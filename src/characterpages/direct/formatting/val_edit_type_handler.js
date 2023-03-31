const val_edit_type = (val_edit_type, value) => {

    var valuepars = value

    if (val_edit_type == 1 && valuepars > 0) {
        valuepars = -value
    }
    switch (val_edit_type) {
        case 2:
            //left 3 digits
            valuepars = Math.floor((value % 1000000000) / 1000000) 
            break;
        case 3:
            //middle 3 digits
            valuepars = Math.floor((value % 1000000) / 1000) 
            break
        case 4:
            //right 3 digits
            valuepars = Math.floor(value % 1000)
            break  
        case 5:
            //negitive left 3 digits
            valuepars = -Math.floor((value % 1000000000) / 1000000) 
            break;
        case 6:
            //negitive middle 3 digits
            valuepars = -Math.floor((value % 1000000) / 1000) 
            break
        case 7:
            //negitive right 3 digits
            valuepars = -Math.floor(value % 1000)
            break  
        default:
            break;
    }
    return (
        valuepars
    )
}
export default val_edit_type