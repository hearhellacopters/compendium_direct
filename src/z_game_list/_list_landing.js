import React, { useState, useEffect } from 'react';
import Tippy from '../components/TippyDefaults'
import GameListAilment from './_list_ailment';
import GameListSpheres from './_list_spheres';
import GameListAbility from './_list_ability';
import GameListPassive from './_list_passive';
import GameListGear from './_list_gear';
import { Link } from 'react-router-dom'

const list_landing = ({
    ver,
    file,
    loc,
    match,

    master_index,

    Access,

    gamelist_ailment,
    gamelist_ability,
    gamelist_passive,
    gamelist_sphere,
    gamelist_gear,
}) => {

    const headers = {
        "ailments": "Buffs & Debuffs",
        "passives": "Passives",
        "spheres": "Spheres",
        "gear": "Gear",
        "abilities": "Abilities"
    }

    return (
        <>
            <h1>{`${ver} ${headers[file]}`}
            </h1>
            <div className="subheader">
                <Link to={`/GL/gamelist/${file}`}>
                    <Tippy content="GL">
                        <span className={`${ver == "GL" ? "filteractive" : "filterinactive"} buffbutton ver_gl`}></span>
                    </Tippy>
                </Link>
                <Link to={`/JP/gamelist/${file}`}>
                    <Tippy content="JP">
                        <span className={`${ver == "JP" ? "filteractive" : "filterinactive"} buffbutton ver_jp`}></span>
                    </Tippy>
                </Link>
            </div>
            {file == "ailments" ?
                <GameListAilment
                    ver={ver}
                    loc={loc}
                    file={file}
                    match={match}

                    ProcessedBuffs={gamelist_ailment}

                    master_index={master_index}

                    Access={Access}
                />
                : ""}
            {file == "spheres" ?
                <GameListSpheres
                    ver={ver}
                    loc={loc}
                    file={file}
                    match={match}

                    ProcessedSpheres={gamelist_sphere}

                    master_index={master_index}

                    Access={Access}
                />
                : ""}
            {file == "abilities" ?
                <GameListAbility
                    ProcessedAbilities={gamelist_ability}

                    ver={ver}
                    loc={loc}
                    file={file}

                    master_index={master_index}
                    Access={Access}

                    formatting={true}
                />
                : ""}
            {file == "gear" ?
                <GameListGear
                    ProcessedGear={gamelist_gear}
                    ver={ver}
                    loc={loc}
                    master_index={master_index}
                    Access={Access}
                    formatting={true}
                />
                : ""}
            {file == "passives" ?
                <GameListPassive
                    ProcessedPassives={gamelist_passive}
                    ver={ver}
                    loc={loc}
                    file={file}

                    master_index={master_index}
                    Access={Access}
                    formatting={true}
                />
                : ""}
        </>
    )
}
export default list_landing