import React from "react";
import Tippy from '../../formatting/TippyDefaults'
import Char_Face_Maker from './formatting/Char_Face_Maker';
import { EndsInTimer, StartsInTimer } from '../../formatting/Timers'

const Link_Parm = ({
    passive,
    master_index,
    tag_overide,
    ver
}) => {

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
            <div className='infoholder'>
                <div className="infotitleholder">
                    <div className='faceandiconholder'>
                        <Char_Face_Maker
                            char_id={char_id}
                            id={passive.chara_id}
                        />
                    </div>
                </div>
                <div className="Dbanner iconbuffer infonameholder nobuffpadding ">
                    <div className="spacearound">
                        <Tippy content="Scroll to top">
                            <div onClick={() => window.scrollTo(0, 0)} className="displayfex clicky">
                                <span className={tag_overide != undefined ? tag_overide : passive.rank_tag}>
                                </span>&nbsp;
                            </div>
                        </Tippy>
                        <div className="displayfex  ">
                            {passive.name}{` Lv${passive.link_level} - #${passive.link_id}`}
                        </div>
                        <div className="CPReqHolder">
                            <span className="unique">Cost </span>
                            <span className="BoardPointIcon CPIconSmaller" />
                            <span>
                                {passive.need_point}
                            </span>
                        </div>
                    </div>
                    <div className="displayfex ">
                        <div className="abilityJPname ">
                            {passive.jpname}{` Lv${passive.link_level} - #${passive.link_id}`}
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
            </div>
        </div>
    )
}
export default Link_Parm
