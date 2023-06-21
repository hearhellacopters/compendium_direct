import React from 'react';
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';

export default function WeaponSkinsFormatting({
    weapon_data
}){

    return (
        <div className="buffunit">
            <div className="infoholder" style={{ minHeight: "170px" }}>
                <LazyLoadComponent>
                    <div className="geartoplevel">
                        <div className="gearimageholder centeralign">
                            <LazyLoadImage effect="opacity" className="gearimage" alt={weapon_data.name} src={`https://www.dissidiacompendium.com/images/static/characters/skins/${weapon_data.id}.png`} />
                        </div>
                    </div>
                    <div className='gearinfonameholder Nocolorbanner'>
                        <span className={`gear_butt  ${weapon_data.weapon.toLowerCase()}button`}></span>
                        <div className="geartitletext">&nbsp;{weapon_data.name}</div>
                        <div className='abilityJPname'>{weapon_data.jpname}</div>
                        <div className='skinbutton undertag'></div>
                        {weapon_data.weapon}
                    </div>
                </LazyLoadComponent>
            </div>
        </div>
    )
}