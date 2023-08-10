import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { LazyLoadImage} from 'react-lazy-load-image-component';
import CharacterFaceFormatting from './CharacterFaceFormatting';
import format_cleaner from '../../processing/format_cleaner';
import TickUp from '../tickUp.js'
import TickDown from '../tickUp.js'

export default function CharacterEventFormatting({
    self,
    ver,
    char_id,
    ProcessedEventsIndex
}){

    const get_event_id = Object.values(ProcessedEventsIndex).filter(self2 =>
        typeof self2.field_id === "object" ?
            self2.field_id.some(self3 => self3 == self.id)
            : typeof self2.field_id === "number" ?
                self2.field_id == self.id
                : ""
    )

    function ordinal(n) {
        var s = ["th", "st", "nd", "rd"];
        var v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const ct = new Date().getTime();

    const make_date = (release) => {
        if (ver == "JP") {
            const date_check = new Date(`${release.toString().replace(/ /, "T")}.000+09:00`);
            return date_check
        } else {
            const date_check2 = new Date(`${release.toString().replace(/ /, "T")}Z`);
            return date_check2
        }
    }

    const loc = get_event_id[0] && get_event_id[0].id

    const images = self.images || []

    const [selected, setselected] = useState(self.images && self.images[0] || 0)

    const [url, seturl] = useState(`https://dissidiacompendium.com/images/static/banners/${ver.toLowerCase()}/event/eventtitle${images[0]}out.png`)

    useEffect(() => {
        seturl(`https://dissidiacompendium.com/images/static/banners/${ver.toLowerCase()}/event/eventtitle${selected}out.png`)
    }, [selected, ver])

    const [showcharacters, setshowcharacters] = useState(false)

    return (
        <>
            <div className='singleeventtitlebanner'>
                <h3 className={`toevents ${get_event_id.length != 0 ? "clicky" : ""}`}>
                    {get_event_id.length != 0 ?
                        <Link className="toevents" to={"/events/" + get_event_id[0].id}>
                            {format_cleaner(self.name)}
                        </Link>
                        :
                        format_cleaner(self.name)}
                </h3>
                <div className='infolocation size12'>{format_cleaner(self.sub)}</div>
                <div className="greencolor tickholder">
                    <TickUp value={months[new Date(make_date(self.start)).getMonth()]} /><TickUp value={ordinal(new Date(make_date(self.start)).getDate())} /><TickUp value={new Date(make_date(self.start)).getFullYear()} />
                </div>
                {new Date(make_date(self.end)) < new Date("2029-01-01T00:00:00Z") ?
                    <div className="tickholder redcolor">
                        <TickDown value={months[new Date(make_date(self.end)).getMonth()]} /><TickDown value={ordinal(new Date(make_date(self.end)).getDate())} /><TickDown value={new Date(make_date(self.end)).getFullYear()} />
                    </div>
                : ""}
            </div>
            {self.images != undefined ?
                <div className="eventimageholder">
                    <div className="eventholder" style={{ minHeight: "100px" }}>
                    {loc != undefined ?
                        <div className='eventtabs'>
                            <Link to={"/events/" + loc}>
                                <div className={`eventwithbackgorundtabs withshadow ${loc != undefined ? "clicky" : ""}`}>
                                    <LazyLoadImage 
                                    placeholder={<div className='eventimage'/>}
                                    effect="opacity" 
                                    className='eventimage' 
                                    src={url} 
                                    />
                                </div>
                            </Link>
                            {images && images.length > 1 ?
                                <ul className='eventablist'>
                                    {images && images.map((self, i) => (
                                        <li onClick={() => setselected(self)} key={i} className={`${self == selected ? "activeeventtab" : "inactiveeventtab"}`}>
                                            {`Event ${i + 1}`}
                                        </li>
                                    ))}
                                </ul>
                            : ""}
                        </div>
                    :
                        <div className='eventtabs'>
                            <div className='eventwithbackgorundtabs withshadow'>
                                <LazyLoadImage 
                                effect="opacity" 
                                className='eventimage' 
                                src={url} 
                                />
                            </div>
                            {images && images.length > 1 ?
                                <ul className='eventablist'>
                                    {images && images.map((self, i) => (
                                        <li onClick={() => setselected(self)} key={i} className={`${self == selected ? "activeeventtab" : "inactiveeventtab"}`}>
                                            {`Event ${i + 1}`}
                                        </li>
                                    ))}
                                </ul>
                                : ""}
                        </div>
                    }
                    </div>
                </div>
                : ""}
            {self.char_ids != undefined ?
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
                                        link={""}
                                        list={true}
                                    />
                                ))}
                            </ul>
                        </div>
                    }
                </div>
            : ""}
        </>
    )

}