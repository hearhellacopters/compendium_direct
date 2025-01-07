import React, { useState, useEffect } from 'react';
import DevSwitch from '../redux/DevSwitch';
import axios from "axios";
import CharacterProfilePage from './CharacterProfilePage';
import CharacterAbilityPage from './CharacterAbilityPage';
import CharacterBuffPage from './CharacterBuffPage';
import CharacterExpPassivesPage from './CharacterExpPassivesPage';
import CharacterCrystalPassivesPage from './CharacterCrystalPassivesPage';
import CharacterBoardPassivesPage from './CharacterBoardPassivesPage'
import CharacterForcePassives from './CharacterForcePassives';
import CharacterGearPage from './CharacterGearPage';
import CharacterSpheresPage from './CharacterSpheresPage';
import CharacterArtPassivesPage from './CharacterArtPassivesPage';
import CharacterEventPage from './CharacterEventPage';

const ByCharacterLanding = ({
    selectedCharaID,
    pageloc,

    master_index,
    formatting,

    access,
    ver
}) => {

    const [previousIDprofile, setpreviousIDprofile] = useState()
    const [previousIDevent, setpreviousIDevent] = useState()
    const [previousIDspheres, setpreviousIDspheres] = useState()
    const [previousIDboard, setpreviousIDboard] = useState()
    const [previousIDequipment, setpreviousIDequipment] = useState()
    const [previousIDlink, setpreviousIDlink] = useState()
    const [previousIDcpassive, setpreviousIDcpassive] = useState()
    const [previousIDexp, setpreviousIDexp] = useState()
    const [previousIDability, setpreviousIDability] = useState()
    const [previousIDart, setpreviousIDart] = useState()

    const [profiledata, setprofiledata] = useState()
    const [eventdata, seteventdata] = useState()
    const [spheresdata, setspheresdata] = useState([])
    const [boarddata, setboarddata] = useState()
    const [equipmentdata, setequipmentdata] = useState()
    const [linkeddata, setlinkeddata] = useState()
    const [cpassivedata, setcpassivedata] = useState()
    const [expdata, setexpdata] = useState()
    const [abilitydata, setabilitydata] = useState()
    const [buffdata, setbuffdata] = useState()
    const [artdata, setartdata] = useState()

    useEffect(() => {
        //profile
        if (DevSwitch == true && pageloc == "profile" && previousIDprofile != selectedCharaID) {
            setprofiledata(undefined)
            axios.get(`data/_dir/character_basic/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setprofiledata(response)
                setpreviousIDprofile(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == false && pageloc == "profile" && previousIDprofile != selectedCharaID) {
            setprofiledata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/character_basic/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setprofiledata(response)
                setpreviousIDprofile(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
        }
        //event
        if (DevSwitch == true && pageloc == "events" && previousIDevent != selectedCharaID) {
            seteventdata(undefined)
            axios.get(`data/_dir/events/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                seteventdata(response)
                setpreviousIDevent(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == false && pageloc == "events" && previousIDevent != selectedCharaID) {
            seteventdata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/events/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                seteventdata(response)
                setpreviousIDevent(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
        }
        //spheres
        if (DevSwitch == true && pageloc == "spheres" && previousIDspheres != selectedCharaID) {
            axios.get(`data/_dir/ex_skill/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setspheresdata(response)
                setpreviousIDspheres(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == false && pageloc == "spheres" && previousIDspheres != selectedCharaID) {
            axios.get(`https://www.dissidiacompendium.com/data/_dir/ex_skill/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setspheresdata(response)
                setpreviousIDspheres(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == true && pageloc == "spheres" && previousIDprofile != selectedCharaID) {
            setprofiledata(undefined)
            axios.get(`data/_dir/character_basic/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setprofiledata(response)
                setpreviousIDprofile(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == false && pageloc == "spheres" && previousIDprofile != selectedCharaID) {
            setprofiledata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/character_basic/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setprofiledata(response)
                setpreviousIDprofile(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
        }
        //sum_fix_passive
        if (DevSwitch == true && pageloc == "bpassives" && previousIDboard != selectedCharaID) {
            setboarddata(undefined)
            axios.get(`data/_dir/sum_fix_passive/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setboarddata(response)
                setpreviousIDboard(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == false && pageloc == "bpassives" && previousIDboard != selectedCharaID) {
            setboarddata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/sum_fix_passive/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setboarddata(response)
                setpreviousIDboard(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
        }
        //gear
        if (DevSwitch == true && pageloc == "gear" && previousIDequipment != selectedCharaID) {
            setequipmentdata(undefined)
            axios.get(`data/_dir/equipment_passive_character/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setequipmentdata(response)
                setpreviousIDequipment(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == false && pageloc == "gear" && previousIDequipment != selectedCharaID) {
            setequipmentdata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/equipment_passive_character/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setequipmentdata(response)
                setpreviousIDequipment(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
        }
        //link
        if (DevSwitch == true && pageloc == "link" && previousIDlink != selectedCharaID) {
            setlinkeddata(undefined)
            axios.get(`data/_dir/link_chara/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setlinkeddata(response)
                setpreviousIDlink(selectedCharaID)
            }).catch(function (err) {
                setlinkeddata([])
                console.log(err)
            })
        }
        if (DevSwitch == false && pageloc == "link" && previousIDlink != selectedCharaID) {
            setlinkeddata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/link_chara/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setlinkeddata(response)
                setpreviousIDlink(selectedCharaID)
            }).catch(function (err) {
                setlinkeddata([])
                console.log(err.response.status)
            })
        }
        //crystal
        if (DevSwitch == true && pageloc == "cpassives" && previousIDcpassive != selectedCharaID) {
            setcpassivedata(undefined)
            axios.get(`data/_dir/crystal_awakening_chara/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setcpassivedata(response)
                setpreviousIDcpassive(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == false && pageloc == "cpassives" && previousIDcpassive != selectedCharaID) {
            setcpassivedata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/crystal_awakening_chara/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setcpassivedata(response)
                setpreviousIDcpassive(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
        }
        //exp
        if (DevSwitch == true && pageloc == "exp" && previousIDexp != selectedCharaID) {
            setexpdata(undefined)
            axios.get(`data/_dir/chara_level_ability/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setexpdata(response)
                setpreviousIDexp(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == false && pageloc == "exp" && previousIDexp != selectedCharaID) {
            setexpdata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/chara_level_ability/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setexpdata(response)
                setpreviousIDexp(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
        }
        //exp
        if (DevSwitch == true && pageloc == "art" && previousIDart != selectedCharaID) {
            setartdata(undefined)
            axios.get(`data/_dir/art_passive_bycharacter/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setartdata(response)
                setpreviousIDart(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == false && pageloc == "art" && previousIDart != selectedCharaID) {
            setartdata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/art_passive_bycharacter/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setartdata(response)
                setpreviousIDart(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
        }
        //ability
        if (DevSwitch == true && pageloc == "abilities" && previousIDability != selectedCharaID) {
            setabilitydata(undefined)
            axios.get(`data/_dir/character_ability_character/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setabilitydata(response)
                setpreviousIDability(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
            setbuffdata(undefined)
            axios.get(`data/_dir/ailmentdefault_character/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setbuffdata(response)
                setpreviousIDability(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == false && pageloc == "abilities" && previousIDability != selectedCharaID) {
            setabilitydata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/character_ability_character/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setabilitydata(response)
                setpreviousIDability(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
            setbuffdata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/ailmentdefault_character/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setbuffdata(response)
                setpreviousIDability(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
        }
        //buffs
        if (DevSwitch == true && pageloc == "buffs" && previousIDability != selectedCharaID) {
            setabilitydata(undefined)
            axios.get(`data/_dir/character_ability_character/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setabilitydata(response)
                setpreviousIDability(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
            setbuffdata(undefined)
            axios.get(`data/_dir/ailmentdefault_character/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setbuffdata(response)
                setpreviousIDability(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == false && pageloc == "buffs" && previousIDability != selectedCharaID) {
            setabilitydata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/character_ability_character/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setabilitydata(response)
                setpreviousIDability(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
            setbuffdata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/ailmentdefault_character/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setbuffdata(response)
                setpreviousIDability(selectedCharaID)
            }).catch(function (err) {
                console.log(err)
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [DevSwitch, pageloc, selectedCharaID, previousIDprofile, previousIDevent, previousIDboard, previousIDspheres, previousIDequipment, previousIDlink, previousIDcpassive, previousIDexp, previousIDability])


    return (
        <div>
            {pageloc == "profile" ?
                profiledata != undefined ?
                    <CharacterProfilePage
                        data={profiledata}
                        ver={ver}
                        master_index={master_index}
                        access={access}
                    />
                    : "Loading..."
                : ""}
            {pageloc == "abilities" ?
                abilitydata != undefined ?
                    <CharacterAbilityPage
                        key={abilitydata}
                        ability_data={abilitydata}
                        buff_data={buffdata}
                        access={access}
                        selected_id={selectedCharaID}

                        ver={ver}
                        loc={"sum_fix_passive"}
                        newcompare={"new"}
                        file={"sum_fix_passive"}

                        master_index={master_index}

                        formatting={formatting}
                    />
                    : "Loading..."
                : ""}
            {pageloc == "buffs" ?
                buffdata != undefined && abilitydata != undefined ?
                    <CharacterBuffPage
                        key={buffdata}
                        ability_data={abilitydata}
                        buff_data={buffdata}
                        selected_id={selectedCharaID}

                        ver={ver}
                        loc={"sum_fix_passive"}
                        newcompare={"new"}
                        file={"sum_fix_passive"}

                        master_index={master_index}

                        formatting={formatting}
                    />
                    : "Loading..."
                : ""}
            {pageloc == "exp" ?
                expdata != undefined ?
                    <CharacterExpPassivesPage
                        key={expdata}
                        passive_data={expdata}
                        ver={ver}
                        loc={"sum_fix_passive"}
                        newcompare={"new"}
                        access={access}
                        master_index={master_index}

                        formatting={formatting}
                    />
                    : "Loading..."
                : ""}
            {pageloc == "cpassives" ?
                cpassivedata != undefined ?
                    <CharacterCrystalPassivesPage
                        crydata={cpassivedata}
                        ver={ver}
                        newcompare={"new"}
                        loc={"equipment_passive"}
                        access={access}
                        master_index={master_index}

                        formatting={formatting}
                    />
                    : "Loading..."
                : ""}
            {pageloc == "bpassives" ?
                boarddata != undefined ?
                    <CharacterBoardPassivesPage
                        key={boarddata}
                        sum_fix_passive={boarddata}
                        ver={ver}
                        loc={"sum_fix_passive"}
                        newcompare={"new"}
                        access={access}
                        master_index={master_index}

                        formatting={formatting}
                    />
                    : "Loading..."
                : ""}
            {pageloc == "link" ?
                linkeddata != undefined ?
                    <CharacterForcePassives
                        linkeddata={linkeddata}
                        ver={ver}
                        newcompare={"new"}
                        loc={"equipment_passive"}
                        access={access}
                        master_index={master_index}

                        formatting={formatting}
                    />
                    : "Loading..."
                : ""}
            {pageloc == "gear" ?
                equipmentdata != undefined ?
                    <CharacterGearPage
                        equipment_passive_ability={equipmentdata}
                        ver={ver}
                        newcompare={"new"}
                        loc={"equipment_passive"}

                        master_index={master_index}

                        formatting={formatting}
                    />
                    : "Loading..."
                : ""}
            {pageloc == "spheres" ?
                spheresdata != undefined &&
                    profiledata != undefined ?
                    <CharacterSpheresPage
                        data={spheresdata}
                        profiledata={profiledata}
                        ver={ver}
                        loc={"ex_skill"}

                        master_index={master_index}

                        formatting={formatting}
                    />
                    : "Loading..."
                : ""}
            {pageloc == "art" ?
                artdata != undefined ?
                    <CharacterArtPassivesPage
                        art_passive={artdata}
                        ver={ver}
                        newcompare={"new"}
                        loc={"art_passive"}
                        file={"art_passive"}

                        master_index={master_index}

                        formatting={formatting}
                    />
                    : "Loading..."
                : ""}
            {pageloc == "events" ?
                eventdata != undefined ?
                    <CharacterEventPage
                        data={eventdata}
                        ver={ver}
                        master_index={master_index}
                    />
                    : "Loading..."
                : ""}
        </div>
    )
}
export default ByCharacterLanding