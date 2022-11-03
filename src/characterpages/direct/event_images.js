import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Event_Images = ({
    images,
    ver,
    loc
}) =>{

    const [selected,setselected] = useState(images[0])
    const [url,seturl] = useState(`https://dissidiacompendium.com/images/static/banners/${ver.toLowerCase()}/event/eventtitle${images[0]}out.png`)

    useEffect(()=>{
        seturl(`https://dissidiacompendium.com/images/static/banners/${ver.toLowerCase()}/event/eventtitle${selected}out.png`)
    },[selected,ver])
    
    if(loc != undefined){
        return (
            <div className='eventtabs'>
                <Link to={"/events/" + loc}>
                <div className={`eventwithbackgorundtabs withshadow ${loc != undefined ? "clicky" :""}`}>
                    <LazyLoadImage effect="opacity" className='eventimage' src={url}/>
                </div>
                </Link>
                {images && images.length > 1 ?
                <ul className='eventablist'>
                {images && images.map((self,i)=>(
                    <li onClick={()=>setselected(self)} key={i} className={`${self==selected ? "activeeventtab" : "inactiveeventtab" }`}>
                        {`Event ${i+1}`}
                    </li>
                ))}
                </ul>
                :""}
            </div>
        )
    } else {
        return (
            <div className='eventtabs'>
                <div className='eventwithbackgorundtabs withshadow'>
                    <LazyLoadImage effect="opacity" className='eventimage' src={url}/>
                </div>
                {images && images.length > 1 ?
                <ul className='eventablist'>
                {images && images.map((self,i)=>(
                    <li onClick={()=>setselected(self)} key={i} className={`${self==selected ? "activeeventtab" : "inactiveeventtab" }`}>
                        {`Event ${i+1}`}
                    </li>
                ))}
                </ul>
                :""}
            </div>
        )
    }
    
}
export default Event_Images