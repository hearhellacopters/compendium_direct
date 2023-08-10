import React from 'react';
import EnemyAbilitiesFormattingDirect from './EnemyAbilitiesFormatting'
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';

function EnemyAbilitiesListing({ 
    match, 
    enemy_id, 
    showmeraw, 
    abilitylist, 
    showai,
    scrollPosition 
}){

    match.sort((a, b) => a.data_id - b.data_id);

    return (
        <>
            {match.map(abilities => (
                abilities != undefined ?
                    <LazyLoadComponent
                    key={abilities.data_id}
                    scrollPosition={scrollPosition}
                    placeholder={<div className="buffunit"><div style={{minHeight:"250px"}} className="infoholder"/>
                                <img className="loadingbardots" src="https://dissidiacompendium.com/images/static/site/loading.gif"/>
                                </div>}
                    >
                    <EnemyAbilitiesFormattingDirect
                        key={abilities.data_id}
                        pull={false}
                        match={abilities}
                        enemy_id={enemy_id}
                        nolink={true}
                        showmeraw={showmeraw}
                        abilitylist={abilitylist}
                        showai={showai}
                    />
                    </LazyLoadComponent>
                    : ""
            ))}
        </>
    )

}

export default trackWindowScroll(EnemyAbilitiesListing)