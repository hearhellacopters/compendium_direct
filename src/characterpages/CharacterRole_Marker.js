import React from "react";
import roles from '../formatting/roles.json'
import DefaultTippy from '../formatting/TippyDefaults.js';

const Role_Maker =({
    newmatch,
    lower
})=>{
    return(
        <>
            {lower == true ?
            <DefaultTippy content={`Realm ${newmatch.Realm}`}>
            <img className="classdisplay filterinactive" alt={newmatch.Realm} src={newmatch.RealmURL  == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : "https://dissidiacompendium.com/images/static/icons/realms/" + newmatch.RealmURL}></img>
            </DefaultTippy>
            : ``}
            {lower == true && newmatch.Magic == true ? 
            <DefaultTippy content="Magic Damage Type">
            <li className="magicbutton classdisplay filterinactive"></li>
            </DefaultTippy>
            : ``}
            {lower == true && newmatch.Melee == true ? 
            <DefaultTippy content="Melee Damage Type">
            <li className="meleebutton classdisplay filterinactive"></li>
            </DefaultTippy>
                : ``}
            {lower == true && newmatch.Ranged == true ? 
            <DefaultTippy content="Ranged Damage Type">
            <li className="rangedbutton classdisplay filterinactive"></li>
            </DefaultTippy>
            : ``}
            {lower == true && newmatch.Fire_Damage == true ? 
            <DefaultTippy content="Fire BRV Damage">
            <li className="Firebutton classdisplay filterinactive"></li>
            </DefaultTippy>
            : ``}
            {lower == true && newmatch.Ice_Damage == true ? 
            <DefaultTippy content="Ice BRV Damage">
            <li className="Icebutton classdisplay filterinactive"></li>
            </DefaultTippy>
            : ``}
            {lower == true && newmatch.Thunder_Damage == true ?
            <DefaultTippy content="Thunder BRV Damage">
            <li className="Thunderbutton classdisplay filterinactive"></li>
            </DefaultTippy>
            : ``}
            {lower == true && newmatch.Water_Damage == true ?
            <DefaultTippy content="Water BRV Damage">
            <li className="Waterbutton classdisplay filterinactive"></li>
            </DefaultTippy>
            : ``}
            {lower == true && newmatch.Earth_Damage == true ? 
            <DefaultTippy content="Earth BRV Damage">
            <li className="Earthbutton classdisplay filterinactive"></li>
            </DefaultTippy>
            : ``}
            {lower == true && newmatch.Wind_Damage == true ? 
            <DefaultTippy content="Wind BRV Damage">
            <li className="Windbutton classdisplay filterinactive"></li>
            </DefaultTippy>
            : ``}
            {lower == true && newmatch.Dark_Damage == true ?
            <DefaultTippy content="Dark BRV Damage">
            <li className="Darkbutton classdisplay filterinactive"></li>
            </DefaultTippy>
            : ``}
            {lower == true && newmatch.Holy_Damage == true ? 
            <DefaultTippy content="Holy BRV Damage">
            <li className="Holybutton classdisplay filterinactive"></li>
            </DefaultTippy>
            : ``}
            {lower == true && newmatch.ActiveRework == true ? 
            <DefaultTippy content="Active JP Rework">
            <li className="JPReworkbutton classdisplay filterinactive"></li>
            </DefaultTippy>
            : ``}
            {newmatch.Magic_Imperil == true ? 
            <DefaultTippy content={roles[`Magic_Imperil`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Magic_Imperil`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Melee_Imperil == true ? 
            <DefaultTippy content={roles[`Melee_Imperil`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Melee_Imperil`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Ranged_Imperil == true ? 
            <DefaultTippy content={roles[`Ranged_Imperil`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Ranged_Imperil`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Fire_Enchant == true ? 
            <DefaultTippy content={roles[`Fire_Enchant`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Fire_Enchant`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Ice_Enchant == true ? 
            <DefaultTippy content={roles[`Ice_Enchant`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Ice_Enchant`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Thunder_Enchant == true ? 
            <DefaultTippy content={roles[`Thunder_Enchant`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Thunder_Enchant`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Water_Enchant == true ? 
            <DefaultTippy content={roles[`Water_Enchant`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Water_Enchant`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Earth_Enchant == true ? 
            <DefaultTippy content={roles[`Earth_Enchant`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Earth_Enchant`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Wind_Enchant == true ? 
            <DefaultTippy content={roles[`Wind_Enchant`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Wind_Enchant`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Dark_Enchant == true ? 
            <DefaultTippy content={roles[`Dark_Enchant`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Dark_Enchant`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Holy_Enchant == true ? 
            <DefaultTippy content={roles[`Holy_Enchant`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Holy_Enchant`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}

            {newmatch.Fire_Imperil == true ? 
            <DefaultTippy content={roles[`Fire_Imperil`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Fire_Imperil`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Ice_Imperil == true ? 
            <DefaultTippy content={roles[`Ice_Imperil`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Ice_Imperil`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Thunder_Imperil == true ? 
            <DefaultTippy content={roles[`Thunder_Imperil`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Thunder_Imperil`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Water_Imperil == true ? 
            <DefaultTippy content={roles[`Water_Imperil`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Water_Imperil`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Earth_Imperil == true ? 
            <DefaultTippy content={roles[`Earth_Imperil`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Earth_Imperil`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Wind_Imperil == true ? 
            <DefaultTippy content={roles[`Wind_Imperil`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Wind_Imperil`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Dark_Imperil == true ? 
            <DefaultTippy content={roles[`Dark_Imperil`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Dark_Imperil`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Holy_Imperil == true ? 
            <DefaultTippy content={roles[`Holy_Imperil`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Holy_Imperil`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}

            {newmatch.Launcher == true ? 
            <DefaultTippy content={roles[`Launcher`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Launcher`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Tank == true ? 
            <DefaultTippy content={roles[`Tank`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Tank`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.HP_Heal_Ability == true ? 
            <DefaultTippy content={roles[`HP_Heal_Ability`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`HP_Heal_Ability`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Delay == true ? 
            <DefaultTippy content={roles[`Delay`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Delay`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Three_Delay == true ? 
            <DefaultTippy content={roles[`Three_Delay`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Three_Delay`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Disable == true ? 
            <DefaultTippy content={roles[`Disable`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Disable`].url})`}}
            ></li>
            </DefaultTippy>
                : ``}
            {newmatch.BRV_Shield == true ? 
            <DefaultTippy content={roles[`BRV_Shield`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Shield`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.BRV_Damage_Resist == true ?
            <DefaultTippy content={roles[`BRV_Damage_Resist`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Damage_Resist`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.HP_Damage_Resist == true ? 
            <DefaultTippy content={roles[`HP_Damage_Resist`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`HP_Damage_Resist`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.HP_Damage_Up == true ? 
            <DefaultTippy content={roles[`HP_Damage_Up`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`HP_Damage_Up`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Debuffer == true ? 
            <DefaultTippy content={roles[`Debuffer`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Debuffer`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Stacked_Debuff == true ? 
            <DefaultTippy content={roles[`Stacked_Debuff`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Stacked_Debuff`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Blind == true ? 
            <DefaultTippy content={roles[`Blind`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Blind`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Debuff_Evade == true ? 
            <DefaultTippy content={roles[`Debuff_Evade`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Debuff_Evade`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Debuff_Gold == true ? 
            <DefaultTippy content={roles[`Debuff_Gold`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Debuff_Gold`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}

            {newmatch.Battery == true ? 
            <DefaultTippy content={roles[`Battery`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Battery`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Trap == true ? 
            <DefaultTippy content={roles[`Trap`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Trap`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Trap_After_Trigger== true ? 
            <DefaultTippy content={roles[`Trap_After_Trigger`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Trap_After_Trigger`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Trap_Before_Turn== true ? 
            <DefaultTippy content={roles[`Trap_Before_Turn`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Trap_Before_Turn`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.BRV_Control == true ? 
            <DefaultTippy content={roles[`BRV_Control`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Control`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.BRV_Poison == true ? 
            <DefaultTippy content={roles[`BRV_Poison`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Poison`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Force_Break == true ? 
            <DefaultTippy content={roles[`Force_Break`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Force_Break`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Delete_Turns == true ?
            <DefaultTippy content={roles[`Delete_Turns`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Delete_Turns`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Cleanse == true ? 
            <DefaultTippy content={roles[`Cleanse`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Cleanse`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Dispel == true ? 
            <DefaultTippy content={roles[`Dispel`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Dispel`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Counter == true ? 
            <DefaultTippy content={roles[`Counter`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Counter`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.HP_Poison == true ? 
            <DefaultTippy content={roles[`HP_Poison`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`HP_Poison`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.BRV_Resist_Down == true ? 
            <DefaultTippy content={roles[`BRV_Resist_Down`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Resist_Down`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.HP_Resist_Down == true ? 
            <DefaultTippy content={roles[`HP_Resist_Down`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`HP_Resist_Down`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.KO_Prevent == true ? 
            <DefaultTippy content={roles[`KO_Prevent`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`KO_Prevent`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Four_Debuff == true ? 
            <DefaultTippy content={roles[`Four_Debuff`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Four_Debuff`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Fifty_HP_Heal_Ability == true ? 
            <DefaultTippy content={roles[`Fifty_HP_Heal_Ability`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Fifty_HP_Heal_Ability`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Six_Buffs == true ? 
            <DefaultTippy content={roles[`Six_Buffs`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Six_Buffs`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.HP_Regen == true ? 
            <DefaultTippy content={roles[`HP_Regen`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`HP_Regen`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.BRV_Regen == true ? 
            <DefaultTippy content={roles[`BRV_Regen`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Regen`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Two_Abilities_Recover == true ? 
            <DefaultTippy content={roles[`Two_Abilities_Recover`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Two_Abilities_Recover`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Crit_Rate_Up == true ? 
            <DefaultTippy content={roles[`Crit_Rate_Up`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Crit_Rate_Up`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Evade == true ? 
            <DefaultTippy content={roles[`Evade`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Evade`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Ignore_DEF == true ? 
            <DefaultTippy content={roles[`Ignore_DEF`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Ignore_DEF`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Buff_Extension == true ? 
            <DefaultTippy content={roles[`Buff_Extension`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Buff_Extension`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Break_Reset == true ? 
            <DefaultTippy content={roles[`Break_Reset`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Break_Reset`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Self_Harm == true ? 
            <DefaultTippy content={roles[`Self_Harm`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Self_Harm`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Ally_Turn_Manipulator== true ? 
            <DefaultTippy content={roles[`Ally_Turn_Manipulator`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Ally_Turn_Manipulator`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.FollowUp== true ? 
            <DefaultTippy content={roles[`FollowUp`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`FollowUp`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.FollowUp_Before_Player_Turn== true ? 
            <DefaultTippy content={roles[`FollowUp_Before_Player_Turn`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`FollowUp_Before_Player_Turn`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.FollowUp_Before_Ability== true ? 
            <DefaultTippy content={roles[`FollowUp_Before_Ability`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`FollowUp_Before_Ability`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.FollowUp_Extension== true ? 
            <DefaultTippy content={roles[`FollowUp_Extension`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`FollowUp_Extension`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.FollowUp_Start_Of_Next== true ? 
            <DefaultTippy content={roles[`FollowUp_Start_Of_Next`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`FollowUp_Start_Of_Next`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.FollowUp_Action_On_Enemy== true ? 
            <DefaultTippy content={roles[`FollowUp_Action_On_Enemy`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`FollowUp_Action_On_Enemy`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            
            {newmatch.Cannot_Break== true ? 
            <DefaultTippy content={roles[`Cannot_Break`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Cannot_Break`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Launch_Support== true ? 
            <DefaultTippy content={roles[`Launch_Support`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Launch_Support`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Continuous_Turns== true ? 
            <DefaultTippy content={roles[`Continuous_Turns`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Continuous_Turns`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Turn_Interrupter== true ? 
            <DefaultTippy content={roles[`Turn_Interrupter`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Turn_Interrupter`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.BRV_Ratio== true ? 
            <DefaultTippy content={roles[`BRV_Ratio`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Ratio`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.BRV_Absorb== true ? 
            <DefaultTippy content={roles[`BRV_Absorb`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Absorb`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.EX_MAX_Party== true ? 
            <DefaultTippy content={roles[`EX_MAX_Party`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`EX_MAX_Party`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Stacked_Buff== true ? 
            <DefaultTippy content={roles[`Stacked_Buff`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Stacked_Buff`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Stacked_Buff_Five== true ? 
            <DefaultTippy content={roles[`Stacked_Buff_Five`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Stacked_Buff_Five`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Reviver== true ? 
            <DefaultTippy content={roles[`Reviver`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Reviver`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Free_Ability== true ? 
            <DefaultTippy content={roles[`Free_Ability`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Free_Ability`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.BRV_Damage_Cap== true ? 
            <DefaultTippy content={roles[`BRV_Damage_Cap`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Damage_Cap`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Enemy== true ? 
            <DefaultTippy content={roles[`Enemy`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Enemy`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
            {newmatch.Character== true ? 
            <DefaultTippy content={roles[`Character`].name}>
            <li className="classdisplay filterinactive"
            style={{backgroundSize: "contain", 
            backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Character`].url})`}}
            ></li>
            </DefaultTippy>
            : ``}
        </>
    )
}
export default Role_Maker