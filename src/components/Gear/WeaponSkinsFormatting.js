import React from 'react';
import { LazyLoadImage, LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';
import ReplacerCharacter from '../ReplacerCharacter';

function WeaponSkinsFormatting({
    weapon_data,
    scrollPosition 
}){

    return (
        <div className="buffunit">
            <LazyLoadComponent
            scrollPosition={scrollPosition}
            placeholder={<div className="infoholder" style={{ minHeight: "170px" }}/>}
            >
            <div className="infoholder">
                <div className="geartoplevel">
                    <div className="gearimageholder centeralign">
                        <LazyLoadImage effect="opacity" className="gearimage" alt={weapon_data.name} src={`https://www.dissidiacompendium.com/images/static/characters/skins/${weapon_data.id}.png`} />
                    </div>
                </div>
                <div className='gearinfonameholder Nocolorbanner'>
                    <span className={`gear_butt ${weapon_data.weapon.toLowerCase()}button`}></span>
                    <div className="geartitletext">&nbsp;{weapon_data.name}</div>
                    <div className='abilityJPname'>{weapon_data.jpname}</div>
                    {ReplacerCharacter(`<skin> ${weapon_data.weapon}`)}
                </div>
            </div>
            </LazyLoadComponent>
        </div>
    )
}
export default trackWindowScroll(WeaponSkinsFormatting)