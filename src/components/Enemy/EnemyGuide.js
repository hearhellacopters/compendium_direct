import React from 'react';
import { useStateIfMounted } from 'use-state-if-mounted';
import DefaultTippy from '../../components/TippyDefaults.js';
import ReplacerEnemyDesc from '../../components/ReplacerEnemyDesc.js';
import OhNo from '../../components/OhNo.js'
import Random from '../../processing/random.js'

export default function EnemyGuide ({
    guide,
    showjp,
    toggle_jp
}){

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
                ReplacerEnemyDesc(guide.jp)
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
                ReplacerEnemyDesc(guide.trans)
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