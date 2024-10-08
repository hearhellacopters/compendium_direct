import React, { useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import Random from '../processing/random'
import { ObjectView } from 'react-object-view'
import {getQuery} from './URLParams'

export default function LoadHelper(){

    const randomimage = Random(7);

    const [timeout, settimeout] = useStateIfMounted(false)

    useEffect(() => {
        setTimeout(() =>
            settimeout(true)
            , 25000)
    }, [settimeout])

    const { pathname } = window.location;
    const query = getQuery();
    const url = `${pathname}?${query.toString()}`;

    const make_error = ()=>{
        const message = window.localStorage.getItem("err_mes")
        if(message!= undefined){
            return <span style={{maxWidth:"450px"}} className='center'>
                    <ObjectView 
                    options={
                        {
                            hideDataTypes: true,
                            expandLevel: 1
                        }
                        }
                    data={JSON.parse(message)} 
                    />
                </span>
        }
        return  ""
    }

    return (
        timeout == false
            ?
            <div className="content loading2"><h1><img className="loadingbardots" src={"https://dissidiacompendium.com/images/static/site/loading.gif"}></img></h1></div>
            :
            <div className="content loading2">
                <h1><img className="loadingbardots" src={"https://dissidiacompendium.com/images/static/site/loading.gif"}></img></h1>
                <div className='subheader infolocation'>Location: {url}</div>
                <div className="filterholder">
                    <div className="filterholderflair" >
                        <div className="nolinksholder"><img alt="oh no" src={`https://dissidiacompendium.com/images/static/icons/404/${randomimage}.png`} />
                        </div>
                        <div className="infobase Debuffbase centertext warning">
                            Loading is taking longer than normal<br />
                            Please make sure you have a strong connection<br /><br />
                            We recommend <a className="updatelink" rel="noreferrer noopener" target="_blank" href={`https://www.google.com/chrome/`}>Google Chrome Browser</a><br />
                            for maximum compatibility<br /><br />
                            If issues persistent, please notify <a className="updatelink" rel="noreferrer noopener" href="https://drive.google.com/open?id=1IJE93eDUcKIEKuQH0jwMZ7WaWVcrldUqbc6EyEZRrzs" target="_blank">admins</a><br />
                            <br/>
                            {make_error()}
                        </div>
                    </div>
                </div>
            </div>
    )
}