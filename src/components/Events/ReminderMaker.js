import React, { useState } from "react";

export default function ReminderMaker({ eventdata }){
    const event = eventdata
    var makeDuration = function () {
        var minutes = Math.floor((+new Date(event.endsAt) - +new Date(event.startsAt)) / 60 / 1000);
        return "" + ("0" + Math.floor(minutes / 60)).slice(-2) + ("0" + minutes % 60).slice(-2);
    };
    var makeTime = function (time) { return new Date(time).toISOString().replace(/[-:]|\.\d{3}/g, ""); };
    var makeUrl = function (base, query) {
        return Object.keys(query).reduce(function (accum, key, index) {
            var value = query[key];
            if (value !== null) {
                return "" + accum + (index === 0 ? "?" : "&") + key + "=" + encodeURIComponent(value);
            }
            return accum;
        }, base);
    };
    var makeGoogleCalendarUrl = function () {
        return makeUrl("https://calendar.google.com/calendar/render", {
            action: "TEMPLATE",
            dates: makeTime(event.startsAt) + "/" + makeTime(event.endsAt),
            text: event.name,
            details: event.details
        });
    };
    var makeOutlookCalendarUrl = function () {
        return makeUrl("https://outlook.live.com/owa", {
            rru: "addevent",
            startdt: event.startsAt,
            enddt: event.endsAt,
            subject: event.name,
            body: event.details,
            allday: false,
            uid: new Date().getTime().toString(),
            path: "/calendar/view/Month"
        });
    };
    var makeYahooCalendarUrl = function () {
        return makeUrl("https://calendar.yahoo.com", {
            v: 60,
            view: "d",
            type: 20,
            title: event.name,
            st: makeTime(event.startsAt),
            dur: makeDuration(event),
            desc: event.details,
        });
    };
    var makeICSCalendarUrl = function () {
        var components = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "BEGIN:VEVENT"
        ];
        // In case of SSR, document won't be defined
        if (typeof document !== "undefined") {
            components.push("URL:" + document.URL);
        }
        components.push("DTSTART:" + makeTime(event.startsAt), "DTEND:" + makeTime(event.endsAt), "SUMMARY:" + event.name, "DESCRIPTION:" + event.details, "LOCATION:" + event.location, "END:VEVENT", "END:VCALENDAR");
        return encodeURI("data:text/calendar;charset=utf8," + components.join("\n"));
    };

    const [openup, setopenup] = useState(false)

    const openme = () => {
        openup ?
            setopenup(false) :
            setopenup(true)
    }

    return (
        <div className="chq-atc" onClick={openme}>
            <button type="button" className="chq-atc--button"><svg width="20px" height="20px" viewBox="5 5 80 85"><path id="path3026" d="M71.4,58.3c0-9.5,0-46.4,0-46.4h-2.6H16.8l-5.6,3.3v66.9h57.7v-6h8.3C77.2,76.2,71.4,71.6,71.4,58.3z   M67.6,48.3h-9.9V37.7h9.9V48.3z M43.5,25.5v10.6h-11V25.5H43.5z M45.1,25.5h11v10.6h-11V25.5z M20.6,25.5h10.2v10.6H20.6V25.5z   M20.6,37.7h10.2v10.6H20.6V37.7z M20.6,49.9h10.2v8.4c0,0.8,0,1.5,0,2.2H20.6V49.9z M32.4,58.3v-8.4h11v8.4c0,0.8,0,1.5,0,2.2h-11  C32.4,59.8,32.4,59.1,32.4,58.3z M32.4,48.3V37.7h11v10.6H32.4z M45.1,37.7h11v10.6h-11V37.7z M67.6,36.1h-9.9V25.5h9.9V36.1z   M30.9,62.1c0.4,5.4,1.8,8.5,3.1,10.3H23.4c-0.3-0.2-0.7-0.7-1.1-1.7c-0.7-1.4-1.5-4-1.6-8.6H30.9z M36.2,72.4  c-1.3-1.2-3.1-3.9-3.6-10.3h11c0.4,5.4,1.8,8.5,3.1,10.3H36.2z M48.8,72.4c-1.3-1.2-3.1-3.9-3.6-10.3h11c0.4,5.4,1.8,8.5,3.1,10.3  H48.8z M45.1,60.5c0-0.7,0-1.4,0-2.2v-8.4h11v8.4c0,0.8,0,1.5,0,2.2H45.1z M57.8,58.3v-8.4h9.9v8.4v1.6c0,0.2,0,0.4,0,0.5h-9.8  C57.8,59.8,57.8,59.1,57.8,58.3z M65.1,78.3H15v-61l1.8-1.1c0,10.2,0,35.4,0,44.2c0,14.6,5.7,15.7,5.7,15.7h42.5L65.1,78.3  L65.1,78.3z M68.9,72.4h-3.8h-3.5c-1.3-1.2-3.1-3.9-3.6-10.3h9.8c0.2,4,0.8,7.4,2,10.3H68.9z"></path></svg> Reminder</button>
            {openup == false ? "" :
                <div className="chq-atc--dropdown" role="presentation">
                    <a download="download" href={makeICSCalendarUrl()} target="_blank" rel="noopener noreferrer">Apple Calendar</a>
                    <a href={makeGoogleCalendarUrl()} target="_blank" rel="noopener noreferrer">Google</a>
                    <a href={makeOutlookCalendarUrl()} target="_blank" rel="noopener noreferrer">Outlook App</a>
                    <a href={makeYahooCalendarUrl()} target="_blank" rel="noopener noreferrer">Yahoo</a>
                </div>
            }
        </div>
    )
}