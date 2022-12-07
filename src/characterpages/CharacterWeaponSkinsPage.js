import React, {useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { Link } from 'react-router-dom'
import { Helmet} from 'react-helmet-async';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5'; 
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import Tippy from '../formatting/TippyDefaults.js';
import WeaponSkinsFormatting from '../formatting/WeaponSkinsFormatting.js';
import { getQuery, getQueryStringVal, useQueryParam } from '../processing/urlparams'

const WeaponsSkins = ({
    match,
    WeaponSkins
})=>{

    const rawData = Object.values(WeaponSkins)

    const passivelimit = 40

    const banerDisplayTerm = "weapon glosses";

    const [loop, setLoop] = useStateIfMounted(false);
    const [reverse, setReverse] = useState(getQueryStringVal("rev") != null ? true : false)
    const [searchTerm, setSearchTerm] = useState(getQueryStringVal("search") != null  ? getQueryStringVal("search").toLowerCase() : "");
    const [condFilter, setCondFilter] = useState("");
    const [searchdisplay, setsearchdisplay] = useState(getQueryStringVal("search") != null ? getQueryStringVal("search") : "");
    const [filterResults, setFilterResults] = useState(rawData);
    const [searchResults, setSearchResults] = useState(rawData);
    const [limits, setLimits] = useState(passivelimit);
    const [listDisplay, setListDisplay] = useState(
      rawData && rawData.slice(0, passivelimit)
    );

    const [listLength, setListLength] = useState(listDisplay.length);
    const [showLoadMore, setShowLoadMore] = useState(true);
    const [displayBanner, setDisplayBanner] = useState(
        <>Displaying <span className="subtextgold">{listLength}</span> of <span className="subtextgold"> {rawData.length}</span> {banerDisplayTerm}</>
    );

    const[Sword, setSword] = useState(getQueryStringVal("sword") != null  ? true : false);
    const[Greatsword, setGreatsword] = useState(getQueryStringVal("greatsword") != null  ? true : false);
    const[Staff, setStaff] = useState(getQueryStringVal("staff") != null  ? true : false);
    const[Fist, setFist] = useState(getQueryStringVal("fist") != null  ? true : false);
    const[Dagger, setDagger] = useState(getQueryStringVal("dagger") != null  ? true : false);
    const[Gun, setGun] = useState(getQueryStringVal("gun") != null  ? true : false);
    const[Throwing, setThrowing] = useState(getQueryStringVal("throw") != null  ? true : false);
    const[Whip, setWhip] = useState(getQueryStringVal("whip") != null  ? true : false);
    const[Bow, setBow] = useState(getQueryStringVal("bow") != null  ? true : false);
    const[Spear, setSpear] = useState(getQueryStringVal("spear") != null  ? true : false);
    const[Other, setOther] = useState(getQueryStringVal("other") != null  ? true : false);

    const[Swordsearch, setSwordsearch] = useQueryParam("sword", "");
    const[Greatswordsearch, setGreatswordsearch] = useQueryParam("greatsword", "");
    const[Staffsearch, setStaffsearch] = useQueryParam("staff", "");
    const[Fistsearch, setFistsearch] = useQueryParam("fist", "");
    const[Daggersearch, setDaggersearch] = useQueryParam("dagger", "");
    const[Gunsearch, setGunsearch] = useQueryParam("gun", "");
    const[Throwingsearch, setThrowingsearch] = useQueryParam("throw", "");
    const[Whipsearch, setWhipsearch] = useQueryParam("whip", "");
    const[Bowsearch, setBowsearch] = useQueryParam("bow", "");
    const[Spearsearch, setSpearsearch] = useQueryParam("spear", "");
    const[Othersearch, setOthersearch] = useQueryParam("other", "");
    const[Armorsearch, setArmorsearch] = useQueryParam("armor", "");

    const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
    const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
    const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
    const [Typesearch, setTypesearch] = useQueryParam("Char", "");
    const [JPsearch, setJPSearch] = useQueryParam("JP", "");
    const { protocol, pathname, host } = window.location;
    const query = getQuery();
    const url = `${protocol}//${host}${pathname}?${query.toString()}`

    useEffect(() => {
        //search params
        if(getQueryStringVal("search") != null){
          setSearchTerm(getQueryStringVal("search") != null  ? getQueryStringVal("search").toLowerCase() : "")
          setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
          setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
        }
        }, [setTEXTsearch,setFiltersearch])

      //filter
    useEffect(() => {
       const filterholder = [];

       if (Sword === true) {
        const filteredout = rawData.filter(
          (gear) => gear["Sword"] == true
        );
        filterholder.push(...filteredout);
       }
       if (Greatsword === true) {
        const filteredout = rawData.filter(
          (gear) => gear["Greatsword"] == true
        );
        filterholder.push(...filteredout);
       }
       if (Staff === true) {
        const filteredout = rawData.filter(
          (gear) => gear["Staff"] == true
        );
        filterholder.push(...filteredout);
       }
       if (Fist === true) {
        const filteredout = rawData.filter(
          (gear) => gear["Fist"] == true
        );
        filterholder.push(...filteredout);
       }
       if (Dagger === true) {
        const filteredout = rawData.filter(
          (gear) => gear["Dagger"] == true
        );
        filterholder.push(...filteredout);
       }
       if (Gun === true) {
        const filteredout = rawData.filter(
          (gear) => gear["Gun"] == true
        );
        filterholder.push(...filteredout);
       }
       if (Throwing === true) {
        const filteredout = rawData.filter(
          (gear) => gear["Throw"] == true
        );
        filterholder.push(...filteredout);
       }
       if (Whip === true) {
        const filteredout = rawData.filter(
          (gear) => gear["Whip"] == true
        );
        filterholder.push(...filteredout);
       }
       if (Bow === true) {
        const filteredout = rawData.filter(
          (gear) => gear["Bow"] == true
        );
        filterholder.push(...filteredout);
       }
       if (Spear === true) {
        const filteredout = rawData.filter(
          (gear) => gear["Spear"] == true
        );
        filterholder.push(...filteredout);
       }
       if (Other === true) {
        const filteredout = rawData.filter(
          (gear) => gear["Other"] == true
        );
        filterholder.push(...filteredout);
       }

       if (filterholder.length === 0) {
        filterholder.push(...rawData);
        }

         // eslint-disable-next-line no-sparse-arrays
        const makeUnique = filterholder
          .filter(onlyUnique)
          .sort((a, b) => 
          reverse == false ? 
          a.id - b.id :
          b.id - a.id );
          const searchit = makeUnique.filter((char) =>
        `${char.name} ${char.jpanme}`.toLowerCase().includes(searchTerm)
        );
          const getcharacterfilter = searchit
        setFilterResults(makeUnique);
        setSearchResults(getcharacterfilter);
        const newlistdisplay = getcharacterfilter.slice(0, limits);
        if (limits < getcharacterfilter.length) {
          setShowLoadMore(true);
          setListDisplay(newlistdisplay);
          setListLength(getcharacterfilter.length);
          setDisplayBanner(
            <>Displaying <span className="subtextgold">{newlistdisplay.length}</span> of <span className="subtextgold"> {getcharacterfilter.length}</span> {banerDisplayTerm}</>
          );
        } else {
          setShowLoadMore(false);
          setListDisplay(newlistdisplay);
          setListLength(newlistdisplay.length);
          setDisplayBanner(
            <>Displaying <span className="subtextgold">{newlistdisplay.length}</span> of <span className="subtextgold"> {newlistdisplay.length}</span> {banerDisplayTerm}</>
          );
        }
        // eslint-disable-next-line
    },[Whip,Spear,Other,Bow,Dagger,Gun,Throwing,Fist,Staff,Greatsword,Sword,limits,searchTerm,reverse])

    //buttons
    const swordbutton = () => {
      if(Sword == false){
        setSwordsearch("true")
      } else {
        setSwordsearch("")
      }
      setSword((prevValue) => !prevValue);
    };
    const greatswordbutton = () => {
      if(Greatsword == false){
        setGreatswordsearch("true")
      } else {
        setGreatswordsearch("")
      }
      setGreatsword((prevValue) => !prevValue);
    }
    const staffbutton = () => {
      if(Staff == false){
        setStaffsearch("true")
      } else {
        setStaffsearch("")
      }
      setStaff((prevValue) => !prevValue);
    }
    const fistbutton = () => {
      if(Fist == false){
        setFistsearch("true")
      } else {
        setFistsearch("")
      }
      setFist((prevValue) => !prevValue);
    }
    const daggerbutton = () => {
      if(Dagger == false){
        setDaggersearch("true")
      } else {
        setDaggersearch("")
      }
      setDagger((prevValue) => !prevValue);
    }
    const gunbutton = () => {
      if(Gun == false){
        setGunsearch("true")
      } else {
        setGunsearch("")
      }
      setGun((prevValue) => !prevValue);
    }
    const throwingbutton = () => {
      if(Throwing == false){
        setThrowingsearch("true")
      } else {
        setThrowingsearch("")
      }
      setThrowing((prevValue) => !prevValue);
    }
    const whipbutton = () => {
      if(Whip == false){
        setWhipsearch("true")
      } else {
        setWhipsearch("")
      }
      setWhip((prevValue) => !prevValue);
    }
    const bowbutton = () => {
      if(Bow == false){
        setBowsearch("true")
      } else {
        setBowsearch("")
      }
      setBow((prevValue) => !prevValue);
    }
    const spearbutton = () => {
      if(Spear == false){
        setSpearsearch("true")
      } else {
        setSpearsearch("")
      }
      setSpear((prevValue) => !prevValue);
    }
    const otherbutton = () => {
      if(Other == false){
        setOthersearch("true")
      } else {
        setOthersearch("")
      }
      setOther((prevValue) => !prevValue);
    }

  const reversebutton = () => {
    setLoop(true);
    setReverse((prevValue) => !prevValue);
    setTimeout(() => setLoop(false), 1000);
  };

  useEffect(() => {
    if (reverse == true) {
        setReversesearch("true")
        } else {
        setReversesearch("")
    }   
  },[setReversesearch,reverse])

    //load more
    const loadMoreButton = () => {
        const newlimits = limits + passivelimit;
        const newLoadMore = searchResults.length > newlimits;
        const newlistdisplay = listDisplay.concat(
        searchResults.slice(limits, newlimits)
        );
        setLimits(newlimits);
        if (newlimits <= newlistdisplay.length) {
        setDisplayBanner(
          <>Displaying <span className="subtextgold">{newlimits}</span> of <span className="subtextgold"> {searchResults.length}</span> {banerDisplayTerm}</>
        );
        } else {
        setDisplayBanner(
          <>Displaying <span className="subtextgold">{searchResults.length}</span> of <span className="subtextgold"> {searchResults.length}</span> {banerDisplayTerm}</>
        );
        }
        setShowLoadMore(newLoadMore);
        setListDisplay(newlistdisplay);
        setListLength(newlistdisplay.length);
    };
      
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

      //search bar
  const handleChange = (e) => {
    setsearchdisplay(e.target.value)
    setSearchTerm(e.target.value.toLowerCase());
    setTEXTsearch(e.target.value)
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSearchTerm(searchdisplay.toLowerCase());
      setTEXTsearch(searchdisplay)
    }
  }
  const clearSearch = () => {
    setsearchdisplay("")
    setSearchTerm("");
    setTEXTsearch("")
  };

  const listCharacters = listDisplay;

    return(
        <div>
            <Helmet>
                <title>Weapon Gloss Page - Dissidia Compendium</title>
                <meta property="og:site_name" content="Dissidia Compendium"/>
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://dissidiacompendium.com"/>
                <meta name="description" content={`Weapon Gloss Page`}/>
                <meta name="twitter:title" content={`Weapon Gloss Page`}/>
                <meta name="twitter:description" content={`Weapon Gloss Page`}/>
                <meta name="twitter:image" content="https://dissidiacompendium.com/images/static/site/logo512.png"/>
                <meta name="twitter:card" content="summary"/>
                <meta name="twitter:image:alt" content={`Dissia Compendium`}/>
                <meta property="og:title" content={`Weapon Gloss Page`}/>
                <meta property="og:description" content={`Weapon Gloss page`}/>
                <meta property="og:image" content="https://dissidiacompendium.com/images/static/site/logo512.png"/>
                <meta property="og:url" content={`https://dissidiacompendium.com/characters/skins/weapon/`}/>
            </Helmet>
            <div className="content">
            <h1 >Weapon Gloss Page</h1>
            <div className="filterholder noselect">
              <ul className="spheretypes">
                <Tippy content="Sword">
                  <li className={`${Sword ? "filteractive": "filterinactive"} spheresbutton swordbutton`} onClick={swordbutton}></li>
                </Tippy>  
                <Tippy content="Greatsword">
                  <li className={`${Greatsword ? "filteractive": "filterinactive"} spheresbutton greatswordbutton`} onClick={greatswordbutton}></li>
                </Tippy>
                <Tippy content="Staff">
                  <li className={`${Staff ? "filteractive": "filterinactive"} spheresbutton staffbutton`} onClick={staffbutton}></li>
                </Tippy>
                <Tippy content="Fist">
                  <li className={`${Fist ? "filteractive": "filterinactive"} spheresbutton fistbutton`} onClick={fistbutton}></li>
                </Tippy>
                <Tippy content="Dagger">
                  <li className={`${Dagger ? "filteractive": "filterinactive"} spheresbutton daggerbutton`} onClick={daggerbutton}></li>
                </Tippy>
                <Tippy content="Gun">
                  <li className={`${Gun ? "filteractive": "filterinactive"} spheresbutton gunbutton`} onClick={gunbutton}></li>
                </Tippy>
                <Tippy content="Throwing">
                  <li className={`${Throwing ? "filteractive": "filterinactive"} spheresbutton throwbutton`} onClick={throwingbutton}></li>
                </Tippy>
                <Tippy content="Whip">
                  <li className={`${Whip ? "filteractive": "filterinactive"} spheresbutton whipbutton`} onClick={whipbutton}></li>
                </Tippy>
                <Tippy content="Bow">
                  <li className={`${Bow ? "filteractive": "filterinactive"} spheresbutton bowbutton`} onClick={bowbutton}></li>
                </Tippy>
                <Tippy content="Spear">
                  <li className={`${Spear ? "filteractive": "filterinactive"} spheresbutton spearsbutton`} onClick={spearbutton}></li>
                </Tippy>
                <Tippy content="Other">
                  <li className={`${Other ? "filteractive": "filterinactive"} spheresbutton othersbutton`} onClick={otherbutton}></li>
                </Tippy>
              </ul>
              <br/>
                    <div className="search-reverse-holder">
                      <div className="search-holder">
                      <IoSearch className="innersearchicon"/>
                        <input 
                            className="search-bar" 
                            type="text"
                            placeholder="Search Name"
                            value={searchdisplay}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        />
                        {searchTerm === "" ? "" : 
                        <IoMdCloseCircleOutline onClick={clearSearch} className="clearsearch"></IoMdCloseCircleOutline>}
                      </div>
                        <Tippy content="Reverse Order" className="tooltip" >
                          <div className={`reversebox`} ><i onClick={reversebutton} className={`reversebutton ${loop ? "flip": ""}`} ><ImSortAmountDesc className={`reversebutton ${reverse ? "": "nodisplay"}`}/><ImSortAmountAsc className={`reversebutton ${reverse ? "nodisplay": ""}`}/></i></div>
                        </Tippy>
                    </div>
            </div>
            <ul className="bannertabs">
                <Link to={`/characters/skins/wardrobe`}>
                  <li >Wardrobes</li>
                </Link>
                <Link to={`/characters/skins/weapons`}>
                  <li className={"active"}><span className="gemselected"/>Weapons</li>
                </Link>
            </ul>
            <div className="artworkholder">
            <div className="subtext">
                {displayBanner}
            </div>
            {listCharacters.length > 0 ? (
            listCharacters.map(char =>(
                <WeaponSkinsFormatting key={char.id} weapon_data={char}/>
            ))) : (
                <div>No results</div>
              )}
            <div className="subtextbottom">
                {displayBanner}
            </div>
            {showLoadMore && 
            <div className="loadmore" onClick={loadMoreButton}> Load More </div>}
            </div>
            </div>
        </div>
    )
}
export default WeaponsSkins