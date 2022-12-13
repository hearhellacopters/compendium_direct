import React from "react";
import { Link } from 'react-router-dom'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import Format_Cleaner from '../../processing/Format_Cleaner'
import Tippy from '../../formatting/TippyDefaults'
import TickUp from '../../processing/tickUp'
import TickDown from '../../processing/tickDown'
import Event_Images from './event_images';
import Event_Chars from './event_chars';

const Event_Direct_Single = ({
    self,
    ver,
    char_id,
    ProcessedEventsIndex,
}) => {

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

    return (
        <div>
            <div className='singleeventtitlebanner' style={{ minHeight: "65px" }}>
                <LazyLoadComponent>
                    <h3 className={`atevents ${get_event_id.length != 0 ? "clicky" : ""}`}>
                        {get_event_id.length != 0 ?
                            <Link className="toevents" to={"/events/" + get_event_id[0].id}>
                                {Format_Cleaner(self.name)}
                            </Link>
                            :
                            Format_Cleaner(self.name)}
                    </h3>
                    <div className='infolocation size12'>{Format_Cleaner(self.sub)}</div>
                    <div className="greencolor tickholder">
                        <TickUp value={months[new Date(make_date(self.start)).getMonth()]} /><TickUp value={ordinal(new Date(make_date(self.start)).getDate())} /><TickUp value={new Date(make_date(self.start)).getFullYear()} />
                    </div>
                    {new Date(make_date(self.end)) < new Date("2029-01-01T00:00:00Z") ?
                        <div className="tickholder redcolor">
                            <TickDown value={months[new Date(make_date(self.end)).getMonth()]} /><TickDown value={ordinal(new Date(make_date(self.end)).getDate())} /><TickDown value={new Date(make_date(self.end)).getFullYear()} />
                        </div>
                        : ""}
                </LazyLoadComponent>
            </div>
            {self.images != undefined ?
                <div className="eventimageholder">
                    <div className="eventholder" style={{ minHeight: "100px" }}>
                        <LazyLoadComponent>
                            <Event_Images
                                key={self.id}
                                images={self.images}
                                ver={ver}
                                loc={get_event_id[0] && get_event_id[0].id}
                            />
                        </LazyLoadComponent>
                    </div>
                </div>
                : ""}
            {self.char_ids != undefined ?
                <Event_Chars
                    key={self.id}
                    self={self}
                    char_id={char_id}
                />
                : ""}
        </div>
    )
}
export default Event_Direct_Single