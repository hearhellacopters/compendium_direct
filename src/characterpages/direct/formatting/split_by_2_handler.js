const split_by_2 = (cutype, value) => {
    const len = value && value.toString().length
    var valuepars = value == undefined ? 0 : value
    if (cutype < 0) {
        valuepars = parseInt(value.toString().substring(0, (len+cutype)));
    }
    if (cutype == 1) {
        if (len < 8) {
            valuepars = 0
        } else {
            valuepars = parseInt(value.toString().substring(0, 1));
        }
    }
    if (cutype == 2) {
        if (len < 7) {
            valuepars = 0
        } else {
            if (len == 9) {
                valuepars = parseInt(value.toString().substring(1, 3));
            }
            if (len == 8) {
                valuepars = parseInt(value.toString().substring(0, 2));
            }
            if (len == 7) {
                valuepars = parseInt(value.toString().substring(0, 1));
            }
        }
    }
    if (cutype == 3) {
        if (len < 5) {
            valuepars = 0
        } else {
            if (len == 9) {
                valuepars = parseInt(value.toString().substring(3, 5));
            }
            if (len == 8) {
                valuepars = parseInt(value.toString().substring(2, 4));
            }
            if (len == 7) {
                valuepars = parseInt(value.toString().substring(1, 3));
            }
            if (len == 6) {
                valuepars = parseInt(value.toString().substring(0, 2));
            }
            if (len == 5) {
                valuepars = parseInt(value.toString().substring(0, 1));
            }
        }
    }
    if (cutype == 4) {
        if (len < 3) {
            valuepars = 0
        } else {
            if (len == 9) {
                valuepars = parseInt(value.toString().substring(5, 7));
            }
            if (len == 8) {
                valuepars = parseInt(value.toString().substring(4, 6));
            }
            if (len == 7) {
                valuepars = parseInt(value.toString().substring(3, 5));
            }
            if (len == 6) {
                valuepars = parseInt(value.toString().substring(2, 4));
            }
            if (len == 5) {
                valuepars = parseInt(value.toString().substring(1, 3));
            }
            if (len == 4) {
                valuepars = parseInt(value.toString().substring(0, 2));
            }
            if (len == 3) {
                valuepars = parseInt(value.toString().substring(0, 1));
            }
        }
    }
    if (cutype == 5) {
        if (len < 1) {
            valuepars = 0
        } else {
            if (len == 9) {
                valuepars = parseInt(value.toString().substring(7, 9));
            }
            if (len == 8) {
                valuepars = parseInt(value.toString().substring(6, 8));
            }
            if (len == 7) {
                valuepars = parseInt(value.toString().substring(5, 7));
            }
            if (len == 6) {
                valuepars = parseInt(value.toString().substring(4, 6));
            }
            if (len == 5) {
                valuepars = parseInt(value.toString().substring(3, 5));
            }
            if (len == 4) {
                valuepars = parseInt(value.toString().substring(2, 4));
            }
            if (len == 3) {
                valuepars = parseInt(value.toString().substring(1, 3));
            }
            if (len == 2) {
                valuepars = parseInt(value.toString().substring(0, 2));
            }
            if (len == 1) {
                valuepars = parseInt(value.toString().substring(0, 1));
            }
        }
    }
    return valuepars
}

export default split_by_2