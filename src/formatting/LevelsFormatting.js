import React, { useState } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { Link } from 'react-router-dom'
import './EnemyFormatting.css'
import './LevelsFormatting.css'
import DefaultTippy from '../formatting/TippyDefaults';

const LevelsFormatting = ({ match, setlevel, stats, alllevels, battle_enemy_id, enemy_id, chase }) => {

    const [flash, setflash] = useStateIfMounted("");

    const [hide, sethide] = useState(false);

    const hidebutton = () => {
        sethide((prevValue) => !prevValue);
    }

    const setFlashandhide = () => {
        let mounted = true
        sethide((prevValue) => !prevValue);
        setflash("flash");
        if (mounted) {
            setTimeout(() => setflash(""), 1000);
        }
    }

    return (
        <div>
            {enemy_id == undefined || enemy_id == "" ?
                "No Stats Found" :
                <div className="stattag">
                    <div className="stattag">
                        <div className="lefttagholder"></div>
                        <div className="statcenter">LEVEL
                            {setlevel === false ?
                                <DefaultTippy content={<span>Displays possible levels<br />Check game for level needed<br />Lufenia: 200s<br />Lufenia+: 250s<br />Dimension / Shinryu: 300</span>}>
                                    <span className="greenbutton">i</span>
                                </DefaultTippy>
                                : ""}
                        </div>
                        <div className="righttagholder"></div>
                    </div>
                    {setlevel !== true ?
                        <div className="levelcontainer select-container" onClick={hidebutton}>
                            <div className="leveltext__control select-container-control">
                                <div className="leveltext__value-container selectvalue-ValueContainer">
                                    <div className="leveltext__single-value selectvalue-singleValue">
                                        {match.params.level != "undefined" ? match.params.level : "No Data"}
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
                                <div className="leveltext__menu menu_selector-list">
                                    <div className="typetext__menu-list menu_selector-MenuList">
                                        {alllevels && alllevels.map(level => (
                                            <Link className="selectorlinks" onClick={hidebutton} key={level.data_index} to={`/bestiary/enemies/${battle_enemy_id}/${level.data_index}`}>
                                                <div className={`typetext__option menu_option-MenuList ${level.data_index == match.params.level ? "leveltext__option--is-selected" : ""}`} onClick={setFlashandhide}>
                                                    {level.data_index}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            }
                        </div> :
                        <div className="enemystatsvalue">{stats && stats.data_index}</div>}
                </div>
            }

            <div className="enemystatsholder">
                <div className="primeenemystats">
                    <div className="stattags">
                        <div className="stattag">
                            <div className="lefttagholder"></div>
                            <div className="statcenter">HP</div>
                            <div className="righttagholder"></div>
                        </div>
                        <div className="stattag">
                            <div className="lefttagholder"></div>
                            <div className="statcenter">INT BRV</div>
                            <div className="righttagholder"></div>
                        </div>
                        <div className="stattag">
                            <div className="lefttagholder"></div>
                            <div className="statcenter">MAX BRV</div>
                            <div className="righttagholder"></div>
                        </div>
                        <div className="stattag">
                            <div className="lefttagholder"></div>
                            <div className="statcenter">ATK</div>
                            <div className="righttagholder"></div>
                        </div>
                        <div className="stattag">
                            <div className="lefttagholder"></div>
                            <div className="statcenter">DEF</div>
                            <div className="righttagholder"></div>
                        </div>
                        <div className="stattag">
                            <div className="lefttagholder"></div>
                            <div className="statcenter">SPD</div>
                            <div className="righttagholder"></div>
                        </div>
                    </div>
                    <div className="statvalueholders">
                        <div className={`enemystatsvalue ${flash ? flash : ""}`}>
                            {stats && stats.max_hp_.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </div>
                        <div className={`enemystatsvalue ${flash ? flash : ""}`}>
                            {stats && stats.initial_brv_.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </div>
                        <div className={`enemystatsvalue ${flash ? flash : ""}`}>
                            {stats && stats.max_brv_.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </div>
                        <div className={`enemystatsvalue ${flash ? flash : ""}`}>
                            {stats && stats.atk_.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </div>
                        <div className={`enemystatsvalue ${flash ? flash : ""}`}>
                            {stats && stats.def_.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </div>
                        <div className={`enemystatsvalue ${flash ? flash : ""}`}>
                            {stats && stats.speed_.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </div>
                    </div>
                </div>
                <div className="secondaryholder">
                    <div className="secondaryholdertag">
                        <DefaultTippy content={<span>Knockback<br />Defence</span>}>
                            <img alt="launch" className="launchimg" src="https://dissidiacompendium.com/images/static/icons/misc/Launch.png" />
                        </DefaultTippy>
                        {chase}
                    </div>
                    <div className="secondaryholdertag">
                        <div className="enemyexpholder"><img className="EXP" alt="EXP" src="https://dissidiacompendium.com/images/static/icons/misc/EXP.png" /></div>
                        <span className={`${flash}`} >{stats && stats.exp_}</span>
                    </div>
                    <div className="secondaryholdertag">
                        <div className="enemyexpholder"><img alt="Gill" className="gillimg" src="https://dissidiacompendium.com/images/static/icons/misc/Gold.png" /></div>
                        <span className={`${flash}`} >{stats && stats.money_}</span>
                    </div>
                </div>
                <div className="ensubholder">
                    {setlevel === false ? <span className="subtextstats">*displays highest possible stats first</span> : ""}
                </div>
            </div>
        </div>
    )
}
export default LevelsFormatting;