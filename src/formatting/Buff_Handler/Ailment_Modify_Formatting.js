import React, { useState, useEffect } from 'react';
import replacer_title from '../../processing/replacer_titles'

const Ailment_Modify_Formatting = ({
    modify
}) => {

    const full_req_str = modify.full_req_str

    const modify_type_str = modify.modify_type_str

    return (
        <div>
            {replacer_title(`\xa0┬ ${full_req_str}`)}
            {modify_type_str != "" ?
                <br />
                : ""}
            {modify_type_str != "" ? replacer_title(`\xa0└─ ${modify_type_str}`) : ""}
        </div>
    )

}
export default Ailment_Modify_Formatting