import require_trans from "../passives/require_trans";

export default function cond_data_trans (
    cond_file,
    ver,
    master_index
) {
    var require_ = ""
    var require__1 = ""

    if (cond_file.require_id != undefined) {
        require_ = require_trans(
            cond_file.require_id,
            cond_file.require_target,
            cond_file.require_value1,
            cond_file.require_value2,
            cond_file.require_value3,

            master_index,
            ver
        )
    }

    if (cond_file.require_id_1 != undefined) {
        require__1 = require_trans(
            cond_file.require_id_1,
            cond_file.require_target_1,
            cond_file.require_value1_1,
            cond_file.require_value2_1,
            cond_file.require_value3_1,

            master_index,
            ver
        )
    }

    const final_str = `${require_ != "" ? `${require_}${require__1 == "" ? "" : ""}` : ""}${require__1 != "" && require_ != "" ? " and " : ""}${require__1 != "" ? `${require__1}` : ""}`

    return final_str
}