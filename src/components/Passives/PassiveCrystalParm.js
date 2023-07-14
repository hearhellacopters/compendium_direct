import React from "react";
import Tippy from '../../components/TippyDefaults'
import CharacterFaceFormatting from '../Characters/CharacterFaceFormatting';
import ReplacerCharacter from "../ReplacerCharacter";
import { StartsInTimer } from "../../components/Timers";
import { LazyLoadComponent } from 'react-lazy-load-image-component';

export default function PassiveCrystalParm({
    passive,
    master_index,
    type,
    ver
}){

    const char_id = master_index.charid

    const ct = new Date().getTime();

    var rData = undefined
    if (ver == "JP") {
        const date_check = passive.start_date && new Date(`${passive.start_date.toString().replace(/ /, "T")}.000+09:00`);
        if (date_check && date_check.getTime() > ct) {
            rData = date_check
        }
    } else {
        const date_check2 = passive.start_date && new Date(`${passive.start_date.toString().replace(/ /, "T")}Z`);
        if (date_check2 && date_check2.getTime() > ct) {
            rData = date_check2
        }
    }

    return (
        <div key={passive.lc_id} className='buffunit'>
            <div className='infoholder' style={{ minHeight: `50px` }}>
                <LazyLoadComponent>
                    <div className="infotitleholder">
                        <div className='faceandiconholder'>
                            <CharacterFaceFormatting
                                char_id={char_id}
                                id={passive.chara_id}
                            />
                        </div>
                    </div>
                    <div className="Dbanner iconbuffer infonameholder nobuffpadding ">
                        <div className="spacearound">
                            <Tippy content="Scroll to top">
                                <div onClick={() => window.scrollTo(0, 0)} className="displayfex clicky">
                                    {ReplacerCharacter(`<${type == 6 ? "cl90" : "newstatus"}> `)}
                                </div>
                            </Tippy>
                            <div className="infotitle displayfex  ">
                                {passive.name}{` Lv${passive.level} - #${passive.cac_id}`}
                            </div>
                        </div>
                        <div className="displayfex ">
                            <div className="abilityJPname ">
                                {passive.jpname}{` Lv${passive.level} - #${passive.cac_id}`}
                            </div>
                            {passive.cp != 0 ?
                                <div className="CPReqHolder">
                                    <span className="unique">Req. </span>
                                    <span className="CPIcon CPIconSmaller" />
                                    <span> {passive.cp}</span>
                                </div>
                                : ""}
                        </div>
                        {rData != undefined ?
                            <StartsInTimer
                                expiryTimestamp={rData}
                                JPFlag={ver == "JP" ? true : false}
                            />
                            : ""}
                    </div>
                    <div className='Dbase infobase nobuffpadding'>
                        {passive.name}
                    </div>
                </LazyLoadComponent>
            </div>
        </div>
    )
}