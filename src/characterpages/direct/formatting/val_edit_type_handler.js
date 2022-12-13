const val_edit_type = (val_edit_type, value) => {

    var valuepars = value

    const len = valuepars && valuepars.toString().length

    var holder = undefined

    if (val_edit_type == 1 && valuepars > 0) {
        valuepars = value - (value * 2)
    }
    if (val_edit_type == 2) {
        if (len <= 6) {
            valuepars = 0
        }
        if (len == 9) {
            valuepars = parseInt(value.toString().substring(0, 3));
        }
        if (len == 8) {
            valuepars = parseInt(value.toString().substring(0, 2));
        }
        if (len == 7) {
            valuepars = parseInt(value.toString().substring(0, 1));
        }
        if (isNaN(valuepars) == true) {
            valuepars = 0
        }
    }
    if (val_edit_type == 3) {
        if (len < 3) {
            valuepars = 0
        } else {
            if (len == 9) {
                valuepars = parseInt(value.toString().substring(3, len - 3));
            }
            if (len == 8) {
                valuepars = parseInt(value.toString().substring(2, len - 3));
            }
            if (len == 7) {
                valuepars = parseInt(value.toString().substring(1, len - 3));
            }
            if (len <= 6) {
                valuepars = parseInt(value.toString().substring(0, len - 3));
            }
        }
        if (isNaN(valuepars) == true) {
            valuepars = 0
        }
    }
    if (val_edit_type == 4) {
        if (len < 1) {
            valuepars = 0
        } else {
            if (len == 9) {
                valuepars = parseInt(value.toString().substring(6, len));
            }
            if (len == 8) {
                valuepars = parseInt(value.toString().substring(5, len));
            }
            if (len == 7) {
                valuepars = parseInt(value.toString().substring(4, len));
            }
            if (len == 6) {
                valuepars = parseInt(value.toString().substring(3, len));
            }
            if (len == 5) {
                valuepars = parseInt(value.toString().substring(2, len));
            }
            if (len == 4) {
                valuepars = parseInt(value.toString().substring(1, len));
            }
            if (len < 4) {
                valuepars = parseInt(value);
            }
        }
        if (isNaN(valuepars) == true) {
            valuepars = 0
        }
    }
    if (val_edit_type == 5) {
        if (len < 6) {
            valuepars = 0
        }
        if (len == 9) {
            holder = parseInt(value.toString().substring(0, 3));
            valuepars = holder - (holder * 2)
        }
        if (len == 8) {
            holder = parseInt(value.toString().substring(0, 2));
            valuepars = holder - (holder * 2)
        }
        if (len == 7) {
            holder = parseInt(value.toString().substring(0, 1));
            valuepars = holder - (holder * 2)
        }
        if (isNaN(valuepars) == true) {
            valuepars = 0
        }
    }
    if (val_edit_type == 6) {
        if (len < 3) {
            valuepars = 0
        } else {
            if (len == 9) {
                holder = parseInt(value.toString().substring(3, len - 3));
                valuepars = holder - (holder * 2)
            }
            if (len == 8) {
                holder = parseInt(value.toString().substring(2, len - 3));
                valuepars = holder - (holder * 2)
            }
            if (len == 7) {
                holder = parseInt(value.toString().substring(1, len - 3));
                valuepars = holder - (holder * 2)
            }
            if (len <= 6) {
                holder = parseInt(value.toString().substring(0, len - 3));
                valuepars = holder - (holder * 2)
            }
        }
        if (isNaN(valuepars) == true) {
            valuepars = 0
        }
    }
    if (val_edit_type == 7) {
        if (len < 1) {
            valuepars = 0
        } else {
            if (len == 9) {
                holder = parseInt(value.toString().substring(6, len));
                valuepars = holder - (holder * 2)
            }
            if (len == 8) {
                holder = parseInt(value.toString().substring(5, len));
                valuepars = holder - (holder * 2)
            }
            if (len == 7) {
                holder = parseInt(value.toString().substring(4, len));
                valuepars = holder - (holder * 2)
            }
            if (len == 6) {
                holder = parseInt(value.toString().substring(3, len));
                valuepars = holder - (holder * 2)
            }
            if (len == 5) {
                holder = parseInt(value.toString().substring(2, len));
                valuepars = holder - (holder * 2)
            }
            if (len == 4) {
                holder = parseInt(value.toString().substring(1, len));
                valuepars = holder - (holder * 2)
            }
            if (len < 4) {
                holder = parseInt(value);
                valuepars = holder - (holder * 2)
            }
        }
        if (isNaN(valuepars) == true) {
            valuepars = 0
        }
    }

    return (
        valuepars
    )
}
export default val_edit_type