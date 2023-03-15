import React, { useEffect, useState } from 'react';
import { useStateIfMounted } from 'use-state-if-mounted';
import DefaultTippy from './TippyDefaults.js';
import addformatting from '../processing/replacer_enemydesc';
import OhNo from '../characterpages/OhNo.js'
import Random from '../processing/Random.js'

const EnemyGuide = ({
    guide,
    showjp,
    toggle_jp
})=>{

    const [random] = useStateIfMounted(Random(7));

    return(
        <>
            {toggle_jp == undefined?"":
            <DefaultTippy content="Change text">
                <div className={showjp ? "switch switchchecked" : "switch switchunchecked"} onClick={toggle_jp}>
                    <div className={showjp ? "slider sliderchecked" : "slider sliderunchecked"} ></div>
                </div>
            </DefaultTippy>
            }
            {guide == undefined?
                <OhNo
                    random={random}
                    message1={"No results found"}
                />
            :
                <>
                {showjp != undefined && showjp == true && guide.jp != undefined?
                addformatting(guide.jp)
                :
                    showjp == false || showjp == undefined?
                    ""
                    :
                    <OhNo
                        random={random}
                        message={"for JP text"}
                    />
                }
                {(showjp == undefined || showjp == false) && guide.trans != undefined?
                addformatting(guide.trans)
                :
                    showjp == true || showjp == undefined?
                    ""
                    :
                    <OhNo
                        random={random}
                        message={"for GL text"}
                    />
                }
                </>
            }
        </>
    )
}

export default EnemyGuide