import React from 'react';
import Tippy from '../../components/TippyDefaults';
import { Link } from 'react-router-dom'
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';

function EnemyListing({ 
    match, 
    ProcessedCharacters, 
    PartnerCharacters, 
    jptoggledata,
    scrollPosition 
}){

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
                    <LazyLoadImage 
                    scrollPosition={scrollPosition}
                    effect="opacity" 
                    className="enemycard" 
                    alt={match.Name} 
                    src={"/images/static/enemy/face/" + match.url}/>
                </li>
            </Tippy>
            
            {(()=>{
                if(match.JPOnly == true){
                    return (
                        <Tippy content="JP Only" className="tooltip" >
                            <span className="smallJPflag"></span>
                        </Tippy>
                    )
                }
            })()}
            {(()=>{
                if(match.LufeniaFlag == true && match.ShinryuFlag != true ){
                    return (
                        <Tippy content="Lufenia" className="tooltip" >
                            <span className="lufflag"></span>
                        </Tippy>
                    )
                } else if(match.LufeniaPlusFlag == true && match.ShinryuFlag != true){
                    return (
                        <Tippy content="Lufenia+" className="tooltip" >
                            <span className="lufplusflag"></span>
                        </Tippy>
                    )
                } else if(match.ShinryuFlag == true){
                    return (
                        <Tippy content="Shinryu" className="tooltip" >
                            <span className="shinflag"></span>
                        </Tippy>
                    )
                }
            })()}
        </Link>
    )

}
export default trackWindowScroll(EnemyListing)