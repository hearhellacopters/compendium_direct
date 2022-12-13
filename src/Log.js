import React from 'react'
import { Link } from 'react-router-dom'

const log = () => {
    return (
        <div className="">
            <div className="content fullheight">
                <h1>Update Log</h1>
                <div className="creditsholder">
                    <div className="filterholderflair" >
                        V.5.1
                    </div>
                    <ul className="creditslist">
                        ┬ Header bar now floats in desktop view<br />
                        └─ For constant access to version and player<br />
                        - Added ability compare to rework page
                    </ul>
                    <div className="filterholderflair" >
                        V.5.0
                    </div>
                    <ul className="creditslist">
                        <li>
                            ┬ Site now uses split databases for GL and JP<br />
                            ├─ Rework, Enemy and Summon pages will remain unchanged<br />
                            ├─ Spoiler tags now on some content<br />
                            ├─ Automated Character / ability / buff class tagging<br />
                            ├─ Character Cards change background based on gear released<br />
                            └─ Cross character searchable direct data in search tabs<br />
                            ┬ Direct Buff Data<br />
                            ├─ Added official text to buffs<br />
                            ├─ Ordered buffs based on ability<br />
                            ├─ Added New Icons for Battle States<br />
                            ├─ Added Stats Totals toggle to Battle States<br />
                            ├─ Added links to Force Time page<br />
                            ├─ Added passive increases to buffs<br />
                            ├─ Added ability upgrades to buffs<br />
                            ├─ Added totaled values on Force Time buffs<br />
                            └─ Added simple button filters<br />
                            ┬ Direct Abilities Data<br />
                            ├─ Added Ability Use / Speed Increases<br />
                            ├─ Added Passive increases<br />
                            ├─ Added Stats Total toggle to Ability passives<br />
                            ├─ Added Ability tags based on Elements, Damage type etc<br />
                            ├─ Added Starting casts / Battle States to Call abilities<br />
                            ├─ Added Force Time Battle State to FR Abilities<br />
                            ├─ Abilities default to just the highest upgraded <br />
                            ├── All still available with Upgraded toggle off<br />
                            ├─ Follow Up / Counters / Traps now sit a bottom of list<br />
                            └─ Added simple button filters<br />
                            ┬ Direct Passives Data<br />
                            ├─ Merged Passives pages under Passives tab<br />
                            ├─ Simplified ability upgrades display<br />
                            └─ Added simple button filters<br />
                            ┬ Direct Gear Data<br />
                            └─ Gear data restricted to only versions they are found in<br />
                            ┬ Direct Spheres Data<br />
                            ├─ Sphere data restricted to only versions they are found in<br />
                            └─ Simplified condition filters<br />
                            - Upgraded Enemy Force Time Helpers based on current version<br />
                            - Expanded Ability hit data display for better readability<br />
                            - Sorted Advance Classes by in-game types<br />
                            <br />
                            Backend changes:<br />
                            ┬ Improved performance on pages<br />
                            └─ Minimized data load for better mobile loading <br />
                            - Added passive based conditional casts to buff page<br />
                            - Added Weapon skins to Wardrobe page<br />
                            - Added Notes systems for commands and buff context<br />
                            - Added Direct Ultima weapons data to Ultima page<br />
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.4.7
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Enemy pages now supports JP text
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.4.6
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Enemy Character Helpers now use 'force time' format
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.4.5
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Added Deal Capped BRV Damage role
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.4.4
                    </div>
                    <ul className="creditslist">
                        <li>
                            ┬ Added FR Boards<br />
                            ├─ Key passives Echo and FR Extension on passive page<br />
                            └─ FR Abilities with Extension have different colored icon<br />
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.4.3
                    </div>
                    <ul className="creditslist">
                        <li>
                            ┬ Revamped Force Weapons page to Force Time<br />
                            ├─ Get top line conditions and HP bonus values<br />
                            ├─ Displays characters who also help meet the conditions<br />
                            └─ View the page <Link className="updatelink" to="/characters/forcetime">Here</Link><br />
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.4.2.5
                    </div>
                    <ul className="creditslist">
                        <li>
                            ┬ Updated Music Player<br />
                            ├─ Now sorts with newest added music first<br />
                            ├─ Ability to edit the playlist from the <Link className="updatelink" to="/search/music">Search / Music tab</Link><br />
                            └─ Create up to 3 custom playlists (local save)
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.4.2
                    </div>
                    <ul className="creditslist">
                        <li>
                            ┬ Moved Rework page<br />
                            ├─ Now a main category in character section<br />
                            ├─ Icon turns red when character has active reworks<br />
                            └─ Upgrades for upcoming BT+ reworks<br />
                            - Added rework button on Gear search
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.4.1
                    </div>
                    <ul className="creditslist">
                        <li>
                            ┬ Better Sorting<br />
                            ├─ Sorting Characters by realm mirrors game's in-series order<br />
                            ├─ Stats sorting now takes new estimated JP current best stats possible (non-synergy / UT)<br />
                            └─ Stats also visible in character page's stats tool tip<br />
                            ┬ Added <Link className="updatelink" to="/characters/wardrobe">Wardrobe page</Link><br />
                            └─ View all character artwork and outfits<br />
                            ┬ Direct Update<br />
                            ├─ Added Update Time stamp to direct pages<br />
                            └─ Bug fixes<br />
                            - Merged Roles to "Prevent break / BRV Floor"
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.4.0
                    </div>
                    <ul className="creditslist">
                        <li>
                            ┬ Compendium Direct is now Live!<br />
                            └─ New tab added to character pages<br />
                            ┬ Added Enemy AI to enemy abilities!<br />
                            ├─ Happy to add this after a long testing phase<br />
                            └─ Display AI button shows calculations for enemy abilities<br />
                            ┬ New "mid size" site formatting for mobile devices <br />
                            └─ Get the Desktop experience on mobile! (800px+)<br />
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.8
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Merged all Force Enhancement increases directly to their abilities<br />
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.7
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Youtube embeds enabled for community links<br />
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.6
                    </div>
                    <ul className="creditslist">
                        <li>
                            ┬ Added Roles to reflect "additional attack" programming<br />
                            ├─ Triggered before ability<br />
                            ├─ Triggered before Player turn<br />
                            ├─ Trap before Enemy turn<br />
                            ├─ Trap after Enemy turn  (or triggered)<br />
                            ├─ Triggered at start of next turn<br />
                            ├─ Triggered on action against Enemy<br />
                            └─ Ability extension Follow Up<br />
                            - Added Free Ability Use role<br />
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.5
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Added new Roles based on Character Feature system<br />
                        </li>
                        <li>
                            - Added Spiritus Enemy Button in Bestiary<br />
                        </li>
                        <li>
                            - Added Level 50 Summons<br />
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.4.3
                    </div>
                    <ul className="creditslist">
                        <li>
                            ┬ Data backend update for better caching<br />
                            {" └─ outside of US should see better loading"}
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.4.2
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Updated Enemy Bestiary backend
                        </li>
                        <li>
                            - Added New details Bestiary view
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.4.1
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Added Enemy Orb Helper sub-section to character event pages
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.4.0
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Added FR Weapons!
                        </li>
                        <li>
                            - Added new character filters for FR weapons and passives
                        </li>
                        <li>
                            - Added updated enemy data for Shinyru level enemies
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.3.5
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Added infographics to select enemy pages
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.3.4
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Added mini JP/GL toggle to the top of all pages
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.3.3
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Updated Icons for JP current
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.3.2
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Added character sayings to character profiles
                        </li>
                        <li>
                            - Added character stickers to character profiles
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.3.1
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Added custom music playlists in Search / Music
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.3
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Added quest start and wave start buffs to call abilities
                        </li>
                        <li>
                            - Added Dimension Level enemies toggle to bestiary
                        </li>
                        <li>
                            - Added Can not Break filter to character page
                        </li>
                        <li>
                            - Upgraded timers
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.2
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Version toggle button is properly labeled to GL / JP Current
                        </li>
                        <li>
                            - Added dedicated rework pages under character passives
                        </li>
                        <li>
                            - Event links can be found in banners
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.1.9.6
                    </div>
                    <ul className="creditslist">
                        <li>
                            ┬  To keep the most relevant data at the top,<br />
                            {" └─ GL events and banners default to oldest current running events first"}
                        </li>
                        <li>
                            - Revamped Forecast Page
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.1.9.5
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Added Buffs / Debuffs holders to battle states
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.1.9
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Improved loading time of character landing pages
                        </li>
                        <li>
                            - Added loading screen error message
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.1.8
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Added Forecast Page
                        </li>
                        <li>
                            - Simplified Passive Sub page
                        </li>
                        <li>
                            - Added Gear All Armor and All Weapons Sub pages
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.1.7
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Merged Music players
                        </li>
                        <li>
                            - Music Search controls mini player
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.1.6
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Added Music Player
                        </li>
                        <li>
                            - Added Music Search
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.1.5
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Added Bestary Buff and Ability Search
                        </li>
                        <li>
                            - Added Abilities tab to Battle Enemy
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.1.4
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Ultima Weapons Added
                        </li>
                        <li>
                            - Level 90 added
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.1.3
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Revamped enemy starting buffs
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.1.2
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Added Sorting options to characters page
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.1.1
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Added Stickers page to search area
                        </li>
                        <li>
                            - Added Merge filter to gear
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.1.0
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Added JP Reference text for  Buffs, Gear, Spheres, Passives and Summons
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.0.9
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Added Share button on characters buffs, abilities, event and banners pages
                        </li>
                        <li>
                            - Charged layout and function of abilities page
                        </li>
                        <li>
                            - Added JP  for characters, enemies and abilities
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.0.8
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Added Share button on spheres, gear and passive pages
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.0.7
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Added Share button on bestiary
                        </li>
                        <li>
                            - Fixed timers on character releases
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.0.6
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Added conds to alt attacks
                        </li>
                        <li>
                            - Added Party HP Damage Up filter
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.0.5
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Merged Boards on build
                        </li>
                        <li>
                            - Added UrlParams to Bestary, Events, Banners, Calendar, Panels
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.0.4
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Diff Comparing rework passives
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.0.3
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Added Non-Elemental tag
                        </li>
                        <li>
                            - Text added events for GL / JP versioning
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.0.2
                    </div>
                    <ul className="creditslist">
                        <li>
                            - Added Release timers for GL Gear
                        </li>
                        <li>
                            - Added Rework timers for Abilities and Buffs
                        </li>
                        <li>
                            - Added App Update Log
                        </li>
                        <li>
                            - Added that thing no one has found yet
                        </li>
                    </ul>
                    <div className="filterholderflair" >
                        V.3.0.1
                    </div>
                    <ul className="creditslist">
                        <li>
                            ┬ Added Artifact Priorities to quick profiles <br />
                            {" └─ (also on artifact pages)"}
                        </li>
                        <li>
                            - Added GL / JP Icon to Calendar for easy distinction
                        </li>
                        <li>
                            - Added two new classes, Last Stand and Reviver
                        </li>
                        <li>
                            - Added ability to search enemies by ID number
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default log;