import React, {useState, useEffect } from 'react';
import GetCharGuides from '../passoff/GetCharGuides.js'

const CharacterPageCommunity = ({
    selected_char,
    CharGuideData,
}) => {

    return (
        <div className="singlepageholder">
            <GetCharGuides index={selected_char.CharID} CharGuideData={CharGuideData}/>
        </div>
        )
}
export default CharacterPageCommunity