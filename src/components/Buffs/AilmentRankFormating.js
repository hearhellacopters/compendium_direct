import React, {useState} from 'react';
import ReplacerCharacter from '../ReplacerCharacter';
import TippyDefaults from '../TippyDefaults'
import { ObjectView } from 'react-object-view'

export default function AilmentRankFormating ({
    ailment_rank,
    master_index,
    formatting
}) {

    const [showraw, setshowraw] = useState(false)

    const showmeraw = (current) => {
        if (current == false) {
            setshowraw(true)
        } else {
            setshowraw(false)
        }
    }

    const ailment_id = master_index.ailments

    const ailment_data = ailment_id[ailment_rank.ailment_id]

    const form = {formatting:formatting}

    return (
        <div className="buffunit">
            <div className="infoholder">
                <div className="blackbanner infonameholderenemybuff">
                    <div className="infotitle">
                    <TippyDefaults content="Click to show raw">
                        <div className="combotext clicky" onClick={() => showmeraw(showraw)}>
                            {ReplacerCharacter(`//${ailment_data && ailment_data.icon}// - ${ailment_data.name && ailment_data.name} - #${ailment_rank.ailment_id}`,form)}
                        </div>
                    </TippyDefaults>
                        {ailment_data.jpname == undefined || ailment_data.jpname == null ?
                            <div className="abilityJPname">
                                {"None テキストなし"}
                            </div>
                            : <div className="abilityJPname">
                                {ReplacerCharacter(ailment_data.jpname && ailment_data.jpname,form)}
                            </div>}
                        
                    </div>
                </div>
                <div className="blackbase infobase">
                    <div>Rank 1: {ailment_rank.very_small}</div>
                    <div>Rank 2: {ailment_rank.small}</div>
                    <div>Rank 3: {ailment_rank.medium}</div>
                    <div>Rank 4: {ailment_rank.large}</div>
                    <div>Rank 5: {ailment_rank.very_large}</div>
                    <div>Rank 6: {ailment_rank.reserve_1}</div>
                    <div>Rank 7: {ailment_rank.reserve_2}</div>
                    <div>Rank 8: {ailment_rank.reserve_3}</div>
                    <div>Rank 9: {ailment_rank.reserve_4}</div>
                    <div>Rank 10: {ailment_rank.reserve_5}</div>
                </div>
                {showraw == true ?
                    <span className='react-json-view'>
                    <ObjectView
                    options={
                        {
                        hideDataTypes: true,
                        expandLevel: 1
                        }
                    }
                    data={ailment_rank} />
                    </span>
                : ""}
            </div>
        </div>
    )
}