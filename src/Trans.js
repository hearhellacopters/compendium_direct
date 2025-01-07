
import React, { useState, useEffect, useCallback } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import format_cleaner from './processing/format_cleaner'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import translater from './processing/translater_characters';
import translater_enemy from './processing/translater_enemy';
import { useDispatch, useSelector } from "react-redux";
import { getTransNames } from './redux/ducks/transnames';
import translate from './processing/translate';
import Tippy from './components/TippyDefaults'

export default function Trans () {

    const dispatch = useDispatch();

    const transnames = useSelector((state) =>
        state.transnames.transnames
    );

    const [EnemyTrans, setEnemyTrans] = useStateIfMounted();
    const [EnemyToggle, setEnemyToggle] = useState(false);
    const [CharTrans, setCharTrans] = useStateIfMounted();
    const [CharToggle, setCharToggle] = useState(false);
    const [enemyrun, setenemyrun] = useState(false);
    const [googleTrans, setgoogleTrans] = useStateIfMounted(false);
    const [googleText, setgoogleText] = useStateIfMounted();
    const [googleTransText, setgoogleTransText] = useStateIfMounted();
    const [useApp,setuseApp] = useStateIfMounted();

    useEffect(() => {
        if(googleTrans == true && googleText != undefined){
            translate(googleText,{from: 'ja', to: 'en', app: useApp}).then((res)=>{
                setgoogleTransText(res)
            })
            setgoogleTrans(false)
        }
        // eslint-disable-next-line
    }, [googleTrans]);  

    useEffect(() => {
        let mounted = true
        if (mounted && transnames == undefined) {
            dispatch(getTransNames());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, transnames]);

    useEffect(() => {
        if (transnames != undefined && CharToggle == true) {
            const text = format_cleaner(CharTrans).replace(/\\n/gm, "\x0A")
            const translate = translater(text, transnames)
            setCharTrans(translate)
        }
    }, [setCharTrans, transnames, CharToggle, CharTrans]);

    useEffect(() => {
        if (transnames != undefined && EnemyToggle == true && enemyrun == true) {
            const text = format_cleaner(EnemyTrans)
            const translate = translater_enemy(text, transnames)
            setEnemyTrans(translate)
            setenemyrun(false)
        }
    }, [setEnemyTrans, transnames, EnemyToggle, EnemyTrans, enemyrun]);

    const handleChangeChar = (e) => {
        setCharTrans(e.target.value)
    }

    const handleKeyDownChar = (event) => {
        if (event.key === 'Enter') {
            if (event.target.value != "") {
                setCharTrans(event.target.value);
                setCharToggle(true);
            }
        }
    }

    const handleChangeEnemy = (e) => {
        setEnemyTrans(e.target.value)
        setenemyrun(true)
    }

    const handleKeyDownEnemy = (event) => {
        if (event.key === 'Enter') {
            if (event.target.value != "") {
                setEnemyTrans(event.target.value);
                setEnemyToggle(true);
                setenemyrun(true)
            }
        }
    }

    const handleCharButton = () => {
        if (CharTrans != undefined) {
            setCharToggle((prevValue) => !prevValue);
        }
    }

    const handleEnemyButton = () => {
        if (EnemyTrans != undefined) {
            setEnemyToggle((prevValue) => !prevValue);
        }
    }

    const handleGoogleButton = () => {
        if (googleText != undefined) {
            setgoogleTrans((prevValue) => !prevValue);
        }
    }

    const handleChangeGoogle = (e) => {
        setgoogleText(e.target.value)
    }

    const handleKeyDownGoogle = (event) => {
        if (event.key === 'Enter') {
            if (event.target.value != "") {
                setgoogleText(event.target.value);
                setgoogleTrans(true);
            }
        }
    }

    const togglemerge = () => {
        setuseApp((prevValue) => !prevValue);
    }

    return (
        <div className="">
            <Helmet>
                <title>Translations - Dissidia Compendium Direct</title>
                <meta property="og:site_name" content="Dissidia Compendium" />
                <meta property="og:type" content="website" />
                <meta name="description" content="Diffing" />
                <meta name="twitter:title" content="Compendium Direct Diffing Page." />
                <meta name="twitter:description" content="Compendium Direct Diffing Page." />
                <meta name="twitter:image" content="https://dissidiacompendium.com/images/static/site/logo152.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image:alt" content="Dissidia Direct Compendium" />
                <meta property="og:title" content="Compendium Direct Diffing" />
                <meta property="og:description" content="Compendium Direct Diffing Page." />
                <meta property="og:image" content="https://dissidiacompendium.com/images/static/site/logo152.png" />
                <meta property="og:url" content="https://direct.dissidiacompendium.com/" />
            </Helmet>
            <div className="content">
                <h1>Translations</h1>

                <ul className="bannertabs">
                    {
                    //<Link to={`/tools/notices`}>
                    //    <li className={""} >Notices</li>
                    //</Link>
                    //<Link to={`/tools/missions?JP=true&panels=true`}>
                    //    <li className={""} >Missions</li>
                    //</Link>
                    }
                    <Link to={`/tools/diffing`}>
                        <li className={""} >Diffing</li>
                    </Link>
                    <Link to={`/tools/trans`}>
                        <li className={"active"} ><span className="gemselected" />Trans</li>
                    </Link>
                    {
                    //<Link to={`/tools/compare`}>
                    //    <li className={""} >Compare</li>
                    //</Link>
                    }
                </ul>
                <div className="buffsholder">
                    <div className="lastupdate">Text Trans</div>
                    <div className="diffholder">
                        <textarea
                            className="diffbox"
                            type="text"
                            placeholder="Character Text"
                            onChange={handleChangeChar}
                            onKeyDown={handleKeyDownChar}>
                        </textarea>
                        <textarea
                            className="diffbox"
                            type="text"
                            placeholder="Enemy Text"
                            onChange={handleChangeEnemy}
                            onKeyDown={handleKeyDownEnemy}>
                        </textarea>
                    </div>
                    <div className="diffholder">
                        <div className="chq-atc--button margauto" onClick={handleCharButton}>Trans</div>
                        <div className="chq-atc--button margauto" onClick={handleEnemyButton}>Trans</div>
                    </div>
                    <div className="diffholder">
                        <div className="bluebase introflex diffbox">
                            {CharTrans != undefined && CharToggle == true ?
                                CharTrans.split(/\n/gm).map((value, i) =>
                                    <div key={i}>
                                        {value}<br></br>
                                    </div>
                                )
                                : <div style={{ textAlign: "center" }}>Run a Char Trans</div>}
                        </div>
                        <div className="bluebase introflex diffbox">
                            {EnemyTrans != undefined && EnemyToggle == true ?
                                EnemyTrans.split(/\n/gm).map((value, i) =>
                                    <div key={i}>
                                        {value}<br></br>
                                    </div>
                                )
                                : <div style={{ textAlign: "center" }}>Run a Enemy Trans</div>}
                        </div>
                    </div>
                    <div className="lastupdate">Google Translate</div>
                    <div className="margeholder">
                        <div className="Merge">
                            <Tippy content="CORs must be enabled to run">
                                <label htmlFor='search' className="MergeText">
                                <a className='unique' rel="noreferrer noopener" href="https://cors-anywhere.herokuapp.com/corsdemo" target="_blank">
                                    CORs App?
                                </a>
                                </label>
                            </Tippy>
                            <div key="mergecheck1" className={`${useApp == true ? "nodisplay" : `uncheck`}`} onClick={togglemerge} />
                            <div key="mergecheck2" className={`${useApp == true ? "check" : `nodisplay`}`} onClick={togglemerge} />
                        </div>
                    </div>
                    <div className="diffholder">
                        <textarea
                            className="diffbox"
                            type="text"
                            placeholder="Google Translate"
                            onChange={handleChangeGoogle}
                            onKeyDown={handleKeyDownGoogle}>
                        </textarea>
                    </div>
                    <div className="diffholder">
                        <div className="chq-atc--button margauto" onClick={handleGoogleButton}>Trans</div>
                    </div>
                    <div className="diffholder">
                        <div className="bluebase introflex diffbox">
                        {googleTransText != undefined ?
                                googleTransText
                                
                                : <div style={{ textAlign: "center" }}>Google Translate</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}