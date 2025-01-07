import React, { useState, useEffect } from 'react';
import DefaultTippy from '../TippyDefaults';
import { ObjectView } from 'react-object-view'
import HitDataParsFormatting from './HitDataParsFormatting';
import hitdata_trans from '../../processing/abilities/hitdata_trans';

const Hit_Data_Standalone = ({
    hit_data,
    master_index,
    ver,
    formatting
}) => {

    const [showraw, setshowraw] = useState(false)

    const showmeraw = (current) => {
        if (current == false) {
            setshowraw(true)
        } else {
            setshowraw(false)
        }
    }

    const hit_data_pars = hitdata_trans(
        hit_data,

        master_index,
        ver,

        undefined,
        undefined,
        undefined,
        undefined,

        undefined,
        undefined,
        undefined,
        undefined,
        1
    )

    return (
        <div className="buffunit">
            <div className="infoholder">
                <div className="Buffbanner infonameholderenemybuff">
                    <div className="spacearound"  >
                        <DefaultTippy content="Click to show raw">
                            <div className="infotitle displayfex clicky" onClick={() => showmeraw(showraw)}>
                                {`#${hit_data.hitdata_id}`}
                            </div>
                        </DefaultTippy>
                    </div>
                </div>
                <div className="Buffbase infobase">
                    <HitDataParsFormatting
                        hit_data={hit_data_pars}
                        formatting={formatting}
                    />
                    {showraw == true ?
                        <span className='react-json-view'>
                        <ObjectView
                        options={
                            {
                            hideDataTypes: true,
                            expandLevel: 1
                            }
                        }
                        data={hit_data} />
                        </span>
                        : ""}
                </div>
            </div>
        </div>
    )
}
export default Hit_Data_Standalone