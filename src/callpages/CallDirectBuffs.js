import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import Loading from './_loading'
//direct
import { getAilmentGroupFull } from '../redux/ducks/ailment_group_full';
import { getCommandGroupFull } from '../redux/ducks/command_group_full';
import { getEnemyResistFull } from '../redux/ducks/enemy_resist_full';
import { getAilmentNames } from '../redux/ducks/ailmentnames';
import { getCommandNames } from '../redux/ducks/commandnames';
import { getCondData } from '../redux/ducks/cond_data';
import { getAilmentEffects } from '../redux/ducks/ailment_effects';
import { getWeaponCat } from '../redux/ducks/weaponcat'
import { getFFSeries} from '../redux/ducks/ffseries'
import { getCharID} from '../redux/ducks/char_id'
import { getCastTargets} from '../redux/ducks/cast_targets'
import { getEquipmentPassiveNames} from '../redux/ducks/equipmentpassivenames'
import { getPassiveNames} from '../redux/ducks/passivenames'
import { getEnemyType} from '../redux/ducks/enemy_type'
import { getPassiveEffects} from '../redux/ducks/passive_effects'
import { getHitTransData} from '../redux/ducks/hittransdata'
import { getCommandTransData} from '../redux/ducks/commandtransdata'
import { getOptionTransData} from '../redux/ducks/optiontransdata'

import { getJPGameListAilment } from '../redux/ducks/JP/gamelist_ailment';
import { getGLGameListAilment } from '../redux/ducks/GL/gamelist_ailment';

import BuffsDirect from '../BuffsDirect';

