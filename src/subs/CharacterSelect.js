import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ByCharacterLanding from '../z_bycharacter/_landing';
import DevSwitch from '../redux/DevSwitch';
import axios from "axios";
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { getQuery, getQueryStringVal, useQueryParam } from '../components/URLParams'
import Tippy from '../components/TippyDefaults'

const CharacterSelect = ({
  master_index,
  Access,

  ver,
}) => {

  const char_id = master_index.charid

  const [character, setcharacter] = useState()
  const [selectedid, setselectedid] = useState()

  const [Typesearch, setTypesearch] = useQueryParam("Char", "");
  const [access, setaccess] = useState()

  const [pageloc, setpageloc] = useState(getQueryStringVal("loc") != null ? getQueryStringVal("loc") : "");
  const [pagelocdisplay, setpagelocdisplay] = useQueryParam("loc", "")

  useEffect(() => {
    //search params
    if (getQueryStringVal("loc") != null) {
      setpageloc(getQueryStringVal("loc") != null ? getQueryStringVal("loc") : "")
      setpagelocdisplay(getQueryStringVal("loc") != null ? getQueryStringVal("loc") : "")
    }
  }, [setpageloc, setpagelocdisplay, pagelocdisplay])

  useEffect(() => {
    setaccess(Access[selectedid])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedid])


  useEffect(() => {
    if (Typesearch != null) {
      const typeListArray = Object.values(char_id).map((typeListUnique) => ({
        value: typeListUnique.CharacterName,
        label: typeListUnique.CharacterName,
        shortname: typeListUnique.ShortName,
        id: typeListUnique.CharID,
      }));
      const pull = typeListArray.filter(self => self.shortname == getQueryStringVal("Char"))
      if (pull.length != 0) {
        setTypesearch(getQueryStringVal("Char"))
        setcharacter(pull[0].label)
        setselectedid(pull[0].id)
      } else {
        setTypesearch("")
        setcharacter()
        setselectedid()
      }
    }
  }, [Typesearch, char_id, setTypesearch])

  const typeListArray = Object.values(char_id).map((typeListUnique) => ({
    value: typeListUnique.CharacterName,
    label: typeListUnique.CharacterName,
    shortname: typeListUnique.ShortName,
    id: typeListUnique.CharID
  })).sort((a, b) => b.id - a.id);

  //type selector
  const CondSelect = (e) => {
    if (e !== null) {
      setTypesearch(e.shortname)
      setcharacter(e.label)
      setselectedid(e.id);
      setpagelocdisplay("")
      setpageloc("")
    } else {
      setTypesearch("")
      setcharacter()
      setselectedid()
      setpagelocdisplay("")
      setpageloc("")
    }
  };

  const locationbutton = (e) => {
    setpagelocdisplay(e)
    setpageloc(e)
  };
  const [formatting, setformatting] = useState(true)

  const togglemerge = () => {
    setformatting((prevValue) => !prevValue);
  }

  return (
    <div className="">
      <Helmet>
        <title>{`${character == undefined ? "Select Character" : character} ${ver} - Dissidia Compendium Direct`}</title>
        <meta property="og:site_name" content="Dissidia Compendium" />
        <meta property="og:type" content="website" />
        <meta name="description" content={ver + " - " + character == undefined ? "Select Character" : character} />
      </Helmet>
      <div className="subdropmenu">
        <div className="">
          <Select
            defaultValue={character != undefined ? { value: character, label: character } : null}
            key={character}
            isSearchable={true}
            ignoreCase={true}
            ignoreAccents={true}
            placeholder="Character Select..."
            className='levelcontainerDev'
            classNamePrefix="typetext"
            onChange={CondSelect}
            options={typeListArray}
            isClearable={true}
          />
        </div>
        <br />
        {selectedid == undefined ? "" :
          <div className="filterholderpages noselect">
            <div className="filterholderflair">
              {access && (
                access[`${ver}basic`] == false &&
                access[`${ver}abilities`] == false &&
                access[`${ver}buffs`] == false &&
                access[`${ver}exp`] == false &&
                access[`${ver}crystal`] == false &&
                access[`${ver}sum_fix`] == false &&
                access[`${ver}link`] == false &&
                access[`${ver}gear`] == false &&
                access[`${ver}spheres`] == false &&
                access[`${ver}art`] == false &&
                access[`${ver}events`] == false
              ) == true ? " - No Data - " :
                <>
                  <div className="similarbanner">Categories</div>
                  <ul className="bufftypes">
                    {access && access[`${ver}basic`] == true ?
                      <Tippy content="Basic Profile">
                        <li onClick={() => locationbutton("profile")} className={`${pageloc == "profile" ? "filteractive" : "filterinactive"} buffbutton profilebutton`}></li>
                      </Tippy>
                      : ""}
                    {access && access[`${ver}abilities`] ?
                      <Tippy content="Abilities">
                        <li onClick={() => locationbutton("abilities")} className={`${pageloc == "abilities" ? "filteractive" : "filterinactive"} buffbutton abilitiesbutton`} ></li>
                      </Tippy>
                      : ""}
                    {access && access[`${ver}buffs`] == true ?
                      <Tippy content="Buffs">
                        <li onClick={() => locationbutton("buffs")} className={`${pageloc == "buffs" ? "filteractive" : "filterinactive"} buffbutton buffsdebuffsbutton`} ></li>
                      </Tippy>
                      : ""}
                    {access && access[`${ver}exp`] == true ?
                      <Tippy content="Experince Passives">
                        <li onClick={() => locationbutton("exp")} className={`${pageloc == "exp" ? "filteractive" : "filterinactive"} buffbutton expbutton`} ></li>
                      </Tippy>
                      : ""}
                    {access && access[`${ver}crystal`] == true ?
                      <Tippy content="Crystal Awakening Passives">
                        <li onClick={() => locationbutton("cpassives")} className={`${pageloc == "cpassives" ? "filteractive" : "filterinactive"} buffbutton cpassivesbutton`} ></li>
                      </Tippy>
                      : ""}
                    {access && access[`${ver}sum_fix`] == true ?
                      <Tippy content="Enhancement Boards">
                        <li onClick={() => locationbutton("bpassives")} className={`${pageloc == "bpassives" ? "filteractive" : "filterinactive"} buffbutton bpassivesbutton`} ></li>
                      </Tippy>
                      : ""}
                    {access && access[`${ver}link`] == true ?
                      <Tippy content="Force Enhancement">
                        <li onClick={() => locationbutton("link")} className={`${pageloc == "link" ? "filteractive" : "filterinactive"} buffbutton linkbutton`}></li>
                      </Tippy>
                      : ""}
                    {access && access[`${ver}gear`] == true ?
                      <Tippy content="Equipment Passives">
                        <li onClick={() => locationbutton("gear")} className={`${pageloc == "gear" ? "filteractive" : "filterinactive"} buffbutton gearbutton`} ></li>
                      </Tippy>
                      : ""}
                    {access && access[`${ver}spheres`] == true ?
                      <Tippy content="Spheres">
                        <li onClick={() => locationbutton("spheres")} className={`${pageloc == "spheres" ? "filteractive" : "filterinactive"} buffbutton spherespagebutton`} ></li>
                      </Tippy>
                      : ""}
                    {access && access[`${ver}art`] == true ?
                      <Tippy content="Artifact Passives">
                        <li onClick={() => locationbutton("art")} className={`${pageloc == "art" ? "filteractive" : "filterinactive"} buffbutton artpassc`} ></li>
                      </Tippy>
                      : ""}
                    {access && access[`${ver}events`] == true ?
                      <Tippy content="Associated Events">
                        <li onClick={() => locationbutton("events")} className={`${pageloc == "events" ? "filteractive" : "filterinactive"} buffbutton eventspagebutton`} ></li>
                      </Tippy>
                      : ""}

                  </ul>

                  <div className="margeholder">
                    <div className="Merge">
                      <Tippy content="Replaces tags with images">
                        <label htmlFor='search' className="MergeText">Formatting?</label>
                      </Tippy>
                      <div key="mergecheck1" className={`${formatting == true ? "nodisplay" : `uncheck`}`} onClick={togglemerge} />
                      <div key="mergecheck2" className={`${formatting == true ? "check" : `nodisplay`}`} onClick={togglemerge} />
                    </div>
                  </div>
                </>
              }
            </div>
          </div>}
        <br />
        {selectedid == undefined ? "" :
          <ByCharacterLanding
            selectedCharaID={selectedid}

            master_index={master_index}
            formatting={formatting}
            pageloc={pageloc}

            access={access}

            ver={ver}
          />}
      </div>
    </div>
  )
}
export default CharacterSelect