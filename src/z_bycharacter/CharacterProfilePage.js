import React, { useState, useEffect } from 'react';
import DefaultTippy from '../components/TippyDefaults.js'
import BrevityProfile from '../components/Characters/CharacterDirectBrevityProfile.js';
import { ObjectView } from 'react-object-view'
import addformatting from '../components/ReplacerCharacter.js';
import ailment_tags from '../processing/ailment/ailment_tags.json'

export default function CharacterProfile ({
    data,
    ver,
    access
}) {

    const [showraw, setshowraw] = useState(false)

    const showmeraw = (current) => {
        if (current == false) {
            setshowraw(true)
        } else {
            setshowraw(false)
        }
    }

    const charactershortname = data.name && data.name.toString().replace(/ /g, "").replace(/,/g, "").replace(/'/g, "").replace(/&/g, "")

    const [currentartwork, setcurrentartwork] = useState(1)
    const [artworkcount, setartworkcount] = useState(data.ArtworkCount)
    const [artwork, setartwork] = useState(`/images/static/characters/${data.name && data.name.toString().replace(/ /g, "").replace(/,/g, "").replace(/'/g, "").replace(/&/g, "")}/c1.png`)

    useEffect(() => {
        setartwork(`/images/static/characters/${data.name && data.name.toString().replace(/ /g, "").replace(/,/g, "").replace(/'/g, "").replace(/&/g, "")}/c1.png`)
        setartworkcount(data.ArtworkCount)
        setcurrentartwork(1)
    }, [data])

    const handleartworkchange = () => {
        if (currentartwork != artworkcount) {
            setcurrentartwork((prevValue) => prevValue + 1);
        }
        if (currentartwork == artworkcount) {
            setcurrentartwork(1)
        }
    }
    if (JSON.stringify(data) == "{}") {
        return (
            <div className='ultimaweaponitemholder'>
                No Data
            </div>
        )
    } else {
        return (
            <div className="characterpageholder">
                <div className="introclassflex">
                    <div className="charimagetoptopholder">
                        <div className={`chartopimageholder charbackground${data.CrystalColor}`}>
                            <DefaultTippy content={data.WeaponName}>
                                <img className="charweapon" alt="Weapon" src={data.WeaponURL == undefined ? "/images/static/icons/misc/Unknown_icon.png" : `/images/static/icons/weapon/Icon_${data.WeaponURL}`} />
                            </DefaultTippy>
                            <DefaultTippy content={data.CrystalColor}>
                                <img className="charCystal" alt="Crystal" src={data.CrystalColor == undefined ? "/images/static/icons/misc/Unknown_icon.png" : `/images/static/icons/crystalcolors/Crystal${data.CrystalColor}_1.png`} />
                            </DefaultTippy>
                            <ul className="bufftypes sidemain">
                                <DefaultTippy content={`Realm ${data.Realm}`}>
                                    <img className="classdisplay filterinactive" alt={data.Realm} src={data.Realm == undefined ? "/images/static/icons/misc/Unknown_icon.png" : `/images/static/icons/realms/name/${data.Realm}.png`}></img>
                                </DefaultTippy>
                            </ul>
                            {data.features != undefined ?
                                <ul className="bufftypes sideclass">
                                    {data.features.map(self => (
                                        <DefaultTippy key={self.id} content={addformatting(self.label)}>
                                            <li className={`Feature${self.id} classdisplay filterinactive`}></li>
                                        </DefaultTippy>
                                    ))}
                                </ul>
                                : ``}
                            {data.ArtworkCount > 1 ?
                                <img onClick={handleartworkchange} className="charalts clicky" alt="Stats" src={"/images/static/icons/misc/Costume2.png"} />
                                : ""}
                            <img className="charstats" alt="Stats" src={"/images/static/icons/stats/star/back.png"} />
                            <img className="charstats" alt="Stats" src={`/images/static/icons/stats/star/HP-${data.HP}.png`} />
                            <img className="charstats" alt="Stats" src={`/images/static/icons/stats/star/INTBRV-${data.INTBRV}.png`} />
                            <img className="charstats" alt="Stats" src={`/images/static/icons/stats/star/MAXBRV-${data.MAXBRV}.png`} />
                            <img className="charstats" alt="Stats" src={`/images/static/icons/stats/star/ATK-${data.ATK}.png`} />
                            <img className="charstats" alt="Stats" src={`/images/static/icons/stats/star/DEF-${data.DEF}.png`} />
                            <img className="charstats" alt="Stats" src={`/images/static/icons/stats/star/SPD-${data.SPD}.png`} />
                            <img className="charmanimage" alt={data.name} src={`/images/static/characters/${charactershortname}/c${currentartwork}.png`} />
                            <div className="spherestop">
                                <div className={`sphereletter ${data.SphereSlotLocked == 1 ? "lockedslot" : "unlockedslot"}`}>
                                    <img className='inletter' src={data.Sphere1 == undefined ? "/images/static/icons/misc/Unknown_icon.png" : `/images/static/icons/spheres/SphereLetter${data.Sphere1}.png`} alt={data.Sphere1} />
                                </div>
                                <div className={`sphereletter ${data.SphereSlotLocked == 2 ? "lockedslot" : "unlockedslot"}`}>
                                    <img className='inletter' src={data.Sphere2 == undefined ? "/images/static/icons/misc/Unknown_icon.png" : `/images/static/icons/spheres/SphereLetter${data.Sphere2}.png`} alt={data.Sphere2} />
                                </div>
                                <div className={`sphereletter ${data.SphereSlotLocked == 3 ? "lockedslot" : "unlockedslot"}`}>
                                    <img className='inletter' src={data.Sphere3 == undefined ? "/images/static/icons/misc/Unknown_icon.png" : `/images/static/icons/spheres/SphereLetter${data.Sphere3}.png`} alt={data.Sphere3} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="smallclass classcolor noselect">
                        <div className="subpassiveflair spacearound ">
                            &nbsp;Offical Classes
                        </div>
                        <DefaultTippy content={`Realm ${data.Realm}`}>
                            <img className="classdisplay filterinactive" alt={data.Realm} src={data.Realm == undefined ? "/images/static/icons/misc/Unknown_icon.png" : `/images/static/icons/realms/name/${data.Realm}.png`}></img>
                        </DefaultTippy>
                        {data.features != undefined ?
                            data.features.map(self => (
                                <DefaultTippy key={self.id} content={addformatting(self.label)}>
                                    <li className={`Feature${self.id} classdisplay filterinactive`}></li>
                                </DefaultTippy>
                            ))
                            : ``}
                    </ul>
                    <BrevityProfile
                        match={data}
                        asset={currentartwork}
                        ver={ver}
                    />
                </div>
                <ul className='classcolor introflex'>
                    <div className="subpassiveflair spacearound ">
                        &nbsp;Class Debug
                    </div>
                    {Object.keys(ailment_tags).map((key, i) => {
                        if (access[`${ver}traits`] && access[`${ver}traits`][key] == true) {
                            return (<DefaultTippy key={`${key}-1`} content={ailment_tags[key].name}>
                                <li
                                    className="classdisplay filterinactive"
                                    style={{
                                        backgroundSize: "contain",
                                        backgroundImage: `url(/images/static/icons/${ailment_tags[key].url}.png)`
                                    }}
                                >
                                </li>
                            </DefaultTippy>
                            )
                        }

                    }
                    )}
                    <div className="subpassiveflair spacearound ">
                        &nbsp;Aura Class Debug
                    </div>
                    {Object.keys(ailment_tags).map((key, i) => {
                        if (access[`${ver}traits`] && access[`${ver}traits`][`${key}_Party`] == true) {
                            return (<DefaultTippy key={`${key}-2`} content={`${ailment_tags[key].name} Party Aura`}>
                                <li
                                    className="classdisplay filterinactive"
                                    style={{
                                        backgroundSize: "contain",
                                        backgroundImage: `url(/images/static/icons/${ailment_tags[key].url}.png)`
                                    }}
                                >
                                </li>
                            </DefaultTippy>
                            )
                        }
                    }
                    )}
                </ul>
                <div className="introcolor introflex">
                    <div className="subpassiveflair spacearound ">
                        &nbsp;Intro
                    </div>
                    {data.chara_introduction && data.chara_introduction.split(/\n/gm).map((value, i) =>
                        <div key={i}>
                            {value}<br></br>
                        </div>)}
                    {showraw == false ?
                        <div className="unique clicky" onClick={() => showmeraw(showraw)}>
                            - Show Raw -
                        </div>
                        :
                        <div className="unique clicky" onClick={() => showmeraw(showraw)}>
                            - Hide Raw -
                        </div>
                    }
                </div>
                {showraw == true ?
                    <span className='react-json-view'>
                    <ObjectView  
                    options={
                        {
                          hideDataTypes: true,
                          expandLevel: 1,
                          displayEntriesMaxCount: 1,
                        }
                    }
                    data={access} 
                    />
                    </span>
                    : ""}
                {showraw == true ?
                    <span className='react-json-view'>
                    <ObjectView
                    options={
                        {
                        hideDataTypes: true,
                        expandLevel: 1
                        }
                    }
                    theme={"threezerotwofour"} 
                    data={data} 
                    />
                    </span>
                    : ""}
            </div>
        )
    }

}