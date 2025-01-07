
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import DefaultTippy from './components/TippyDefaults.js'
import { Link, Redirect } from 'react-router-dom'

export default function HomeDev () {
  return (
    <div className="">
      <Helmet>
        <title>Dissidia Compendium | Home</title>
        <meta property="og:site_name" content="Dissidia Compendium Direct" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content="Dissidia Final Fantasy Opera Omnia mobile game Database. We provide a fully english, completely merged (both Global and Japneese version) database of translations for all character abilities, enemies and summons, as well as a complete timeline of game events with community guides." />
        <meta name="twitter:title" content="Dissidia Compendium Direct" />
        <meta name="twitter:description" content="Dissidia Final Fantasy Opera Omnia mobile game Database. We provide a fully english, completely merged (both Global and Japneese version) database of translations for all character abilities, enemies and summons, as well as a complete timeline of game events with community guides." />
        <meta name="twitter:image" content="https://dissidiacompendium.com/images/static/site/logo512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content="Dissidia Compendium Direct" />
        <meta property="og:title" content="Dissidia Compendium Direct" />
        <meta property="og:description" content="Dissidia Final Fantasy Opera Omnia mobile game Database. We provide a fully english, completely merged (both Global and Japneese version) database of translations for all character abilities, enemies and summons, as well as a complete timeline of game events with community guides." />
        <meta property="og:image" content="https://dissidiacompendium.com/images/static/site/logo512.png" />
        <meta property="og:url" content="https://direct.dissidiacompendium.com" />
      </Helmet>
      <div className="content">
        <h1 className="maintitle" >Welcome to Dissidia Compendium Direct <Link className="updatelink" to="/log">v2.1!</Link></h1>
        <div className="enemyholderdesc">
          <div className="subheader">
            <div className="noselect">
              Data Direct Site for Opera Omnia.<br /><br />
              For Advanced users only.
              <br /><br />
              Contact <a className="updatelink" target="_blank" rel="noreferrer" href="https://discord.gg/Y3Yn6gb"><span className="discord"></span></a> developers for instructions
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}