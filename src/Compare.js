import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getMasterIndex } from './redux/ducks/master_index'
import { getGLCharacterAbilityNew } from './redux/ducks/GL/character_ability_new';
import { getJPCharacterAbilityNew } from './redux/ducks/JP/character_ability_new';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import Select from 'react-select';
import CharacterAbilityDifHandler from './components/Abilities/AbilityDifHandler';

const Compare = () => {

    const dispatch = useDispatch();

    const [compare, setcompare] = useState()
    const [hide, sethide] = useState(false);
    const [commands_loaded, setcommands_loaded] = useState(false);
    const [typeListArray, settypeListArray] = useState([])
    const [condFilter, setCondFilter] = useState("");
    const [condFilterdisplay, setcondFilterdisplay] = useState("");
    const [valuedisplay, setvaluedisplay] = useState("");
    const [valuedisplay2, setvaluedisplay2] = useState("");
    const [make_run, setmake_run] = useState(false);
    const [make_ability_run, setmake_ability_run] = useState(false);
    const [error, seterror] = useState();

    const [command_old, setcommand_old] = useState();
    const [command_new, setcommand_new] = useState();

    const [ver1, setver1] = useState("GL");
    const [ver2, setver2] = useState("JP");

    const hidebutton = () => {
        sethide((prevValue) => !prevValue);
    }

    const master_index = useSelector((state) =>
        state.master_index.master_index
    );

    useEffect(() => {
        let mounted = true
        if (mounted && master_index == undefined) {
            dispatch(getMasterIndex());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, master_index])

    const character_ability_new_gl = useSelector((state) =>
        state.character_ability_new_gl.character_ability_new_gl
    );

    useEffect(() => {
        let mounted = true
        if (mounted && compare == "Commands" && character_ability_new_gl == undefined) {
            dispatch(getGLCharacterAbilityNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, character_ability_new_gl, compare])

    const character_ability_new_jp = useSelector((state) =>
        state.character_ability_new_jp.character_ability_new_jp
    );

    useEffect(() => {
        let mounted = true
        if (mounted && compare == "Commands" && character_ability_new_jp == undefined) {
            dispatch(getJPCharacterAbilityNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, character_ability_new_jp, compare])

    useEffect(() => {
        if (character_ability_new_gl != undefined && character_ability_new_gl != undefined) {
            setcommands_loaded(true)
        }
    }, [character_ability_new_jp, character_ability_new_gl])

    useEffect(() => {
        if (master_index != undefined) {
            const typeListArrayList = Object.values(master_index.charid).sort((a, b) => b.CharID - a.CharID).map((typeListUnique) => ({
                value: typeListUnique.CharacterName,
                label: typeListUnique.CharacterName,
                id: typeListUnique.CharID,
            }));
            settypeListArray(typeListArrayList)
        }
    }, [master_index])

    const CondSelect = (e) => {
        if (e !== null) {
            setCondFilter(e.id);
            setcondFilterdisplay(e.value)
        } else {
            setCondFilter("");
            setcondFilterdisplay("")
        }
    };

    const changeend = (event) => {
        setvaluedisplay(event.target.value)
    }

    const clearSearchValue = () => {
        setvaluedisplay("")
    };

    const changeend2 = (event) => {
        setvaluedisplay2(event.target.value)
    }

    const clearSearchValue2 = () => {
        setvaluedisplay2("")
    };

    //commands grab
    useEffect(() => {
        if (make_run == true) {
            var get_command1 = []
            var get_command2 = []
            if (ver1 == "JP") {
                get_command1 = Object.values(character_ability_new_jp).filter(self => self.charaID == condFilter && self.LearningAbility == valuedisplay)
            }
            if (ver1 == "GL") {
                get_command1 = Object.values(character_ability_new_gl).filter(self => self.charaID == condFilter && self.LearningAbility == valuedisplay)
            }
            if (ver2 == "JP") {
                get_command2 = Object.values(character_ability_new_jp).filter(self => self.charaID == condFilter && self.LearningAbility == valuedisplay2)
            }
            if (ver2 == "GL") {
                get_command2 = Object.values(character_ability_new_gl).filter(self => self.charaID == condFilter && self.LearningAbility == valuedisplay2)
            }
            if (get_command1.length != 0 && get_command2 != 0) {
                setmake_ability_run(true)
                seterror()
                setcommand_old(get_command1[0])
                setcommand_new(get_command2[0])
                seterror("Found ids!")
            } else {
                setmake_ability_run(false)
                seterror("Could not find command ids")
                setmake_run(false)
            }
        }
    }, [make_run, ver1, ver2, character_ability_new_jp, character_ability_new_gl, condFilter, valuedisplay, valuedisplay2])

    const searchobjects = () => {
        if (valuedisplay != "" && valuedisplay2 != "") {
            seterror()
            setmake_run(true)
        } else {
            setmake_run(false)
            seterror("Please enter values")
        }
    }

    return (
        <div className="">
            <Helmet>
                <title>Compare - Dissidia Compendium Direct</title>
                <meta property="og:site_name" content="Dissidia Compendium" />
                <meta property="og:type" content="website" />
                <meta name="description" content="Diffing" />
                <meta name="twitter:title" content="Compendium Direct Compare Page." />
                <meta name="twitter:description" content="Compendium Direct Compare Page." />
                <meta name="twitter:image" content="https://direct.dissidiacompendium.com/images/static/site/logo152.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image:alt" content="Dissidia Direct Compendium" />
                <meta property="og:title" content="Compendium Direct Compare" />
                <meta property="og:description" content="Compendium Direct Compare Page." />
                <meta property="og:image" content="https://direct.dissidiacompendium.com/images/static/site/logo152.png" />
                <meta property="og:url" content="https://direct.dissidiacompendium.com/" />
            </Helmet>
            <div className="content">
                <h1>Compare</h1>
                <ul className="bannertabs">
                    <Link to={`/tools/notices`}>
                        <li className={""} >Notices</li>
                    </Link>
                    <Link to={`/tools/missions?JP=true&panels=true`}>
                        <li className={""} >MIssions</li>
                    </Link>
                    <Link to={`/tools/diffing`}>
                        <li className={""} >Diffing</li>
                    </Link>
                    <Link to={`/tools/trans`}>
                        <li className={""} >Trans</li>
                    </Link>
                    <Link to={`/tools/compare`}>
                        <li className={"active"} ><span className="gemselected" />Compare</li>
                    </Link>
                </ul>
                <div className="buffsholder">

                    {master_index == undefined ?
                        <h1><img className="loadingbardots" src={"/images/static/site/loading.gif"}></img></h1>
                        :
                        <div className="newmenu">
                            <div className="levelcontainerDev select-container" onClick={hidebutton}>
                                <div className="sub__control select-container-control">
                                    <div className="leveltext__value-container selectvalue-ValueContainer">
                                        <div className="leveltext__single-value selectvalue-singleValue">
                                            {compare == undefined ? "Compare Select" : compare}
                                        </div>
                                    </div>
                                    <div className="leveltext__indicators select-container-IndicatorsContainer">
                                        <span className="leveltext__indicator-separator indicator-separator-indicatorSeparator"></span>
                                        <div className="leveltext__indicator leveltext__dropdown-indicator dropdown-indicator-indicatorContainer" aria-hidden="true">
                                            <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="indicator-Svg">
                                                <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z">
                                                </path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                {hide == false ? "" :
                                    <div className="leveltext__menu2 menu_selector-list zindex999">
                                        <div className="typetext__menu-list menu_selector-MenuList">
                                            <div
                                                onClick={() => setcompare("Commands")}
                                                className={`typetext__option menu_option-MenuList ${compare == "Commands" ? "leveltext__option--is-selected" : ""}`}
                                            >
                                                Commands
                                            </div>
                                        </div>
                                        <div className="typetext__menu-list menu_selector-MenuList">
                                            <div
                                                onClick={() => setcompare("Passive Abilities")}
                                                className={`typetext__option menu_option-MenuList ${compare == "Passive Abilities" ? "leveltext__option--is-selected" : ""}`}
                                            >
                                                Passive Abilities
                                            </div>
                                        </div>
                                        <div className="typetext__menu-list menu_selector-MenuList">
                                            <div
                                                onClick={() => setcompare("Gear Passives")}
                                                className={`typetext__option menu_option-MenuList ${compare == "Gear Passives" ? "leveltext__option--is-selected" : ""}`}
                                            >
                                                Gear Passives
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                    {compare == "Commands" && commands_loaded == true ?
                        <div className=''>
                            <div className='filterholderflair'>
                                <div className='similarbanner'>Select Character</div>
                                {compare == "Commands" && commands_loaded == true ?
                                    <div className="typeholder">
                                        <Select
                                            defaultValue={condFilter != "" ? { value: condFilter, label: condFilterdisplay } : null}
                                            key={condFilter}
                                            isSearchable={true}
                                            placeholder="Character Select..."
                                            className='typecontainer'
                                            classNamePrefix="typetext"
                                            onChange={CondSelect}
                                            options={typeListArray}
                                            isClearable={true}
                                        />
                                    </div>
                                    : ""}
                                {compare == "Commands" && commands_loaded == true && condFilter != "" ?
                                    <>
                                        <div className='muliwrap'>
                                            <div className='makespace'>
                                                <div
                                                    onClick={() => ver1 == "GL" ? setver1("JP") : setver1("GL")}
                                                    className={`${ver1 == "GL" ? "ver_gl" : "ver_jp"} buffbutton clicky`}>
                                                </div>
                                                <div className="not_rangeholder">
                                                    Command Old
                                                    <div className="labelmax">
                                                        <input
                                                            className="not_numberbox"
                                                            placeholder="12345"
                                                            type="number"
                                                            id="search"
                                                            value={valuedisplay}
                                                            onChange={changeend}
                                                        >
                                                        </input>
                                                        {valuedisplay === "" ? "" :
                                                            <IoMdCloseCircleOutline onClick={clearSearchValue} className="clearsearch"></IoMdCloseCircleOutline>}
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='makespace'>
                                                <div
                                                    onClick={() => ver2 == "GL" ? setver2("JP") : setver2("GL")}
                                                    className={`${ver2 == "GL" ? "ver_gl" : "ver_jp"} buffbutton clicky`}>
                                                </div>
                                                <div className="not_rangeholder">
                                                    Command New
                                                    <div className="labelmax">
                                                        <input
                                                            className="not_numberbox"
                                                            placeholder="12345"
                                                            type="number"
                                                            id="search2"
                                                            value={valuedisplay2}
                                                            onChange={changeend2}
                                                        >
                                                        </input>
                                                        {valuedisplay2 === "" ? "" :
                                                            <IoMdCloseCircleOutline onClick={clearSearchValue2} className="clearsearch"></IoMdCloseCircleOutline>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="loadmore" onClick={searchobjects}>
                                            Search
                                        </div>
                                        {error != undefined ?
                                            error
                                            : ""}
                                    </>
                                    : ""}
                            </div>
                        </div>
                        :
                        compare == "Commands" ?
                            <>
                                <h1>
                                    <img className="loadingbardots" src={"/images/static/site/loading.gif"}></img>

                                </h1>
                                Please wait while both full GL and JP Ability data download
                            </>
                            : ""
                    }
                    {make_ability_run == true ?
                        <CharacterAbilityDifHandler
                            command_old={command_old}
                            ver_old={ver1}
                            command_new={command_new}
                            ver_new={ver2}
                            master_index={master_index}
                        />
                        : ""}
                </div>
            </div>
        </div>
    )
}
export default Compare