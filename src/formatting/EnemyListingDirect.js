import React from 'react';
import Tippy from './TippyDefaults';
import '../Bestiary.css'
import '../formatting/EnemyFormatting.css'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const EnemyListingDirect = ({ match, ProcessedCharacters, PartnerCharacters, jptoggledata }) => {

    const cleaner = (text) => {
        return text.toString().replace(/^(\d*)(.*)/, "$1")
    }

    return (
        <Link key={match.battle_enemy_id} to={`/bestiary/enemies/${match.battle_enemy_id}`}>
            <Tippy content={
                <span>
                    {match.Name}
                    <br />
                    ID: {cleaner(match.battle_enemy_id)}
                </span>
            } className="tooltip" >
                <li className="enemyholderli">
                    <LazyLoadImage className="enemycard" alt={match.Name} src={"https://dissidiacompendium.com/images/static/enemy/face/" + match.url} effect="opacity" />
                </li>
            </Tippy>
            <Tippy content="JP Only" className="tooltip" >
                <span className={match.JPOnly == true ? "smallJPflag" : ""}></span>
            </Tippy>
            <Tippy content="Lufenia" className="tooltip" >
                <span className={match.LufeniaFlag == true && match.ShinryuFlag != true ? "lufflag" : ""}></span>
            </Tippy>
            <Tippy content="Lufenia+" className="tooltip" >
                <span className={match.LufeniaPlusFlag == true && match.ShinryuFlag != true ? "lufplusflag" : ""}></span>
            </Tippy>
            <Tippy content="Shinryu" className="tooltip" >
                <span className={match.ShinryuFlag == true ? "shinflag" : ""}></span>
            </Tippy>
        </Link>
    )

}
export default EnemyListingDirect;