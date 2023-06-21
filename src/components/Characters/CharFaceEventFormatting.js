import React, { useState } from 'react';
import CharacterFaceFormatting from '../Characters/CharacterFaceFormatting';

export default function CharFaceEventFormatting({
    self,
    char_id
}){

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
                                link={""}
                            />
                        ))}
                    </ul>
                </div>
            }
        </div>
    )
}