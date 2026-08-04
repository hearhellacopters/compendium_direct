import React, { useState, useEffect } from 'react';

export default function DirectEventImages ({
    images,
    ver
}) {

    const [selected, setselected] = useState(images[0])
    const [url, seturl] = useState(`/images/static/banners/${ver.toLowerCase()}/event/eventtitle${images[0]}out.png`)

    useEffect(() => {
        seturl(`/images/static/banners/${ver.toLowerCase()}/event/eventtitle${selected}out.png`)
    }, [selected, ver])


    return (
        <div className='eventtabs'>
            <div className='eventwithbackgorundtabs withshadow'>
                <img className='eventimage' src={url} />
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
    )
}