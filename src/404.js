import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom'
import Random from './processing/Random.js'

const NotFound = () => {
      
    const randomimage = Random(7);

    return(
        <div className="wrapper">
            <Helmet>
                <title>Page Not Found - Dissidia Compendium</title>
            </Helmet>
            <div className="content fullheight">
                <h1>Page not found</h1>
                <div className="filterholder">
                    <div className="filterholderflair" >
                        <img alt="oh no" src={`https://dissidiacompendium.com/images/static/icons/404/${randomimage}.png`}/>
                        <br/>
                        <Link className="updatelink" to={`/`}>
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound;