import React, {useState, useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import DefaultTippy from '../../formatting/TippyDefaults';
import addformatting from '../../processing/replacer_titles';
import ReactJson from '@microlink/react-json-view'

const Character_Profile = ({
    data,
    ver
}) =>{

    const [showraw,setshowraw] = useStateIfMounted(false)

    const showmeraw = (e)=>{
        if(e.shiftKey){
            if(showraw == false){
            setshowraw(true)
            } else{
                setshowraw(false)
            }
        }
    }

    const charactershortname = data.name && data.name.toString().replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"")

    const [currentartwork, setcurrentartwork] = useStateIfMounted(1)
    const [artworkcount, setartworkcount ] = useStateIfMounted(data.ArtworkCount)
    const [artwork,setartwork] = useStateIfMounted(`https://dissidiacompendium.com/images/static/characters/${data.name && data.name.toString().replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"")}/c1.png`)

    useEffect(()=>{
        setartwork(`https://dissidiacompendium.com/images/static/characters/${data.name && data.name.toString().replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"")}/c1.png`)
        setartworkcount(data.ArtworkCount)
        setcurrentartwork(1)
        // eslint-disable-next-line
    },[data])

    const handleartworkchange = () =>{
        if(currentartwork != artworkcount){
            setcurrentartwork((prevValue) => prevValue + 1);
        }
        if(currentartwork == artworkcount){
            setcurrentartwork(1)
        }
    }
    if(JSON.stringify(data) == "{}"){
        return(
            <div className='nonenemyholder enemyholderstyling'>
            No Data
            </div>
        )
    } else {
        return(
            <div className="characterpageholder">
                    <div className="introclassflex">
                    <div className="charimagetoptopholder">
                        <div className={`chartopimageholder charbackground${data.CrystalColor}`}>
                        <DefaultTippy content={data.WeaponName}>
                            <img onClick={showmeraw}  className="charweapon" alt="Weapon" src={data.WeaponURL == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : `https://dissidiacompendium.com/images/static/icons/weapon/Icon_${data.WeaponURL}`}/>
                        </DefaultTippy>
                        <DefaultTippy content={data.CrystalColor}>
                        <img  className="charCystal" alt="Crystal" src={data.CrystalColor == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : `https://dissidiacompendium.com/images/static/icons/crystalcolors/Crystal${data.CrystalColor}_1.png`}/>
                        </DefaultTippy>
                    <ul className="bufftypes sidemain">
                        <DefaultTippy content={`Realm ${data.Realm}`}>
                        <img className="classdisplay filterinactive" alt={data.Realm} src={data.Realm  == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : `https://dissidiacompendium.com/images/static/icons/realms/name/${data.Realm}.png`}></img>
                        </DefaultTippy>
                    </ul>
                    {data.features != undefined ? 
                    <ul className="bufftypes sideclass">
                        {data.features.map(self=>(
                            <DefaultTippy key={self.id}  content={addformatting(self.label)}>
                            <li className={`Feature${self.id} classdisplay filterinactive`}></li>
                            </DefaultTippy>
                        ))}
                    </ul>
                    : ``}
                        {data.ArtworkCount > 1 ?
                        <img onClick={handleartworkchange} className="charalts clicky" alt="Stats" src={"https://dissidiacompendium.com/images/static/icons/misc/Costume2.png"}/>
                        :""}
                        <img className="charstats" alt="Stats" src={"https://dissidiacompendium.com/images/static/icons/stats/star/back.png"}/>
                        <img className="charstats" alt="Stats" src={`https://dissidiacompendium.com/images/static/icons/stats/star/HP-${data.HP}.png`}/>
                        <img className="charstats" alt="Stats" src={`https://dissidiacompendium.com/images/static/icons/stats/star/INTBRV-${data.INTBRV}.png`}/>
                        <img className="charstats" alt="Stats" src={`https://dissidiacompendium.com/images/static/icons/stats/star/MAXBRV-${data.MAXBRV}.png`}/>
                        <img className="charstats" alt="Stats" src={`https://dissidiacompendium.com/images/static/icons/stats/star/ATK-${data.ATK}.png`}/>
                        <img className="charstats" alt="Stats" src={`https://dissidiacompendium.com/images/static/icons/stats/star/DEF-${data.DEF}.png`}/>
                        <img className="charstats" alt="Stats" src={`https://dissidiacompendium.com/images/static/icons/stats/star/SPD-${data.SPD}.png`}/>
                        <img className="charmanimage" alt={data.name} src={`https://dissidiacompendium.com/images/static/characters/${charactershortname}/c${currentartwork}.png`}/>
                        <div className="spherestop">
                            <div className={`sphereletter ${data.SphereSlotLocked == 1 ? "lockedslot" : "unlockedslot"}`}>
                            <img className='inletter' src={data.Sphere1 == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : `https://dissidiacompendium.com/images/static/icons/spheres/SphereLetter${data.Sphere1}.png`} alt={data.Sphere1}/>
                            </div>
                            <div className={`sphereletter ${data.SphereSlotLocked == 2 ? "lockedslot" : "unlockedslot"}`}>
                            <img className='inletter' src={ data.Sphere2 == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : `https://dissidiacompendium.com/images/static/icons/spheres/SphereLetter${data.Sphere2}.png`} alt={data.Sphere2}/>
                            </div>
                            <div className={`sphereletter ${data.SphereSlotLocked == 3 ? "lockedslot" : "unlockedslot"}`}>
                            <img className='inletter' src={ data.Sphere3 == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : `https://dissidiacompendium.com/images/static/icons/spheres/SphereLetter${data.Sphere3}.png`} alt={data.Sphere3}/>
                            </div>
                        </div>
                        </div>
                    </div>
                    <ul className="smallclass classcolor noselect">
                        <div className="subpassiveflair spacearound ">
                        &nbsp;Classes
                        </div>
                        <DefaultTippy content={`Realm ${data.Realm}`}>
                        <img className="classdisplay filterinactive" alt={data.Realm} src={data.Realm  == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : `https://dissidiacompendium.com/images/static/icons/realms/name/${data.Realm}.png`}></img>
                        </DefaultTippy>
                        {data.features != undefined ? 
                            data.features.map(self=>(
                                <DefaultTippy key={self.id} content={addformatting(self.label)}>
                                <li className={`Feature${self.id} classdisplay filterinactive`}></li>
                                </DefaultTippy>
                            ))
                        : ``}
                    </ul>
                    <div className="brevityholder">
                         <div className={`brevcell Abase`}>
                            <div className="subpassiveflair spacearound ">
                                &nbsp;Intro
                            </div>
                            {data.chara_introduction && addformatting(data.chara_introduction.replace(/\n/gm,""))}
                        </div>
                    </div>
                 </div> 
                 {showraw == true?
                        <ReactJson iconStyle={"square"} quotesOnKeys={false} name={"Raw"} displayDataTypes={false} collapsed={false} theme={"threezerotwofour"} src={data}/>
                        :""}             
                 </div>
        )
    }
    
}
export default Character_Profile