const CallBuffsDirect = () =>{

    const match = {
        params: useParams()
    }
    
    const dispatch = useDispatch();

    const AilmentNames = useSelector((state) => 
    state.ailmentnames.ailmentnames
    );
	
	useEffect(() => {
        let mounted = true
        if (mounted && AilmentNames == undefined) {
        dispatch(getAilmentNames());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,AilmentNames])
	
	const CommandNames = useSelector((state) => 
    state.commandnames.commandnames
    );
	
	useEffect(() => {
        let mounted = true
        if (mounted && CommandNames == undefined) {
        dispatch(getCommandNames());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,CommandNames])
	
	const CondData = useSelector((state) => 
    state.conddata.conddata
    );
	
	useEffect(() => {
        let mounted = true
        if (mounted && CondData ==undefined) {
        dispatch(getCondData());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,CondData])
	
	const Ailment_Effects = useSelector((state) => 
    state.ailment_effects.ailment_effects
    );

    useEffect(() => {
        let mounted = true
        if (mounted && Ailment_Effects ==undefined) {
        dispatch(getAilmentEffects());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,Ailment_Effects]);
	
	const MessageData_Category = useSelector((state) => 
    state.weaponcat.weaponcat
    );
	
	useEffect(() => {
        let mounted = true
        if (mounted && MessageData_Category == undefined) {
        dispatch(getWeaponCat());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,MessageData_Category])
	
	const MessageData_FFSeries = useSelector((state) => 
    state.ffseries.ffseries
    );
	
	useEffect(() => {
        let mounted = true
        if (mounted && MessageData_FFSeries == undefined) {
        dispatch(getFFSeries());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,MessageData_FFSeries])

    const char_id = useSelector((state) => 
    state.charid.charid
    );

    useEffect(() => {
        let mounted = true
        if (mounted && char_id == undefined) {
        dispatch(getCharID());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,char_id]);

    const casttargets = useSelector((state) => 
    state.casttargets.casttargets
    );

    useEffect(() => {
        let mounted = true
        if (mounted && casttargets == undefined) {
        dispatch(getCastTargets());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,casttargets]);
	
	const EquipmentPassiveNames = useSelector((state) => 
    state.equipmentpassivenames.equipmentpassivenames
    );
	
	useEffect(() => {
        let mounted = true
        if (mounted && EquipmentPassiveNames ==undefined) {
        dispatch(getEquipmentPassiveNames());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,EquipmentPassiveNames]);
	
	const PassiveNames = useSelector((state) => 
    state.passivenames.passivenames
    );

	useEffect(() => {
        let mounted = true
        if (mounted && PassiveNames ==undefined) {
        dispatch(getPassiveNames());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,PassiveNames]);
	
	const enemy_type = useSelector((state) => 
    state.enemy_type.enemy_type
    );

    useEffect(() => {
        let mounted = true
        if (mounted && enemy_type == undefined) {
        dispatch(getEnemyType());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,enemy_type]);
	
	const passive_effects = useSelector((state) => 
    state.passive_effects.passive_effects
    );

    useEffect(() => {
        let mounted = true
        if (mounted && passive_effects ==undefined) {
        dispatch(getPassiveEffects());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,passive_effects]);
	
	const hit_trans_data = useSelector((state) => 
    state.hit_trans_data.hit_trans_data
    );

    useEffect(() => {
        let mounted = true
        if (mounted && hit_trans_data ==undefined) {
        dispatch(getHitTransData());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,hit_trans_data]);
	
	const command_trans_data = useSelector((state) => 
    state.command_trans_data.command_trans_data
    );

    useEffect(() => {
        let mounted = true
        if (mounted && command_trans_data ==undefined) {
        dispatch(getCommandTransData());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,command_trans_data]);

    const option_trans_data = useSelector((state) => 
    state.option_trans_data.option_trans_data
    );

    useEffect(() => {
        let mounted = true
        if (mounted && option_trans_data ==undefined) {
        dispatch(getOptionTransData());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,option_trans_data]);
	
	//version change
	
	const ailment_group_full = useSelector((state) => 
    state.ailment_group_full.ailment_group_full
    );
 

    useEffect(() => {
        let mounted = true
        if (mounted && ailment_group_full == undefined) {
        dispatch(getAilmentGroupFull());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,ailment_group_full])

    const command_group_full = useSelector((state) => 
    state.command_group_full.command_group_full
    );
 

    useEffect(() => {
        let mounted = true
        if (mounted && command_group_full == undefined) {
        dispatch(getCommandGroupFull());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,command_group_full])
	
	const enemy_resist_full = useSelector((state) => 
    state.enemy_resist_full.enemy_resist_full
    );
 
    useEffect(() => {
        let mounted = true
        if (mounted && enemy_resist_full == undefined) {
        dispatch(getEnemyResistFull());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,enemy_resist_full])

    const ProcessedCharacters = useSelector((state) => 
    state.characters.characters
    );

    const jptoggledata = useSelector((state) => 
    state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedCharacters == undefined) {
        dispatch(getCharacters())
        }
        if (mounted) {
        dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,ProcessedCharacters]);

    const [ProcessedBuffs, setProcessedBuffs] = useState()
    const [ver, setver] = useState(jptoggledata == true ? "JP" : "GL")

    const jp_gamelist_ailment = useSelector((state) => state.jp_gamelist_ailment.jp_gamelist_ailment)

    const gl_gamelist_ailment = useSelector((state) => state.gl_gamelist_ailment.gl_gamelist_ailment)

    useEffect(() => {
        let mounted = true
        if(mounted && jptoggledata == true && jp_gamelist_ailment == undefined){
            setProcessedBuffs()
            dispatch(getJPGameListAilment())
            setver("JP")
        } 
        return function cleanup() {
            mounted = false
        }
    },[dispatch,jptoggledata,jp_gamelist_ailment])

    useEffect(() => {
        let mounted = true
        if(mounted && jptoggledata != true && gl_gamelist_ailment == undefined){
            setProcessedBuffs()
            dispatch(getGLGameListAilment())
            setver("GL")
        }
        return function cleanup() {
            mounted = false
        }
    },[dispatch,jptoggledata,gl_gamelist_ailment])

    useEffect(() => {
        if(jptoggledata == true && jp_gamelist_ailment != undefined){
            setProcessedBuffs(jp_gamelist_ailment)
            setver("JP")
        }
        if(jptoggledata != true && gl_gamelist_ailment != undefined){
            setProcessedBuffs(gl_gamelist_ailment)
            setver("GL")
        }
    },[dispatch,jptoggledata,jp_gamelist_ailment,gl_gamelist_ailment])


      return (
        passive_effects != undefined &&
        PassiveNames != undefined &&
        EquipmentPassiveNames != undefined &&
        AilmentNames != undefined &&
        CommandNames!= undefined && 
        CondData!= undefined && 
        Ailment_Effects != undefined && 
        MessageData_Category != undefined && 
        MessageData_FFSeries != undefined && 
        char_id != undefined && 
        casttargets != undefined && 
        enemy_type != undefined &&
        hit_trans_data != undefined &&
        command_trans_data != undefined &&
        option_trans_data != undefined &&
		
        ailment_group_full != undefined && 
        command_group_full != undefined && 
        enemy_resist_full != undefined &&

        ver != undefined &&

        ProcessedBuffs != undefined
	
		?
		
        <BuffsDirect 
        enemy_type={enemy_type} 
        cast_targets={casttargets} 
        passive_effects_data={passive_effects} 
        char_id={char_id} 
        passivenames={PassiveNames} 
        equipmentpassivenames={EquipmentPassiveNames} 
        AilmentNames={AilmentNames} 
        CommandNames={CommandNames} 
        CondData={CondData} 
        Ailment_Effects={Ailment_Effects}
        MessageData_Category={MessageData_Category} 
        MessageData_FFSeries={MessageData_FFSeries} 
        command_data_effects={command_trans_data}
        hit_data_effects={hit_trans_data}
        option_trans_data={option_trans_data}
		
        ailment_group={ailment_group_full} 
        command_group={command_group_full} 
        enemy_resist={enemy_resist_full}

        ProcessedBuffs={ProcessedBuffs}
        ver={ver}
		
        match={match} 
        />
		
        : 
		
        <Loading/>
    ) 
}

export default CallBuffsDirect;