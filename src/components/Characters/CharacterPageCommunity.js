import React from 'react';
import CommunityCharacterGuideFormatting from './CharacterCommunityGuideFormatting.js'

export default function CharacterPageCommunity({
    selected_char,
    CharGuideData,
}){

    return (
        <div className="singlepageholder">
            <CommunityCharacterGuideFormatting index={selected_char.CharID} CharGuideData={CharGuideData} />
        </div>
    )
}