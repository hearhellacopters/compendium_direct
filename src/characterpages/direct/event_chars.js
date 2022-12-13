import React, { useState, useEffect } from 'react';
import Char_Face_Maker from './Char_Face_Maker';

const Event_Chars = ({
    self,
    char_id
}) => {

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
                            <Char_Face_Maker
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
export default Event_Chars