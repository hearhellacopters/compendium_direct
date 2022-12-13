import React, { useState, useEffect } from 'react';
import replacer_title from '../processing/replacer_titles'
import Ailment_Data_Formatting from './Buff_Handler/Ailment_Data_Formating';

const EnemySingleBuffFormattingDirect = ({ match }) => {

    return (
        <div className={`bufflistbanner ${match.is_buff == 1 ? "Buffbase" : "Debuffbase"}`} >
            <div className={` ${match.is_buff == 1 ? "Buffsubbanner" : "Debuffsubbanner"}`}>
                {match.name && replacer_title(match.name)}{` #${match.id}`}
                {match.jpname == "" || match.jpname == undefined ?
                    <div className="abilityJPname">
                        {replacer_title(match.name)}
                    </div>
                    :
                    <div className="abilityJPname">
                        {match.jpname && replacer_title(match.jpname)}
                    </div>}
            </div>
            <Ailment_Data_Formatting ailment_data={match} />
        </div>
    )
}

export default EnemySingleBuffFormattingDirect;