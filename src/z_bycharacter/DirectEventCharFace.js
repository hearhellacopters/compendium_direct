import React, { useState, useEffect } from 'react';
import CharacterFaceFormatting from '../components/Characters/CharacterFaceFormatting';

export default function DirectEventCharFace ({
    self,
    char_id
}) {

    const [showcharacters, setshowcharacters] = useState(false)

    return (
        <div className='zone'>
            <div className="featuredbanner">
                <div onClick={() => setshowcharacters((prevstate) => !prevstate)} className='loadmorespheres'>
                    {showcharacters == false ? "Show Characters" : "Hide Characters"}
                </div>
            </div>
            {showcharacters == false ?
                ""
                :
                <div className='charholderflair'>
                    <ul className='CharListHolder'>
                        {self.char_ids.map((self, i) => (
                            <CharacterFaceFormatting
                                key={i}
                                id={self}
                                char_id={char_id}
                                list={true}
                            />
                        ))}
                    </ul>
                </div>
            }
        </div>
    )
}