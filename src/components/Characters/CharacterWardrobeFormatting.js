import React from 'react';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom'
import Tippy from '../../components/TippyDefaults.js';

function CharacterWardrobeFormatting({
    match,
    all,
    scrollPosition
}){

    const fullcount = []

    if (match && match.ArtworkCount > 1) {
        for (let i = 1, len = match.ArtworkCount; i < len; i++) {
            const makenew = {
                key: i + 1,
                CharacterURLName: match.CharacterURLName,
                CrystalColor: match.CrystalColor,
                CharacterName: match.CharacterName,
                ShortName: match.ShortName
            }
            fullcount.push(makenew)
        }
    }

    const makeall = []

    if (match && match.ArtworkCount) {
        for (let i = 0, len = match.ArtworkCount; i < len; i++) {
            const makenew = {
                key: i + 1,
                CharacterURLName: match.CharacterURLName,
                CrystalColor: match.CrystalColor,
                CharacterName: match.CharacterName,
                ShortName: match.ShortName
            }
            makeall.push(makenew)
        }
    }

    return (
        all == true ?
            match.ArtworkCount > 1 ?
                makeall.map(self => (
                    <div key={self.key + self.ShortName} className="charimagetoptopholder padd5">
                        <Tippy content={self.CharacterName}>
                            <div className={`chartopimageholder charbackground${self.CrystalColor}`}>
                                <Link to={'/characters/' + self.ShortName}>
                                    <LazyLoadImage 
                                    scrollPosition={scrollPosition}
                                    effect="opacity" 
                                    className="charmanimage"
                                    alt={self.CharacterName} 
                                    src={`https://dissidiacompendium.com/images/static/characters/${self.CharacterURLName}/c${self.key}.png`} />
                                </Link>
                            </div>
                        </Tippy>
                    </div>
                ))
                :
                <div className="charimagetoptopholder padd5">
                    <Tippy content={match.CharacterName}>
                        <div className={`chartopimageholder charbackground${match.CrystalColor}`}>
                            <Link to={'/characters/' + match.ShortName}>
                                <LazyLoadImage 
                                scrollPosition={scrollPosition}
                                effect="opacity" 
                                className="charmanimage" 
                                alt={match.CharacterName} 
                                src={`https://dissidiacompendium.com/images/static/characters/${match.CharacterURLName}/c1.png`} />
                            </Link>
                        </div>
                    </Tippy>
                </div>
            :
            match.ArtworkCount > 1 && fullcount.length != 0 ?
                fullcount.map(self => (
                    <div key={self.key + self.ShortName} className="charimagetoptopholder padd5">
                        <Tippy content={self.CharacterName}>
                            <div className={`chartopimageholder charbackground${self.CrystalColor}`}>
                                <Link to={'/characters/' + self.ShortName}>
                                    <LazyLoadImage 
                                    scrollPosition={scrollPosition}
                                    effect="opacity" 
                                    className="charmanimage" 
                                    alt={self.CharacterName} 
                                    src={`https://dissidiacompendium.com/images/static/characters/${self.CharacterURLName}/c${self.key}.png`} />
                                </Link>
                            </div>
                        </Tippy>
                    </div>
                ))
                :
                ""
    )
}

export default trackWindowScroll(CharacterWardrobeFormatting)