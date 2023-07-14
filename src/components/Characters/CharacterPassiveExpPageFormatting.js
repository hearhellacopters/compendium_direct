import React, { useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import PassiveAbilityFormatting from '../Passives/PassiveAbilityFormatting';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { getQuery, getQueryStringVal, useQueryParam } from '../URLParams'
import CharacterAbilityPars from '../Abilities/AbilityPars.js'

export default function CharacterPassiveExpPageFormatting({
  ver,
  loc,
  file,
  newcompare,
  ProcessedCharacters,
  passive_data,

  formatting,

  master_index
}){

  const char_id = master_index.charid

  const [rawData, setrawData] = useState(passive_data);

  const banerDisplayTerm = "character board passives";

  const startinglimit = 999

  const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null ? true : false);
  const [clearFilter, setclearFilter] = useStateIfMounted(false);

  const [loop, setLoop] = useStateIfMounted(false);
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null ? true : false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchdisplay, setsearchdisplay] = useState("");
  const [condFilter, setCondFilter] = useState("");
  const [condFilter2, setCondFilter2] = useState("");
  const [condFilter3, setCondFilter3] = useState("");
  const [condFilter4, setCondFilter4] = useState("");
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
  const [Typesearch2, setTypesearch2] = useQueryParam("board", "");
  const [Typesearch3, setTypesearch3] = useQueryParam("effect", "");
  const [Typesearch4, setTypesearch4] = useQueryParam("require", "");
  const { protocol, pathname, host } = window.location;
  const query = getQuery();
  const url = `${protocol}//${host}${pathname}?${query.toString()}`
  const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
  const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
  const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");

  const showfilterbutton = () => {
    if (showFilter == false) {
      setFiltersearch("true")
    } else {
      setFiltersearch("")
    }
    setShowFilter((prevValue) => !prevValue);
  }

  useEffect(() => {
    if (showFilter == false) {
      setFiltersearch("")
    } else {
      setFiltersearch("true")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFilter])

  //button toogle
  useEffect(() => {
    if (reverse == true) {
      setReversesearch("true")
    } else {
      setReversesearch("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Reversesearch, setReverse, reverse])

  const reversebutton = () => {

    setLoop(true);
    setReverse((prevValue) => !prevValue);
    setTimeout(() => setLoop(false), 1000);
  };

  useEffect(() => {
    //type params
    if (Typesearch != "") {
      const filteredtype = Object.values(char_id).filter(self => self.CharacterName == getQueryStringVal("char"))
      if (filteredtype.length != 0) {
        setTypesearch(getQueryStringVal("char"))
        setCondFilter(filteredtype[0].CharID)
      } else {
        setTypesearch("")
        setCondFilter("")
      }
    }
  }, [setCondFilter, char_id, Typesearch, setTypesearch])


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

  //type selector2
  const CondSelect2 = (e) => {
    if (e !== null) {
      setTypesearch2(e.label)
      setCondFilter2(e.value);
    } else {
      setCondFilter2("");
      setTypesearch2("")
    }
  };

  //type selector3
  const CondSelect3 = (e) => {
    if (e !== null) {
      setTypesearch3(e.label)
      setCondFilter3(e.value);
    } else {
      setCondFilter3("");
      setTypesearch3("")
    }
  };

  //type selector4
  const CondSelect4 = (e) => {
    if (e !== null) {
      setTypesearch4(e.label)
      setCondFilter4(e.value);
    } else {
      setCondFilter4("");
      setTypesearch4("")
    }
  };

  useEffect(() => {
    //search params
    if (getQueryStringVal("search") != null) {
      setSearchTerm(getQueryStringVal("search") != null ? getQueryStringVal("search").toLowerCase() : "")
      setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
      setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
    }
  }, [setTEXTsearch, setFiltersearch])

  //load more
  const loadMoreButton = () => {
    const newlimits = limits + startinglimit;
    const newLoadMore = searchResults.length > newlimits;
    const newlistdisplay = listDisplay.concat(
      searchResults.slice(limits, newlimits)
    );
    setLimits(newlimits);
    if (newlimits <= newlistdisplay.length) {
      setDisplayBanner(
        `Displaying ${newlimits} of ${searchResults.length} ${banerDisplayTerm} `
      );
    } else {
      setDisplayBanner(
        `Displaying ${searchResults.length} of ${searchResults.length} ${banerDisplayTerm} `
      );
    }
    setShowLoadMore(newLoadMore);
    setListDisplay(newlistdisplay);
    setListLength(newlistdisplay.length);
  };

  //unique
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  //filter
  useEffect(() => {
    const filterholder = rawData;

    const makeUnique = filterholder
      .filter(onlyUnique)
      .sort((a, b) =>
        reverse === false ?
          a.level - b.level :
          b.level - a.level);
    const searchit = makeUnique.filter((ailment) =>
      (`
        ${ailment.command && ailment.command.command ? ver == "GL" ? ailment.command.command.name : ailment.command.command.glname : ""} 
        ${ailment.command && ailment.command.command ? ver == "GL" ? ailment.command.command.jpname : ailment.command.command.name : ""} 
        ${ver == "GL" && ailment.awakening_type != -1 ? ailment.passive && ailment.passive.jpname != undefined ? ailment.passive.jpname : "" : ""} 
        ${ailment.passive != undefined ? ailment.passive.name : ""}
        ${ver == "JP" && ailment.awakening_type != -1 ? ailment.passive != undefined ? ailment.passive.glname : "" : ""}
          - #${ailment.passive != undefined ? ailment.passive.sfp_id : ""}`).toLowerCase().includes(searchTerm)
    );
    const getailmentfilter = searchit.filter(function (ef) {
      const newfilterpull = ef.passive && ef.passive.loc_tag == condFilter2;
      if (condFilter2 !== "") {
        return newfilterpull;
      } else {
        return ef
      }
    });
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
  }, [searchTerm, clearFilter, condFilter, condFilter2, condFilter3, condFilter4, reverse]);

  //type list
  const typeListArray = Object.values(char_id).map((typeListUnique) => ({
    value: typeListUnique.CharID,
    label: typeListUnique.CharacterName
  }));


  const typeListArray2 = [
    {
      value: "board1",
      label: "S1 Board"
    },
    {
      value: "board2",
      label: "S2 Board"
    },
    {
      value: "board3",
      label: "EX Board"
    },
    {
      value: "board4",
      label: "LD Board"
    },
    {
      value: "board4ext",
      label: "LD EXT"
    }
  ]

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
  const resetbutton = () => {
    setclearFilter(true);
    setReverse(false)

    setReversesearch("")
    setTEXTsearch("")
    setTypesearch("")
    setTypesearch2("")
    setTypesearch3("")
    setTypesearch4("")
    setsearchdisplay("");
    setSearchTerm("");
    setCondFilter("")
    setCondFilter2("")
    setCondFilter3("")
    setCondFilter4("")
    setTimeout(() => setclearFilter(false), 1000);
  }

  const listPassives = listDisplay;

  return (
    <div>
      <div className="characterpageholder">
        {listPassives.length > 0 ? (
          listPassives.map(passive => (
            passive.ability_type == 1 && passive.command != undefined ?
              <CharacterAbilityPars
                key={passive.cla_id}
                character_ability={passive.command}
                ProcessedCharacters={ProcessedCharacters}
                ver={ver}
                loc={loc}
                file={"character_ability"}
                master_index={master_index}
                formatting={formatting}
                tag_override={`cl${passive.level}`}
              />
              : passive.passive &&
              <PassiveAbilityFormatting
                key={passive.cla_id}
                passive_ability={passive.passive}
                ver={ver}
                loc={loc}
                file={"passive_ability"}
                master_index={master_index}
                cp_cost={passive.cp}
                board_cost={passive.board_point}
                chara_id_passoff={passive.chara_id}
                formatting={formatting}
                tag_overide={`exp${passive.level}`}
              />
          ))) : (
          <div>No Data</div>
        )}
      </div>
    </div>
  )
}