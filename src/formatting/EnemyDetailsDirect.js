import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useStateIfMounted } from 'use-state-if-mounted';
import '../Bestiary.css'
import '../formatting/EnemyFormatting.css'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import ResistIcon from './ResistIcons.js';
import DefaultTippy from './TippyDefaults.js';
import DevSwitch from '../redux/DevSwitch';
import axios from "axios";
import Ailment_Data_Formatting from './Buff_Handler/Ailment_Data_Formating';
import replace_title from '../processing/replacer_titles'
import EnemyForceGauge from './EnemyForceGauge';
import CharFaceFormatting from './CharFaceFormatting'
import { getLevels } from '../redux/ducks/levels';
import EnemyDetailsLevelHanlder from './EnemyDetailsLevelHandler';
import EnemyAbilities_MasterListDirectDetails from './EnemyAbilities_MasterListDirectDetails';
import EnemyAbilities_MasterListDirectDetailsHandler from './EnemyAbilities_MasterListDirectDetailsHandler';
import addformatting from '../processing/replacer_enemydesc';
import roles from '../characterpages/direct/formatting/command_ability/ailment_tags.json'
import Tippy from './TippyDefaults.js';
import EnemyGuide from './EnemyGuide';

const EnemyDetailsDirect = ({ match, ProcessedCharacters, PartnerCharacters, jptoggledata }) => {

    const [columns, setcolumns] = useStateIfMounted(`${window.innerWidth == undefined ? 2 : window.innerWidth > 799 ? 3 : window.innerWidth > 349 ? 2 : 1}`)
    const [ran, setran] = useStateIfMounted(false)
    const [set_helpers, setset_helpers] = useStateIfMounted([])
    const [set_chars, setset_chars] = useStateIfMounted(match.CharArray)
    const [helpers, sethelpers] = useStateIfMounted([])

    const [ForcetimeTab, setForcetimeTab] = useStateIfMounted(0);

    const ForceTimeSelect = (number) => {
        if (ran == true) {
            setForcetimeTab(number)
            setran(false)
        }
    }

    const ForceTimeSelect2 = (number) => {
        if(ForcetimeTab != number){
            setgetGuide(undefined)
        }
        if (number != undefined) {
            setForcetimeTab(number)
        }
    }

    const cmp = function (a, b) {
        if (a > b) return +1;
        if (a < b) return -1;
        return 0;
    }

    const column_helper = function (normal, length) {
        var returner = normal
        if (length >= 7) {
            returner = 3
        }
        if (length < 7) {
            returner = 2
        }
        if (length < 3) {
            returner = 1
        }
        if (returner >= normal) {
            return normal
        } else {
            return returner
        }
    }

    const dispatch = useDispatch();

    const ProcessedLevels = useSelector((state) =>
        state.levels.levels
    );

    const [showhelpers, setshowhelpers] = useStateIfMounted(false)

    const [ShowDesc, setShowDesc] = useStateIfMounted(true);
    const [ShowAbilities, setShowAbilities] = useStateIfMounted(true);
    const [ShowStats, setShowStats] = useStateIfMounted(true);
    const [ShowCast, setShowCast] = useStateIfMounted(false);
    const [ShowSummons, setShowSummons] = useStateIfMounted(false);
    const [ShowOrb, setShowOrb] = useStateIfMounted(false);
    const [ShowForce, setShowForce] = useStateIfMounted(false);
    const [ShowGraphic, setShowGraphic] = useStateIfMounted(false);
    const [ShowGuide, setShowGuide] = useStateIfMounted(false);

    const [activeDesc, setactiveDesc] = useStateIfMounted(false);
    const [activeAbilities, setactiveAbilities] = useStateIfMounted(false);
    const [activeStats, setactiveStats] = useStateIfMounted(false);
    const [activeCast, setactiveCast] = useStateIfMounted(false);
    const [activeSummons, setactiveSummons] = useStateIfMounted(false);
    const [activeOrb, setactiveOrb] = useStateIfMounted(false);
    const [activeForce, setactiveForce] = useStateIfMounted(false);
    const [activeGraphic, setactiveGraphic] = useStateIfMounted(false);
    const [activeGuide, setactiveGuide] = useStateIfMounted(false);

    const [getDesc, setgetDesc] = useStateIfMounted();
    const [getAbilities, setgetAbilities] = useStateIfMounted();
    const [getStats, setgetStats] = useStateIfMounted();
    const [getCast, setgetCast] = useStateIfMounted();
    const [getSummons, setgetSummons] = useStateIfMounted();
    const [getOrb, setgetOrb] = useStateIfMounted();
    const [getForce, setgetForce] = useStateIfMounted();
    const [getGraphic, setgetGraphic] = useStateIfMounted();
    const [getGuide, setgetGuide] = useStateIfMounted();

    useEffect(() => {
        if (ran == true) {
            setran(false)
        }
        // eslint-disable-next-line 
    }, [jptoggledata])

    useEffect(() => {
        const ver = jptoggledata == true ? "JP" : "GL"
        const helper_holder = {}
        if (activeOrb == true || activeForce == true) {
            if (ran == false) {
                var helpers_str = []
                if (match.ForceGauge != undefined) {
                    if (match.ForceGauge[ForcetimeTab].RoleTag != undefined) {
                        helpers_str = match.ForceGauge[ForcetimeTab].RoleTag.split(" ")
                    }
                    if (match.ForceGauge[ForcetimeTab].CharArray != undefined) {
                        match.ForceGauge[ForcetimeTab].CharArray.map(self => {
                            const single = ProcessedCharacters[self.CharID] && ProcessedCharacters[self.CharID]
                            if (helper_holder[self.CharID] == undefined) {
                                Object.assign(helper_holder, {
                                    [self.CharID]: {
                                        GLOrder: single.GLOrder,
                                        RealmPars: single.RealmPars,
                                        Sort: single.Sort,
                                        ShortName: single.ShortName,
                                        CharacterFaceURL: `https://dissidiacompendium.com/images/static/characters/${single.CharacterURLName}/face.png`,
                                        CharacterName: single.CharacterName,
                                        CharID: self.CharID,
                                        CrystalColor: self.CrystalColor,
                                        roles: ["Enemy"]
                                    }
                                })
                            } else {
                                var new_set = new Set(helper_holder[self.CharID].roles)
                                new_set.add("Enemy")
                                const holder = []
                                new_set.forEach(self => { holder.push(self) })
                                Object.assign(helper_holder[self.CharID], { roles: holder })
                            }
                        })
                    }
                    if (match.ForceGauge[ForcetimeTab].ForceCond1 != undefined) {
                        const charType = {}
                        match.ForceGauge[ForcetimeTab].ForceCond1.split(" ").forEach(self => {
                            Object.assign(charType, { [self]: true })
                        })
                        const filtermerge = Object.values(ProcessedCharacters).filter((oneChar) => {
                            return Object.entries(charType)
                                .filter(entry => entry[1])
                                .every(([key, value]) => oneChar[`${ver}traits`] && oneChar[`${ver}traits`][`FRtraits`] && oneChar[`${ver}traits`][`FRtraits`][key] === value);
                        });
                        filtermerge.map(self3 => {
                            if (helper_holder[self3.CharID] == undefined) {
                                Object.assign(helper_holder, {
                                    [self3.CharID]: {
                                        GLOrder: self3.GLOrder,
                                        RealmPars: self3.RealmPars,
                                        Sort: self3.Sort,
                                        ShortName: self3.ShortName,
                                        CharacterFaceURL: `https://dissidiacompendium.com/images/static/characters/${self3.CharacterURLName}/face.png`,
                                        CharacterName: self3.CharacterName,
                                        CharID: self3.CharID,
                                        CrystalColor: self3.CrystalColor,
                                        roles: ["Force_Enemy"]
                                    }
                                })
                            } else {
                                var new_set = new Set(helper_holder[self3.CharID].roles)
                                new_set.add("Force_Enemy")
                                const holder = []
                                new_set.forEach(self => { holder.push(self) })
                                Object.assign(helper_holder[self3.CharID], { roles: holder })
                            }
                        })
                    }
                    if (match.ForceGauge[ForcetimeTab].ForceCond2 != undefined) {
                        const charType = {}
                        match.ForceGauge[ForcetimeTab].ForceCond2.split(" ").forEach(self => {
                            Object.assign(charType, { [self]: true })
                        })
                        const filtermerge = Object.values(ProcessedCharacters).filter((oneChar) => {
                            return Object.entries(charType)
                                .filter(entry => entry[1])
                                .every(([key, value]) => oneChar[`${ver}traits`] && oneChar[`${ver}traits`][`FRtraits`] && oneChar[`${ver}traits`][`FRtraits`][key] === value);
                        });
                        filtermerge.map(self3 => {
                            if (helper_holder[self3.CharID] == undefined) {
                                Object.assign(helper_holder, {
                                    [self3.CharID]: {
                                        GLOrder: self3.GLOrder,
                                        RealmPars: self3.RealmPars,
                                        Sort: self3.Sort,
                                        ShortName: self3.ShortName,
                                        CharacterFaceURL: `https://dissidiacompendium.com/images/static/characters/${self3.CharacterURLName}/face.png`,
                                        CharacterName: self3.CharacterName,
                                        CharID: self3.CharID,
                                        CrystalColor: self3.CrystalColor,
                                        roles: ["Force_Enemy"]
                                    }
                                })
                            } else {
                                var new_set = new Set(helper_holder[self3.CharID].roles)
                                new_set.add("Force_Enemy")
                                const holder = []
                                new_set.forEach(self => { holder.push(self) })
                                Object.assign(helper_holder[self3.CharID], { roles: holder })
                            }
                        })
                    }
                } else if (match && match.RoleTag != undefined) {
                    helpers_str = match.RoleTag && match.RoleTag.split(" ")
                }
                sethelpers([])
                helpers_str.map(self => {
                    const helper_pull = Object.values(ProcessedCharacters).filter(function (ef) {
                        return ef[`${ver}traits`] && ef[`${ver}traits`][`${self}`] == true;
                    });

                    helper_pull.map(self3 => {
                        if (helper_holder[self3.CharID] == undefined) {
                            Object.assign(helper_holder, {
                                [self3.CharID]: {
                                    GLOrder: self3.GLOrder,
                                    RealmPars: self3.RealmPars,
                                    Sort: self3.Sort,
                                    ShortName: self3.ShortName,
                                    CharacterFaceURL: `https://dissidiacompendium.com/images/static/characters/${self3.CharacterURLName}/face.png`,
                                    CharacterName: self3.CharacterName,
                                    CharID: self3.CharID,
                                    CrystalColor: self3.CrystalColor,
                                    roles: [self]
                                }
                            })
                        } else {
                            var new_set = new Set(helper_holder[self3.CharID].roles)
                            new_set.add(self)
                            const holder = []
                            new_set.forEach(self => { holder.push(self) })
                            Object.assign(helper_holder[self3.CharID], { roles: holder })
                        }
                    })
                })
                set_chars && set_chars.map(self => {
                    const single = ProcessedCharacters[self.CharID] && ProcessedCharacters[self.CharID]
                    if (helper_holder[self.CharID] == undefined) {
                        Object.assign(helper_holder, {
                            [self.CharID]: {
                                GLOrder: single.GLOrder,
                                RealmPars: single.RealmPars,
                                Sort: single.Sort,
                                ShortName: single.ShortName,
                                CharacterFaceURL: `https://dissidiacompendium.com/images/static/characters/${single.CharacterURLName}/face.png`,
                                CharacterName: single.CharacterName,
                                CharID: self.CharID,
                                CrystalColor: single.CrystalColor,
                                roles: ["Enemy"]
                            }
                        })
                    } else {
                        var new_set = new Set(helper_holder[self.CharID].roles)
                        new_set.add("Enemy")
                        const holder = []
                        new_set.forEach(self => { holder.push(self) })
                        Object.assign(helper_holder[self.CharID], { roles: holder })
                    }
                })

                const final_arry = Object.values(helper_holder).sort((a, b) => cmp(a.RealmPars, b.RealmPars) || cmp(a.Sort, b.Sort))
                setran(true)
                sethelpers(final_arry)
                setcolumns(`${window.innerWidth == undefined ? column_helper(2, final_arry.length) : window.innerWidth > 799 ? column_helper(3, final_arry.length) : window.innerWidth > 349 ? column_helper(2, final_arry.length) : column_helper(1, final_arry.length)}`)
            }
        }
    }, [ran, activeForce, activeOrb, match, ForcetimeTab, jptoggledata, ProcessedCharacters, set_helpers, set_chars, sethelpers, setran, setcolumns])

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedLevels == undefined && activeStats == true) {
            dispatch(getLevels())
        }
        if (mounted && ProcessedLevels == undefined && activeAbilities == true) {
            dispatch(getLevels())
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedLevels, activeStats, activeAbilities]);


    useEffect(() => {
        if (match.OrbFlag == true) {
            setShowOrb(true)
        }
        if (match.Casts == true) {
            setShowCast(true)
        }
        if (match.Summon == true) {
            setShowSummons(true)
        }
        if (match.ShinryuFlag == true) {
            setShowForce(true)
        }
        if (match.Infographic != undefined) {
            setShowGraphic(true)
        }
        if (match.QuestIDs != undefined) {
            setShowGuide(true)
        }
    }, [match, setShowOrb, setShowCast, setShowSummons, setShowForce, setShowGraphic, setShowGuide])

    useEffect(() => {
        //desc
        if (DevSwitch == true && activeDesc == true && getDesc == undefined) {
            axios.get(`http://localhost:3001/data/enemies_desc/${match.battle_enemy_id}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setgetDesc(response)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == false && activeDesc == true && getDesc == undefined) {
            axios.get(`https://www.dissidiacompendium.com/data/enemies_desc/${match.battle_enemy_id}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setgetDesc(response)
            }).catch(function (err) {
                console.log(err)
            })
        }
        //casts
        if (DevSwitch == true && activeCast == true && getCast == undefined) {
            axios.get(`http://localhost:3001/data/enemies_casts/${match.battle_enemy_id}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setgetCast(response)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == false && activeCast == true && getCast == undefined) {
            axios.get(`https://www.dissidiacompendium.com/data/enemies_casts/${match.battle_enemy_id}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setgetCast(response)
            }).catch(function (err) {
                console.log(err)
            })
        }
        //force
        if (DevSwitch == true && activeForce == true && getForce == undefined) {
            axios.get(`http://localhost:3001/data/enemies_force/${match.battle_enemy_id}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setgetForce(response)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == false && activeForce == true && getForce == undefined) {
            axios.get(`https://www.dissidiacompendium.com/data/enemies_force/${match.battle_enemy_id}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setgetForce(response)
            }).catch(function (err) {
                console.log(err)
            })
        }
        //Graphic
        if (DevSwitch == true && activeGraphic == true && getGraphic == undefined) {
            axios.get(`http://localhost:3001/data/enemies_info/${match.battle_enemy_id}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setgetGraphic(response)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == false && activeGraphic == true && getGraphic == undefined) {
            axios.get(`https://www.dissidiacompendium.com/data/enemies_info/${match.battle_enemy_id}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setgetGraphic(response)
            }).catch(function (err) {
                console.log(err)
            })
        }
        //Orb
        if (DevSwitch == true && activeOrb == true && getOrb == undefined) {
            axios.get(`http://localhost:3001/data/enemies_orb/${match.battle_enemy_id}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setgetOrb(response)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == false && activeOrb == true && getOrb == undefined) {
            axios.get(`https://www.dissidiacompendium.com/data/enemies_orb/${match.battle_enemy_id}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setgetOrb(response)
            }).catch(function (err) {
                console.log(err)
            })
        }
        //Summons
        if (DevSwitch == true && activeSummons == true && getSummons == undefined) {
            axios.get(`http://localhost:3001/data/enemies_summons/${match.battle_enemy_id}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setgetSummons(response)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == false && activeSummons == true && getSummons == undefined) {
            axios.get(`https://www.dissidiacompendium.com/data/enemies_summons/${match.battle_enemy_id}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setgetSummons(response)
            }).catch(function (err) {
                console.log(err)
            })
        }
        //Levels
        if (DevSwitch == true && activeStats == true && getStats == undefined) {
            axios.get(`http://localhost:3001/data/enemies_level/${match.battle_enemy_id}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setgetStats(response)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == false && activeStats == true && getStats == undefined) {
            axios.get(`https://www.dissidiacompendium.com/data/enemies_level/${match.battle_enemy_id}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setgetStats(response)
            }).catch(function (err) {
                console.log(err)
            })
        }
        //Abilities
        if (activeAbilities == true && getAbilities == undefined && ProcessedLevels != undefined) {
            const filtered = ProcessedLevels.filter(self => self.enemyID == match.enemy_id).reverse()
            if (filtered.length == 0) {
                setgetAbilities([])
            } else {
                setgetAbilities(filtered)
            }
        }
        //guide
        if (DevSwitch == true && activeGuide == true && getGuide == undefined) {
            axios.get(`http://localhost:3001/data/enemies_guide/${match.QuestIDs[ForcetimeTab]}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setgetGuide(response)
            }).catch(function (err) {
                console.log(err)
                setgetGuide({})
            })
        }
        if (DevSwitch == false && activeGuide == true && getGuide == undefined) {
            axios.get(`https://www.dissidiacompendium.com/data/enemies_guide/${match.QuestIDs[ForcetimeTab]}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setgetGuide(response)
            }).catch(function (err) {
                console.log(err)
                setgetGuide({})
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match, activeDesc, activeCast, activeForce, activeOrb, activeGraphic, activeSummons, activeStats, activeGuide, ProcessedLevels, activeAbilities, ForcetimeTab])

    const descbutton = () => {
        if (activeDesc == true) {
            setactiveDesc(false)
        } else {
            setactiveDesc(true)
        }
        setactiveAbilities(false)
        setactiveStats(false)
        setactiveCast(false)
        setactiveSummons(false)
        setactiveOrb(false)
        setactiveForce(false)
        setactiveGraphic(false)
        setactiveGuide(false)
    }

    const abilitiesbutton = () => {
        setactiveDesc(false)
        if (activeAbilities == true) {
            setactiveAbilities(false)
        } else {
            setactiveAbilities(true)
        }
        setactiveStats(false)
        setactiveCast(false)
        setactiveSummons(false)
        setactiveOrb(false)
        setactiveForce(false)
        setactiveGraphic(false)
        setactiveGuide(false)
    }

    const statsbutton = () => {
        setactiveDesc(false)
        setactiveAbilities(false)
        if (activeStats == true) {
            setactiveStats(false)
        } else {
            setactiveStats(true)
        }
        setactiveCast(false)
        setactiveSummons(false)
        setactiveOrb(false)
        setactiveForce(false)
        setactiveGraphic(false)
        setactiveGuide(false)
    }

    const castbutton = () => {
        setactiveDesc(false)
        setactiveAbilities(false)
        setactiveStats(false)
        if (activeCast == true) {
            setactiveCast(false)
        } else {
            setactiveCast(true)
        }
        setactiveSummons(false)
        setactiveOrb(false)
        setactiveForce(false)
        setactiveGraphic(false)
        setactiveGuide(false)
    }

    const summonsbutton = () => {
        setactiveDesc(false)
        setactiveAbilities(false)
        setactiveStats(false)
        setactiveCast(false)
        if (activeSummons == true) {
            setactiveSummons(false)
        } else {
            setactiveSummons(true)
        }
        setactiveOrb(false)
        setactiveForce(false)
        setactiveGraphic(false)
        setactiveGuide(false)
    }

    const orbbutton = () => {
        setactiveDesc(false)
        setactiveAbilities(false)
        setactiveStats(false)
        setactiveCast(false)
        setactiveSummons(false)
        if (activeOrb == true) {
            setactiveOrb(false)
        } else {
            setactiveOrb(true)
        }
        setactiveForce(false)
        setactiveGraphic(false)
        setactiveGuide(false)
    }

    const forcebutton = () => {
        setactiveDesc(false)
        setactiveAbilities(false)
        setactiveStats(false)
        setactiveCast(false)
        setactiveSummons(false)
        setactiveOrb(false)
        if (activeForce == true) {
            setactiveForce(false)
        } else {
            setactiveForce(true)
        }
        setactiveGraphic(false)
        setactiveGuide(false)
    }

    const graphicbutton = () => {
        setactiveDesc(false)
        setactiveAbilities(false)
        setactiveStats(false)
        setactiveCast(false)
        setactiveSummons(false)
        setactiveOrb(false)
        setactiveForce(false)
        if (activeGraphic == true) {
            setactiveGraphic(false)
        } else {
            setactiveGraphic(true)
        }
        setactiveGuide(false)
    }

    const guidebutton = () => {
        setactiveDesc(false)
        setactiveAbilities(false)
        setactiveStats(false)
        setactiveCast(false)
        setactiveSummons(false)
        setactiveOrb(false)
        setactiveForce(false)
        setactiveGraphic(false)
        if (activeGuide == true) {
            setactiveGuide(false)
        } else {
            setactiveGuide(true)
        }
    }

    const [selectedbuff, setselectedbuff] = useStateIfMounted([]);

    const buffselect = (buffs) => {
        if (selectedbuff.unq_id == buffs.unq_id) {
            setselectedbuff([])
        } else {
            setselectedbuff(buffs)
        }
    }

    const enemy = match

    return (
        <div className="enemyholderdesc3">
            <div className='enemyiconholder makeleft enemytitledetails' to={`/bestiary/enemies/${match.battle_enemy_id}`}>
                <Link className="click linktopage" >
                    {match.Name}{` #${match.battle_enemy_id}`}
                </Link>
            </div>
            <div className="imageelementholder2">
                <Link to={`/bestiary/enemies/${match.battle_enemy_id}`}>
                    <DefaultTippy content={
                        <span>
                            {match.Name}
                            <br />
                            ID: {match.battle_enemy_id}
                        </span>
                    } className="tooltip" >
                        <li className="enemyholderli">
                            <LazyLoadImage className="enemycard" alt={match.Name} src={"https://dissidiacompendium.com/images/static/enemy/face/" + match.url} effect="opacity" />
                        </li>
                    </DefaultTippy>
                    <DefaultTippy content="JP Only" className="tooltip" >
                        <span className={match.JPOnly == true ? "smallJPflag" : ""}></span>
                    </DefaultTippy>
                    <DefaultTippy content="Lufenia" className="tooltip" >
                        <span className={match.LufeniaFlag == true && match.ShinryuFlag != true ? "lufflag" : ""}></span>
                    </DefaultTippy>
                    <DefaultTippy content="Lufenia+" className="tooltip" >
                        <span className={match.LufeniaPlusFlag == true && match.ShinryuFlag != true ? "lufplusflag" : ""}></span>
                    </DefaultTippy>
                    <DefaultTippy content="Shinryu" className="tooltip" >
                        <span className={match.ShinryuFlag == true ? "shinflag" : ""}></span>
                    </DefaultTippy>
                </Link>
                {match.ElementsFlag != true ? "" :
                    <div className={`elementsholder2 ${enemy.ElementsFlag === true ? "" : "nodisplayenemy"}`}>
                        {match.Fire == undefined ? "" :
                            <div className="elementholder3">
                                <span className="FireElement" />
                                <ResistIcon attack="" resist={match.Fire} />
                            </div>
                        }
                        {match.Ice == undefined ? "" :
                            <div className="elementholder3">
                                <span className="IceElement" />
                                <ResistIcon attack="" resist={match.Ice} />
                            </div>
                        }
                        {match.Thunder == undefined ? "" :
                            <div className="elementholder3">
                                <span className="ThunderElement" />
                                <ResistIcon attack="" resist={match.Thunder} />
                            </div>
                        }
                        {match.Water == undefined ? "" :
                            <div className="elementholder3">
                                <span className="WaterElement" />
                                <ResistIcon attack="" resist={match.Water} />
                            </div>
                        }
                        {match.Earth == undefined ? "" :
                            <div className="elementholder3">
                                <span className="EarthElement" />
                                <ResistIcon attack="" resist={match.Earth} />
                            </div>
                        }
                        {match.Wind == undefined ? "" :
                            <div className="elementholder3">
                                <span className="WindElement" />
                                <ResistIcon attack="" resist={match.Wind} />
                            </div>
                        }
                        {match.Holy == undefined ? "" :
                            <div className="elementholder3">
                                <span className="HolyElement" />
                                <ResistIcon attack="" resist={match.Holy} />
                            </div>
                        }
                        {match.Dark == undefined ? "" :
                            <div className="elementholder3">
                                <span className="DarkElement" />
                                <ResistIcon attack="" resist={match.Dark} />
                            </div>
                        }
                        {match.Melee == undefined ? "" :
                            <div className="elementholder3">
                                <span className="Melees" />
                                <ResistIcon attack="" resist={match.Melee} />
                            </div>
                        }
                        {match.Ranged == undefined ? "" :
                            <div className="elementholder3">
                                <span className="Rangeds" />
                                <ResistIcon attack="" resist={match.Ranged} />
                            </div>
                        }
                        {match.Magic == undefined ? "" :
                            <div className="elementholder3">
                                <span className="Magics" />
                                <ResistIcon attack="" resist={match.Magic} />
                            </div>
                        }
                    </div>
                }
            </div>
            {match.AilmentsFlag == true ?
                <div className="blockresists2">
                    {match.AilmentResistsLow != undefined ?
                        <div className="resisttypeholder">
                            <DefaultTippy content="+100%" className="tooltip" >
                                <i className="resist2"></i>
                            </DefaultTippy>
                            <div className="resistlow">{addformatting(match.AilmentResistsLow)}</div>
                        </div>
                        : ""}
                    {match.AilmentResistsHigh != undefined ?
                        <div className="resisttypeholder">
                            <DefaultTippy content="-50%" className="tooltip" >
                                <i className="resist3"></i>
                            </DefaultTippy>
                            <div className="resisthigh">{addformatting(match.AilmentResistsHigh)}</div>
                        </div>
                        : ""}
                    {match.AilmentResistsImmune != undefined ?
                        <div className="resisttypeholder">
                            <DefaultTippy content="-100%" className="tooltip" >
                                <i className="resist5"></i>
                            </DefaultTippy>
                            <div className="resistimmune">{addformatting(match.AilmentResistsImmune)}</div>
                        </div>
                        : ""}
                </div>
                : ""}

            <div className="bufflistbanner noselect fullnow newblue makeright">
                <div className="unique ailmenttext">
                    Details:
                </div>
                <ul className="bufftypes2">
                    <li onClick={descbutton} className={`${activeDesc == true ? "filteractive" : "filterinactive"} buffbutton2 descbuttons `} />
                    {ShowGuide == true ?
                        <li onClick={guidebutton} className={`${activeGuide == true ? "filteractive" : "filterinactive"} buffbutton2 guidebutton`} />
                        : ""}
                    <li onClick={abilitiesbutton} className={`${activeAbilities == true ? "filteractive" : "filterinactive"} buffbutton2 abilitiesbutton `} />
                    <li onClick={statsbutton} className={`${activeStats == true ? "filteractive" : "filterinactive"} buffbutton2 statsbutton `} />
                    {ShowGraphic == true ?
                        <li onClick={graphicbutton} className={`${activeGraphic == true ? "filteractive" : "filterinactive"} buffbutton2 graphicbutton`} />
                        : ""}
                    {ShowCast == true ?
                        <li onClick={castbutton} className={`${activeCast == true ? "filteractive" : "filterinactive"} buffbutton2 buffsdebuffsbutton `} />
                        : ""}
                    {ShowSummons == true ?
                        <li onClick={summonsbutton} className={`${activeSummons == true ? "filteractive" : "filterinactive"} buffbutton2 summonsbutton`} />
                        : ""}
                    {ShowOrb == true ?
                        <li onClick={orbbutton} className={`${activeOrb == true ? "filteractive" : "filterinactive"} buffbutton2 orbsbutton`} />
                        : ""}
                    {ShowForce == true ?
                        <li onClick={forcebutton} className={`${activeForce == true ? "filteractive" : "filterinactive"} buffbutton2 forcesbutton`} />
                        : ""}
                </ul>
            </div>
            {activeDesc == true ?
                <div className='bluebase infobase makeright largefont'>
                    {getDesc == undefined ?
                        "Loading..."
                        :
                        getDesc && addformatting(getDesc)}
                </div>
                : ""}
            {activeCast != true ? "" :
                <div className="">
                    <div className={`bufflistbanner noselect fullnow newblue makeright`}>
                        <div className="unique ailmenttext">Starting Buffs:</div>
                        <ul className="abilitybufflist">
                            {getCast == undefined ? "Loading..." : getCast.map(buffs => (
                                <li className={`abilitybufficonsholder ${selectedbuff.unq_id == buffs.unq_id ? "buffactive" : ""}`} key={buffs.unq_id}>
                                    <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                        <DefaultTippy content={buffs.name && replace_title(buffs.cast_str + " #" + buffs.id)}>
                                            <img alt={buffs.name} className={`clicky abilitybufficon `} src={"https://dissidiacompendium.com/images/static/" + buffs.icon} />
                                        </DefaultTippy>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {selectedbuff.length == 0 ? "" :
                        <div className={`${selectedbuff.is_buff == 0 ? "Debuff" : "Buff"}base infobase makeright`}>
                            <div className={`${selectedbuff.is_buff == 0 ? "Debuff" : "Buff"}subbanner`}>
                                {selectedbuff.name && replace_title(selectedbuff.cast_str)}{` #${selectedbuff.id}`}
                                {selectedbuff.jpname == "" || selectedbuff.jpname == undefined ?
                                    <div className="abilityJPname">
                                        {replace_title(selectedbuff.name)}
                                    </div>
                                    :
                                    <div className="abilityJPname">
                                        {selectedbuff.jpname && replace_title(selectedbuff.jpname)}
                                    </div>}
                            </div>
                            <Ailment_Data_Formatting ailment_data={selectedbuff} />
                        </div>}
                </div>
            }
            {activeForce == true && getForce != undefined && getForce.ForceTime != undefined ?
                <div className="enemyholderdesc margtop lighterblue">
                    <div className="orbcondunit">
                        <div className="orbholder">
                            <div>
                                <span className="textsafe">Force Time</span>
                            </div>
                            <LazyLoadImage effect="opacity" alt="orb" className="orbicon2" src={`https://dissidiacompendium.com/images/static/icons/misc/Shinryu1.png`} />
                        </div>
                        <div className="orbcondtext">
                            {getForce.ForceTime.map((self,i) => (
                                <div key={i} className="orbconbholder forcebholder">
                                    <div><span className="unique">{self.name}</span><br />{addformatting(self.desc)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                : ''}
            {activeForce == true && getForce && getForce[`ForceGauge`] != undefined && getForce[`ForceGauge`].length > 1 ?
                <ul className="enemybannertabs">
                    {enemy[`ForceGauge`].map((self, i) => (
                        <li key={i} className={ForcetimeTab == i ? "active" : ""} onClick={() => ForceTimeSelect(i)}>
                            {ForcetimeTab == i ? <span className="gemselected" />
                                : ""}
                            {`Force Time ${i + 1}`}
                        </li>
                    ))}
                </ul>
                : ""}
            {activeForce == true && getForce != undefined && getForce[`ForceGauge`] && getForce[`ForceGauge`][ForcetimeTab] && getForce[`ForceGauge`][ForcetimeTab].ForceGauge != undefined ?
                <div className={`enemyholderdesc${enemy[`ForceGauge`].length > 1 ? "2" : ""}`}>
                    <div className="enemyforcesubbanner">Force Gauge</div>
                    {getForce[`ForceGauge`][ForcetimeTab] && getForce[`ForceGauge`][ForcetimeTab].ForceGauge.sort((a, b) => a.id - b.id).map((self, i) => (
                        <div className="buffunit" key={i}>
                            <div className="infoholder egfbanner">
                                <div className={`infonameholderenemybuff centeralign ${self.name == "Force Weakness" ? "blackbanner" : self.name == "Force Gauge Increase" ? "Buffbanner" : "Debuffbanner"}`}>
                                    <span className="unique">
                                        {self.name && replace_title(self.name)}
                                    </span>
                                    {self.name == "Force Weakness" ? "" :
                                        <EnemyForceGauge gauge_min={self.gauge_min} gauge_max={self.gauge_max} />
                                    }
                                </div>
                                <div className={`efginfobase efgbase fontnormal ${self.name == "Force Weakness" ? "blackbase" : self.name == "Force Gauge Increase" ? "Buffbase" : "Debuffbase"}`}>
                                    {self.desc && addformatting(self.desc)}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="subtextfg">*displays effect range</div>
                </div>
                : ""}
            {activeForce == true && getForce != undefined && helpers.length != 0 ?
                <div className="characterhelper">
                    <div className="similarbanner">Potential Special Helpers</div>
                    <div className="filterholderflair">
                    {helpers.length < 19 ?
                        <ul className="CharNameHolder" style={{ columnCount: columns, MozColumnsCount: columns, WebkitColumnsCount: columns }}>
                            {helpers.map((self, i) => (
                                <li key={i}>
                                    <Link className="linkforce" to={`/characters/${self.ShortName}`}>
                                    <span className={`${self.CrystalColor}crystalmini`}></span>{self.CharacterName}:
                                    </Link><br />
                                    {self.roles.map((self3,i) => (
                                        <Tippy key={i} content={roles[self3] && roles[self3].name}>
                                            <span className="rolesforforce" style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[self3] && roles[self3].url}.png)` }}>
                                            </span>
                                        </Tippy>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    :
                    showhelpers == false ?
                            <div className={`force_coloring noshowbottomline`}>
                                <div onClick={() => setshowhelpers((prevstate) => !prevstate)} className='loadbanners'>
                                    {"Show Helpers"}
                                </div>
                            </div>
                            :
                            <ul className="CharNameHolder" style={{ columnCount: columns, MozColumnsCount: columns, WebkitColumnsCount: columns }}>
                            {helpers.map((self, i) => (
                                <li key={i}>
                                    <Link className="linkforce" to={`/characters/${self.ShortName}`}>
                                    <span className={`${self.CrystalColor}crystalmini`}></span>{self.CharacterName}:
                                    </Link><br />
                                    {self.roles.map((self3,i) => (
                                        <Tippy key={i} content={roles[self3] && roles[self3].name}>
                                            <span className="rolesforforce" style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[self3] && roles[self3].url}.png)` }}>
                                            </span>
                                        </Tippy>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    }
                    </div>
                    <div className="subtext">{"*Dependant on selected GL/JP version"}</div>
                </div>
                : ""}
            {activeGraphic == true ?
                <div className="enemyholderdesc normalfont margtop lighterblue">
                    {getGraphic == undefined ? "" : getGraphic.map(self => (
                        <div key={self}>
                            <a target="_blank" rel="noreferrer" href={`https://dissidiacompendium.com/images/static/info/${self}.png`}>
                                <img className="infoimg withshadow clicky" src={`https://dissidiacompendium.com/images/static/info/${self}.png`} />
                            </a>
                        </div>
                    ))}
                </div>
                : ""}
            {activeOrb == true ?
                getOrb == undefined ? "Loading..." :
                    <div className="enemyholderdesc margtop lighterblue">
                        <div className="orbcondunit">
                            <div className="orbholder">
                                <div>
                                    <span className="textsafe">Special Counter</span>
                                </div>
                                <LazyLoadImage effect="opacity" alt="orb" className="orbicon" src={`https://dissidiacompendium.com/images/static/icons/misc/43${enemy.LufeniaPlusFlag == true ? "+" : ""}.png`} />
                                {getOrb.LufeniaStartCounter === undefined ? "" :
                                    <div>
                                        <span className="textsafe">Start count: <span className="values">{getOrb.LufeniaStartCounter}</span></span>
                                    </div>
                                }
                            </div>
                            <div className="orbcondtext">
                                {getOrb.LufeniaCons != undefined ?
                                    getOrb.LufeniaCons.map((self, key) => (
                                        <div key={key} className="orbconbholder">
                                            <div className={self.desc.slice(0, self.desc.indexOf(":"))}>
                                                {addformatting(self.desc)}
                                            </div>
                                        </div>
                                    ))
                                    : ""}
                            </div>
                        </div>
                    </div>
                :
                ""}
            {activeOrb == true ?
                getOrb == undefined ? "Loading..." :
                    helpers.length == 0 ? "" :
                        <div className="characterhelper">
                            <div className="similarbanner">Potential Special Helpers</div>
                            <div className="filterholderflair">
                            {helpers.length < 19 ?
                                <ul className="CharNameHolder" style={{ columnCount: columns, MozColumnsCount: columns, WebkitColumnsCount: columns }}>
                                    {helpers.map((self, i) => (
                                        <li key={i}>
                                            <Link className="linkforce" to={`/characters/${self.ShortName}`}>
                                                <span className={`${self.CrystalColor}crystalmini`}></span>{self.CharacterName}:
                                            </Link><br />
                                            {self.roles.map((self3, i) => (
                                                <Tippy key={i} content={roles[self3].name}>
                                                    <span className="rolesforforce" style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[self3].url})` }}>
                                                    </span>
                                                </Tippy>
                                            ))}
                                        </li>
                                    ))}
                                </ul>
                            :
                            showhelpers == false ?
                                <div className={`force_coloring noshowbottomline`}>
                                    <div onClick={() => setshowhelpers((prevstate) => !prevstate)} className='loadbanners'>
                                        {"Show Helpers"}
                                    </div>
                                </div>
                            :
                            <ul className="CharNameHolder" style={{ columnCount: columns, MozColumnsCount: columns, WebkitColumnsCount: columns }}>
                                    {helpers.map((self, i) => (
                                        <li key={i}>
                                            <Link className="linkforce" to={`/characters/${self.ShortName}`}>
                                                <span className={`${self.CrystalColor}crystalmini`}></span>{self.CharacterName}:
                                            </Link><br />
                                            {self.roles.map((self3, i) => (
                                                <Tippy key={i} content={roles[self3].name}>
                                                    <span className="rolesforforce" style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[self3].url})` }}>
                                                    </span>
                                                </Tippy>
                                            ))}
                                        </li>
                                    ))}
                                </ul>
                            }
                            </div>
                            <div className="subtext">{"*Dependant on selected GL/JP version"}</div>
                        </div> : ""}
            {activeSummons == true ?
                getSummons == undefined ? "Loading..." :
                    <div className="enemyholderdesc margtop">
                        <div className="summonedenemysubbanner">Summoned Enemies</div>
                        <ul className="summonedenemyholder">
                            <DefaultTippy content={<span>{getSummons.SummonID1.Name}<br />ID: {getSummons.SummonID1.battle_enemy_id}</span>} className="tooltip" >
                                <li>
                                    <Link to={`/bestiary/enemies/${getSummons.SummonID1.battle_enemy_id}`}>
                                        <img className="enemycard" alt={getSummons.SummonID1.Name} src={"https://dissidiacompendium.com/images/static/enemy/face/" + getSummons.SummonID1.url} />
                                    </Link>
                                </li>
                            </DefaultTippy>
                            {getSummons.SummonID2 == undefined ?
                                "" :
                                <DefaultTippy content={<span>{getSummons.SummonID2.Name}<br />ID: {getSummons.SummonID2.battle_enemy_id}</span>} className="tooltip" >
                                    <li>
                                        <Link to={`/bestiary/enemies/${getSummons.SummonID2.battle_enemy_id}`}>
                                            <img className="enemycard" alt={getSummons.SummonID2.Name} src={"https://dissidiacompendium.com/images/static/enemy/face/" + getSummons.SummonID2.url} />
                                        </Link>
                                    </li>
                                </DefaultTippy>}
                        </ul>
                    </div>
                : ""}
            {activeStats == true ?
                ProcessedLevels == undefined || getStats == undefined ? "Loading..." :
                    <EnemyDetailsLevelHanlder
                        enemy_id={enemy.enemy_id}
                        Level={enemy.Level}
                        ProcessedLevels={ProcessedLevels}
                        chase={getStats}
                    />
                : ""}
            {activeAbilities == true ?
                getAbilities == undefined ? "Loading..." :
                    <EnemyAbilities_MasterListDirectDetailsHandler
                        alllevels={getAbilities}
                        ai={match.ai_}
                        enemy_id={match.enemy_id}
                        Level={match.Level}
                    />
                : ""}
            {activeGuide == true ?
                getGuide == undefined ? "Loading..." :
                <>
                {enemy[`ForceGauge`] && enemy[`ForceGauge`].length == 1?
                "":
                <ul className="enemybannertabs">
                    {enemy[`ForceGauge`] && enemy[`ForceGauge`].map((self, i) => (
                        <li key={i} className={ForcetimeTab == i ? "active" : ""} onClick={() => ForceTimeSelect2(i)}>
                            {ForcetimeTab == i ? <span className="gemselected" />
                                : ""}
                            {`Guide ${i + 1}`}
                        </li>
                    ))}
                </ul>
                }
                <div className={`enemyholderdesc${enemy[`ForceGauge`] && enemy[`ForceGauge`].length > 1 ? "2" : ""}`}>
                    <div className='enemyholderdesc normalfont margtop makeright lighterblue'>
                        <EnemyGuide
                            guide={getGuide}
                        />
                    </div>
                    <div className="subtextfg">*guide data not always provided</div>
                </div>
                </>
                : ""}
        </div>
    )

}
export default EnemyDetailsDirect;