import React, {useState, useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { getQuery, getQueryStringVal, useQueryParam } from '../../processing/urlparams'
import Tippy from '../../formatting/TippyDefaults'
import Select from 'react-select';
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5'; 
import { FaUndoAlt } from 'react-icons/fa'
import Event_Direct_Single from './event_single';

const Event_Single =({
    data,
    ProcessedEventsIndex,
    ver,
    ProcessedCharacters,
    jptoggledata,
    showFilter
})=>{

    const rawData = Object.values(data).sort((a, b) => new Date(b.start) - new Date(a.start))

    const banerDisplayTerm = "events";

    const startinglimit = 9999

    const [clearFilter, setclearFilter] = useStateIfMounted(false);

    const [loop, setLoop] = useStateIfMounted(false);
    const [reverse, setReverse] = useState(getQueryStringVal("rev") != null  ? true : false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchdisplay, setsearchdisplay] = useState("");
    const [condFilter, setCondFilter] = useState("");
    const [filterResults, setFilterResults] = useState(rawData);
    const [searchResults, setSearchResults] = useState(rawData);
    const [limits, setLimits] = useState(startinglimit);
    const [listDisplay, setListDisplay] = useState(
      rawData && rawData.slice(0, startinglimit)
    );
    const [listLength, setListLength] = useState(listDisplay.length);
    const [showLoadMore, setShowLoadMore] = useState(true);
    const [displayBanner, setDisplayBanner] = useState(
      `Displaying ${listLength} of ${rawData.length} ${banerDisplayTerm}`
    );
    const [Typesearch, setTypesearch] = useQueryParam("char", "");
    const { protocol, pathname, host } = window.location;
    const query = getQuery();
    const url = `${protocol}//${host}${pathname}?${query.toString()}`
    const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
    const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
    const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");


        //button toogle
        useEffect(() => {
          if (reverse == true) {
            setReversesearch("true")
        } else {
            setReversesearch("")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [Reversesearch,setReverse,reverse])
    
        const reversebutton = () => {
        setLoop(true);
        setReverse((prevValue) => !prevValue);
        setTimeout(() => setLoop(false), 1000);
        };

    useEffect(() => {
        //type params
        if(Typesearch != ""){
         const filteredtype = Object.values(ProcessedCharacters).filter(self => self.CharacterName == getQueryStringVal("char"))
         if(filteredtype.length != 0){
           setTypesearch(getQueryStringVal("char"))
           setCondFilter(filteredtype[0].CharID)
         } else{
           setTypesearch("")
           setCondFilter("")
         }
       }
     },[setCondFilter,ProcessedCharacters,Typesearch,setTypesearch])

        //type selector
   const CondSelect = (e) => {
    if (e !== null) {
        setTypesearch(e.label)
        setCondFilter(e.value);
    } else {
        setCondFilter("");
        setTypesearch("")
    }
    };

    useEffect(() => {
    //search params
    if(getQueryStringVal("search") != null){
        setSearchTerm(getQueryStringVal("search") != null  ? getQueryStringVal("search").toLowerCase() : "")
        setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
        setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
    }
    }, [setTEXTsearch,setFiltersearch])

    //unique
    function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
    }

    //filter
  useEffect(() => {
    var filterholder = rawData;

        if(reverse == true){
            filterholder = rawData.sort((a, b) => new Date(make_date(a.start)) - new Date(make_date(b.start)))
        } else {
            filterholder = rawData.sort((a, b) => new Date(make_date(b.start)) - new Date(make_date(a.start)))
        }
        
      const makeUnique = filterholder.filter(onlyUnique);
        const searchit = makeUnique.filter((ailment) =>
        (`${ailment.sub} ${ailment.name} - #${ailment.id}`).toLowerCase().includes(searchTerm)
        );
        const getailmentfilter = searchit.filter(function (ef) {
            const newfilterpull = ef.char_ids
            .some(CharList => CharList === condFilter)
            ;
            if(condFilter !== ""){
              return newfilterpull;
            } else {
              return ef
            }});
        setFilterResults(makeUnique);
        setSearchResults(getailmentfilter);
        const newlistdisplay = getailmentfilter.slice(0, limits);
        if (limits < getailmentfilter.length) {
            setShowLoadMore(true);
            setListDisplay(newlistdisplay);
            setListLength(getailmentfilter.length);
            setDisplayBanner(
              `Displaying ${newlistdisplay.length} of ${getailmentfilter.length} ${banerDisplayTerm}`
            );
          } else {
            setShowLoadMore(false);
            setListDisplay(newlistdisplay);
            setListLength(newlistdisplay.length);
            setDisplayBanner(
              `Displaying ${newlistdisplay.length} of ${newlistdisplay.length} ${banerDisplayTerm}`
            );
          }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, condFilter, reverse]);

   //type list
  const [typeListArray, settypeListArray] = useStateIfMounted(false);
  useEffect(()=>{
    const typeListArray2 = Object.values(ProcessedCharacters).filter(self=>jptoggledata == true? self.JPOrder != undefined : self.GLOrder != undefined).sort((a,b)=>jptoggledata == true? b.JPOrder - a.JPOrder : b.GLOrder - a.GLOrder).map((typeListUnique) => ({
      value: typeListUnique.CharacterName,
      label: typeListUnique.CharacterName,
      id: typeListUnique.CharID,
    }));
    settypeListArray(typeListArray2)
  },[jptoggledata,ProcessedCharacters,settypeListArray])

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

                //clear
  const resetbutton = () =>{
    setclearFilter(true);
    setReverse(false)

    setReversesearch("")
    setTEXTsearch("")
    setTypesearch("")
    setsearchdisplay("");
    setSearchTerm("");
    setCondFilter("")
    setTimeout(() => setclearFilter(false), 1000);
  }

    const displaydata = listDisplay;

    function ordinal(n) {
        var s = ["th", "st", "nd", "rd"];
        var v = n%100;
        return n + (s[(v-20)%10] || s[v] || s[0]);
      }
      const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

   const ct = new Date().getTime();

   const make_date = (release)=>{
    if(ver == "JP"){
        const date_check = new Date(`${release.toString().replace(/ /,"T")}.000+09:00`);
        return date_check
    } else{
        const date_check2 = new Date(`${release.toString().replace(/ /,"T")}Z`);
        return date_check2
    }
}

    if(JSON.stringify(data) == "[]"){
        return(
            <div className='characterpageholder'>
                No Data
            </div>
        )
    } else {
        return(
            <div>
                <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
                  <div className="similarbanner">Filters</div>
                  <div className="filterholderflair">
                    <div className="typeholder">
                      <Select
                      defaultValue={Typesearch != "" ? {value: Typesearch, label: Typesearch } : null}
                      key={Typesearch}
                      isSearchable={true} 
                      placeholder="Character Select..."
                      className='typecontainer' 
                      classNamePrefix="typetext" 
                      onChange={CondSelect}  
                      options={typeListArray} 
                      isClearable={true}
                      />
                    </div>
                    <div className="search-reverse-holder">
                      <div className="search-holder">
                      <IoSearch className="innersearchicon"/>
                        <input 
                            className="search-bar" 
                            type="text"
                            placeholder="Name Search"
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
                    <div>
                          <Tippy content="Reset Filters" className="tooltip" >
                            <div onClick={resetbutton} className={`clearbox`} ><div className="makecenter">Reset&nbsp;<FaUndoAlt  className={`clearbutton ${clearFilter ? "loop": ""}`} ></FaUndoAlt></div></div>
                          </Tippy>
                          </div>
                  </div>
                </div>
            <ul className='characterpageholder'>
                {displaydata.length != 0 ? 
                displaydata.map((self,key)=>(
                  self.images != undefined ?
                    <Event_Direct_Single
                    key={key}
                    self={self}
                    ver={ver}
                    char_id={ProcessedCharacters}
                    ProcessedEventsIndex={ProcessedEventsIndex}
                    />
                    :""
                ))
                :"No Data"}
            </ul>
            </div>
        )
    }
}
export default Event_Single