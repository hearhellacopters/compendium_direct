import React, { useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import Art_Passive_Formatting from '../Passives/PassiveArtFormatting.js'
import { getQuery, getQueryStringVal, useQueryParam } from '../URLParams.js'

export default function CharacterPassiveArtPageFormatting({
  art_passive,
  ProcessedCharacters,
  ver,
  newcompare,
  loc,
  file,
  match,

  formatting,
  master_index
}){

  const char_id = master_index.charid

  const rawData = Object.values(art_passive)

  const banerDisplayTerm = "artifact passives";

  const startinglimit = 9999

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
  const [Typesearch2, setTypesearch2] = useQueryParam("rank", "");
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

  const typeListArray2 = [
    {
      value: "★★",
      label: "★★",
      id: 5,
    },
    {
      value: "★",
      label: "★",
      id: 4,
    }
  ]

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

  useEffect(() => {
    //type params2
    const typeListArray2 = [
      {
        value: "★",
        label: "★★",
        id: 5,
      },
      {
        value: "★",
        label: "★",
        id: 4,
      }
    ]
    if (Typesearch2 != "") {
      const filteredtype2 = typeListArray2.filter(self => self.label == getQueryStringVal("rank"))
      if (filteredtype2.length != 0) {
        setTypesearch2(getQueryStringVal("rank"))
        setCondFilter2(filteredtype2[0].id)
      } else {
        setTypesearch2("")
        setCondFilter2("")
      }
    }
  }, [setCondFilter2, Typesearch2, setTypesearch2])

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
      setCondFilter2(e.id);
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
          b.spe_id - a.spe_id :
          a.spe_id - b.spe_id);
    const searchit = searchTerm == "" ? makeUnique : makeUnique.filter((ailment) =>
      (`${ver == "GL" ? ailment.jpname && ailment.jpname : ""} ${ailment.name} ${ver == "JP" ? ailment.glname && ailment.glname : ""} - #${ailment.pa_id}`).toLowerCase().includes(searchTerm)
    );
    const getailmentfilter2 = condFilter == "" ? searchit : searchit.filter(function (ef) {
      const newfilterpull = ef["chara_id"] === condFilter;
      if (condFilter !== "") {
        return newfilterpull;
      } else {
        return ef
      }
    });
    const getailmentfilter3 = condFilter3 == "" ? getailmentfilter2 : getailmentfilter2.filter(function (ef) {
      const newfilterpull = ef["effect_type"] === condFilter3 || ef["effect_type_1"] === condFilter3;
      if (condFilter3 !== "") {
        return newfilterpull;
      } else {
        return ef
      }
    });
    const getailmentfilter4 = condFilter4 == "" ? getailmentfilter3 : getailmentfilter3.filter(function (ef) {
      const newfilterpull = ef["require_type"] === condFilter4 || ef["require_type_1"] === condFilter4;
      if (condFilter4 !== "") {
        return newfilterpull;
      } else {
        return ef
      }
    });
    const getailmentfilter = condFilter2 == "" ? getailmentfilter4 : getailmentfilter4.filter(function (ef) {
      const newfilterpull = ef["rank"] == condFilter2;
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
        {match & match.ArtPriority1 == undefined ? "" :
          <div className="">
            <div className="singlesubbanner">{match.CharacterName}{"'s Artifact Priority"}</div>
            <div className="filterholderflair somepadding">
              <div className={"orangetext "}>
                {match.ArtPriority1}
              </div>
              <div className={"orangetext "}>
                {match.ArtPriority2}
              </div>
              <div className={"orangetext "}>
                {match.ArtPriority3}
              </div>
            </div>
          </div>}
        {listPassives.length > 0 ? (
          listPassives.map(passive => (
            <Art_Passive_Formatting
              key={passive.spe_id}
              art_passive={passive}
              ver={ver}
              loc={loc}
              file={"exskill"}
              Single={true}

              master_index={master_index}

              formatting={formatting}

              span={true}
              banner_color={"ArtRedbanner"}
              base_color={"ArtRedbase"}
            />
          ))) : (
          <div>No Data</div>
        )}
      </div>
    </div>
  )
}