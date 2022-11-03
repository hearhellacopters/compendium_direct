import React, {useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import { setFalse, setTrue } from '../redux/ducks/jptoggle'
import addformatting from '../processing/replacer_abilitycontent';
import addformatting_buff from '../processing/replacer_buffcontent';
import Tippy from '../formatting/TippyDefaults.js';
import { getQuery, getQueryStringVal, useQueryParam } from '../processing/urlparams'

const SingleBuffFormatting = ({match, full, jptoggledata, bstate, gear }) => {

    const dispatch = useDispatch();

    const [showGLToggle, setShowGLToggle] = useState(false);

    const [JPsearch, setJPSearch] = useQueryParam("JP", "");

    useEffect(() => {
        if(match.JPFlag == true){
            setShowGLToggle(jptoggledata)
        } else {
            setShowGLToggle(false)
        }
    }, [jptoggledata,match.JPFlag])

    const handletoggle = (showGLToggle) =>{
        if(JPsearch == false){
            setJPSearch("true")
            dispatch(setTrue())
        } else {
            setJPSearch("")
            dispatch(setFalse())
        }
        setShowGLToggle((prevValue) => !prevValue)
    }

    const replacer=(e)=>{
        var newtext = e&&e.replace(/&/gm,"%26")
        return newtext
    }

    return(
        <div>
            {match.JPFlag ? 
                <div className={`${full == true ? "forcedtoggleforbuffabilities" : "toggleforbuffabilities"}`} id="GLtoggle">
                    <Tippy content={showGLToggle ? "JP Current" : "GL Current"} className="tooltip" placement="bottom" hideOnClick={false}>
                        <div className={showGLToggle ? "switch switchchecked": "switch switchunchecked"}  onClick={() => handletoggle(showGLToggle)}>
                            <div className={showGLToggle ? "slider sliderchecked": "slider sliderunchecked" } >
                            </div>
                    </div>
                    </Tippy>
                </div>
            : 
            ""
            }
        <div className={`${gear == true ? "gear": ""}bufflistbanner${bstate == true? "battle":""} ${full == true ? "fullnow" : ""} ${match.BuffType == "Buff" ? "Buffbase" : "Debuffbase"}`} >
            <div className={` ${match.BuffType == "Buff" ? "Buffsubbanner" : "Debuffsubbanner"}`}>
            {match.BuffNameDisplay && addformatting(match.BuffNameDisplay)}
            {match.JPName && 
            <div className="abilityJPname">
                {match.JPName && addformatting(match.JPName)}
            </div>}
            </div>
            {match.BuffFlag == "FRBuff" && match.BuffName && match.BuffName.search("(F)") != -1 ?
                    <div className="buffglreworkbanner">
                        <Link className="updatelink" to={`/characters/forcetime?Char=${replacer(match.CharacterName)}`}>
                            View Force Time
                        </Link>
                    </div>
                    :""}
            {showGLToggle == false && match.JPFlag == true ? 
                addformatting_buff("From " + match.BuffIcon + "\n" + match.BuffDescGL == undefined ? "" : " "+ match.BuffDescGL) :
                addformatting_buff("From " + match.BuffIcon + "\n" + match.BuffDesc == undefined ? "" : " "+ match.BuffDesc)}
        </div>
        </div>
    )
}

export default SingleBuffFormatting;