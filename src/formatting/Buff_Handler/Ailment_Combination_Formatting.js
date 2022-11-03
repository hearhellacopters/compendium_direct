import React, {useState, useEffect} from "react";
import replacer_title from '../../processing/replacer_titles'

const Ailment_Combination_Formatting = ({
    components
}) =>{

    const fullstr = components.fullstr

    
    return(
        <div>
            {fullstr!=""?
            replacer_title(fullstr)
            :""}
        </div>
    )
}
export default Ailment_Combination_Formatting