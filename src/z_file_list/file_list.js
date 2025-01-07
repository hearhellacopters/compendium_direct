import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tippy from '../components/TippyDefaults';
import { useStateIfMounted } from "use-state-if-mounted";
import Select from 'react-select';
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaShareSquare } from 'react-icons/fa';
import { FaUndoAlt } from 'react-icons/fa';
import { getQuery, getQueryStringVal, useQueryParam } from '../components/URLParams';

const File_List = ({
  ver,
  loc,
  file,
  newcompare,
  file_list
}) => {

  const rawData = Object.values(file_list)

  const banerDisplayTerm = "files";

  const startinglimit = 100

  const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null ? true : false);
  const [clearFilter, setclearFilter] = useStateIfMounted(false);

  const [loop, setLoop] = useStateIfMounted(false);
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null ? true : false);
  const [searchdisplay, setsearchdisplay] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [condFilter, setCondFilter] = useState("");
  const [condFilter2, setCondFilter2] = useState("");
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

  const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
  const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
  const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
  const [Typesearch, setTypesearch] = useQueryParam("filetype", "");
  const [Typesearch2, setTypesearch2] = useQueryParam("category", "");
  const { protocol, pathname, host } = window.location;
  const query = getQuery();
  const url = `${protocol}//${host}${pathname}?${query.toString()}`


  const typeListArray = [{
    value: ".g1t",
    label: ".g1t"
  },
  {
    value: ".bin",
    label: ".bin"
  },
  {
    value: ".g1m",
    label: ".g1m"
  },
  {
    value: ".sbin",
    label: ".sbin"
  },
  {
    value: ".swf",
    label: ".swf"
  },
  {
    value: ".config",
    label: ".config"
  },
  {
    value: ".g1s",
    label: ".g1s"
  },
  {
    value: ".vsh",
    label: ".vsh"
  },
  {
    value: ".fsh",
    label: ".fsh"
  },
  {
    value: ".txt",
    label: ".txt"
  },
  {
    value: ".json",
    label: ".json"
  }]

  const typeListArray2 = [{
    value: "Character Texture",
    label: "Character Texture",
    id: /CT_\d+/g,
  },
  {
    value: "Character Model",
    label: "Character Model",
    id: /CM_\d+/g,
  },
  {
    value: "Event Image",
    label: "Event Image",
    id: /EventTitle\d+/g,
  },
  {
    value: "Field Map Image",
    label: "Field Map Image",
    id: /FieldMap_.+/g,
  },
  {
    value: "Character Audio",
    label: "Character Audio",
    id: /AV\d+/g,
  },
  {
    value: "Character Event Audio",
    label: "Character Event Audio",
    id: /EV\d+/g,
  },
  {
    value: "Background Music",
    label: "Background Music",
    id: /BGM\d+/g,
  },
  {
    value: "Character Animations",
    label: "Character Animations",
    id: /MOT_\d+/g,
  },
  {
    value: "Weapon Model",
    label: "Weapon Model",
    id: /WM_\d+/g,
  },
  {
    value: "Weapon Texture",
    label: "Weapon Texture",
    id: /WT_\d+/g,
  },
  {
    value: "Old Character Effects",
    label: "Old Character Effects",
    id: /^EffChr\d+/g,
  },
  {
    value: "Character Effects",
    label: "Character Effects",
    id: /_EffChr\d+/g,
  },
  {
    value: "Event Script",
    label: "Event Script",
    id: /battle_event_\d+/g,
  },
  {
    value: "Event Script",
    label: "Event Script",
    id: /battle_event_ww_\d+/g,
  },
  {
    value: "Special Icon",
    label: "Special Icon",
    id: /btl_icon_state_sp_\d+/g,
  },
  {
    value: "Banner Image",
    label: "Banner Image",
    id: /stl_banner_l_g_WW_\d+/g,
  },
  {
    value: "Banner Image",
    label: "Banner Image",
    id: /stl_banner_l_g_tex_\d+/g,
  },
  {
    value: "Mini Event Banner",
    label: "Mini Event Banner",
    id: /stl_banner_m_s_tex_\d+/g,
  },
  {
    value: "Mini Event Banner",
    label: "Mini Event Banner",
    id: /stl_banner_m_s_WW_\d+/g,
  },
  {
    value: "Sale Banner",
    label: "Sale Banner",
    id: /stl_banner_s_tex_\d+/g,
  },
  {
    value: "Sale Banner",
    label: "Sale Banner",
    id: /stl_banner_s_WW_\d+/g,
  },
  {
    value: "Mini Pull Banner",
    label: "Mini Pull Banner",
    id: /stl_banner_shop_tex_\d+/g,
  },
  {
    value: "Mini Pull Banner",
    label: "Mini Pull Banner",
    id: /stl_banner_shop_WW_\d+/g,
  },
  {
    value: "Character Artwork",
    label: "Character Artwork",
    id: /stl_chara_\d+/g,
  },
  {
    value: "Character Turn Order Icon",
    label: "Character Turn Order Icon",
    id: /stl_chara_btl_ctb_\d+/g,
  },
  {
    value: "Character Status Face",
    label: "Character Status Face",
    id: /stl_chara_btl_status_\d+/g,
  },
  {
    value: "Character Event Face",
    label: "Character Event Face",
    id: /stl_chara_event_\d+/g,
  },
  {
    value: "Character Card Face",
    label: "Character Card Face",
    id: /stl_chara_face_\d+/g,
  },
  {
    value: "Monster Face",
    label: "Monster Face",
    id: /stl_mon_face_\d+/g,
  },
  {
    value: "Weapon Icon",
    label: "Weapon Icon",
    id: /stl_weapon_equipment_\d+/g,
  },
  {
    value: "Effect Model",
    label: "Effect Model",
    id: /EM_\d+/g,
  },
  {
    value: "Effect Texture",
    label: "Effect Texture",
    id: /ET_\d+/g,
  },
  {
    value: "Character Weapon Backing",
    label: "Character Weapon Backing",
    id: /stl_wpn_chara_\d+/g,
  },
  {
    value: "Character Burst Screen",
    label: "Character Burst Screen",
    id: /stl_chara_burst_\d+/g,
  },
  {
    value: "Default Weapon Icon",
    label: "Default Weapon Icon",
    id: /stl_default_equipment_\d+/g,
  },
  {
    value: "Event Medal",
    label: "Event Medal",
    id: /stl_event_medal_\d+/g,
  },
  {
    value: "Usable Item",
    label: "Usable Item",
    id: /stl_item_usable_\d+/g,
  },
  {
    value: "Loading Screen Artwork",
    label: "Loading Screen Artwork",
    id: /stl_loading_screen_\d+/g,
  },
  {
    value: "Sticker",
    label: "Sticker",
    id: /stl_stamp_\d+/g,
  },
  {
    value: "Summon Materials",
    label: "Summon Materials",
    id: /stl_summon_mat_\d+/g,
  },
  {
    value: "Summon Backings",
    label: "Summon Backings",
    id: /stl_wpn_beast_\d+/g,
  },
  {
    value: "Scene Script",
    label: "Scene Script",
    id: /talk_event_\d+/g,
  },
  {
    value: "Event Guide",
    label: "Event Guide",
    id: /BinaryData_Walkthrough_\d+/g,
  },
  {
    value: "UI Display Mapping",
    label: "UI Display Mapping",
    id: /.+.swf/g,
  },
  {
    value: "Old Stage Effects",
    label: "Old Stage Effects",
    id: /^EffStg\d+/g,
  },
  {
    value: "Stage Effects",
    label: "Stage Effects",
    id: /_EffStg\d+/g,
  },
  {
    value: "In-game Text",
    label: "In-game Text",
    id: /Message\d+/g,
  },
  {
    value: "In-game Text",
    label: "In-game Text",
    id: /MessageWW\d+/g,
  },
  {
    value: "MessageData Text",
    label: "MessageData Text",
    id: /MessageData_.+/g,
  },
  {
    value: "Guide Image",
    label: "Guide Image",
    id: /MessageImage\d+/g,
  },
  {
    value: "Stage Model",
    label: "Stage Model",
    id: /S\d+Model.bin.+/g,
  },
  {
    value: "Stage Texture",
    label: "Stage Texture",
    id: /S\d+Model.g1t.+/g,
  },
  {
    value: "Sound Effects",
    label: "Sound Effects",
    id: /SE\d+/g,
  },
  {
    value: "Guide Image",
    label: "Guide Image",
    id: /SkillInfo_Party\d+/g,
  },
  {
    value: "AI File Action",
    label: "AI File Action",
    id: /ai_action_think_\d+/g,
  },
  {
    value: "AI File React",
    label: "AI File React",
    id: /ai_reaction_\d+/g,
  },
  {
    value: "AI File Target",
    label: "AI File Target",
    id: /ai_target_think_\d+/g,
  },
  {
    value: "Character Home Screen",
    label: "Character Home Screen",
    id: /config_home_chara_reaction_data_\d+/g,
  },
  {
    value: "Camera Animations",
    label: "Camera Animations",
    id: /motion_camera_\d+/g,
  },
  {
    value: "Bloom Stone",
    label: "Bloom Stone",
    id: /stl_abiquartz_equipment_\d+/g,
  },
  {
    value: "Abyss Icons",
    label: "Abyss Icons",
    id: /stl_abyss_rules_\d+/g,
  },
  {
    value: "Summon Artwork",
    label: "Summon Artwork",
    id: /stl_beast_\d+/g,
  },
  {
    value: "Summon Gem",
    label: "Summon Gem",
    id: /stl_beast_face_\d\d+/g,
  },
  {
    value: "Summon Gem Face",
    label: "Summon Gem Face",
    id: /stl_beast_face_2_\d+/g,
  },
  {
    value: "Summon Card 3",
    label: "Summon Card 3",
    id: /stl_beast_face_3_\d+/g,
  },
  {
    value: "Summon Card 4",
    label: "Summon Card 4",
    id: /stl_beast_face_4_\d+/g,
  },
  {
    value: "Summon Card 5",
    label: "Summon Card 5",
    id: /stl_beast_face_5_\d+/g,
  },
  {
    value: "Summon Name",
    label: "Summon Name",
    id: /stl_beast_name_\d+/g,
  },
  {
    value: "Badge Icon",
    label: "Badge Icon",
    id: /stl_status_badge_l_\d+/g,
  }]

  //param logic1
  useEffect(() => {
    //type params
    const typeList2 = [{
      value: "Character Texture",
      label: "Character Texture",
      id: /CT_\d+/g,
    },
    {
      value: "Character Model",
      label: "Character Model",
      id: /CM_\d+/g,
    },
    {
      value: "Event Image",
      label: "Event Image",
      id: /EventTitle\d+/g,
    },
    {
      value: "Field Map Image",
      label: "Field Map Image",
      id: /FieldMap_.+/g,
    },
    {
      value: "Character Audio",
      label: "Character Audio",
      id: /AV\d+/g,
    },
    {
      value: "Character Event Audio",
      label: "Character Event Audio",
      id: /EV\d+/g,
    },
    {
      value: "Background Music",
      label: "Background Music",
      id: /BGM\d+/g,
    },
    {
      value: "Character Animations",
      label: "Character Animations",
      id: /MOT_\d+/g,
    },
    {
      value: "Weapon Model",
      label: "Weapon Model",
      id: /WM_\d+/g,
    },
    {
      value: "Weapon Texture",
      label: "Weapon Texture",
      id: /WT_\d+/g,
    },
    {
      value: "Old Character Effects",
      label: "Old Character Effects",
      id: /^EffChr\d+/g,
    },
    {
      value: "Character Effects",
      label: "Character Effects",
      id: /_EffChr\d+/g,
    },
    {
      value: "Event Script",
      label: "Event Script",
      id: /battle_event_\d+/g,
    },
    {
      value: "Event Script",
      label: "Event Script",
      id: /battle_event_ww_\d+/g,
    },
    {
      value: "Special Icon",
      label: "Special Icon",
      id: /btl_icon_state_sp_\d+/g,
    },
    {
      value: "Banner Image",
      label: "Banner Image",
      id: /stl_banner_l_g_WW_\d+/g,
    },
    {
      value: "Banner Image",
      label: "Banner Image",
      id: /stl_banner_l_g_tex_\d+/g,
    },
    {
      value: "Mini Event Banner",
      label: "Mini Event Banner",
      id: /stl_banner_m_s_tex_\d+/g,
    },
    {
      value: "Mini Event Banner",
      label: "Mini Event Banner",
      id: /stl_banner_m_s_WW_\d+/g,
    },
    {
      value: "Sale Banner",
      label: "Sale Banner",
      id: /stl_banner_s_tex_\d+/g,
    },
    {
      value: "Sale Banner",
      label: "Sale Banner",
      id: /stl_banner_s_WW_\d+/g,
    },
    {
      value: "Mini Pull Banner",
      label: "Mini Pull Banner",
      id: /stl_banner_shop_tex_\d+/g,
    },
    {
      value: "Mini Pull Banner",
      label: "Mini Pull Banner",
      id: /stl_banner_shop_WW_\d+/g,
    },
    {
      value: "Character Artwork",
      label: "Character Artwork",
      id: /stl_chara_\d+/g,
    },
    {
      value: "Character Turn Order Icon",
      label: "Character Turn Order Icon",
      id: /stl_chara_btl_ctb_\d+/g,
    },
    {
      value: "Character Status Face",
      label: "Character Status Face",
      id: /stl_chara_btl_status_\d+/g,
    },
    {
      value: "Character Event Face",
      label: "Character Event Face",
      id: /stl_chara_event_\d+/g,
    },
    {
      value: "Character Card Face",
      label: "Character Card Face",
      id: /stl_chara_face_\d+/g,
    },
    {
      value: "Monster Face",
      label: "Monster Face",
      id: /stl_mon_face_\d+/g,
    },
    {
      value: "Weapon Icon",
      label: "Weapon Icon",
      id: /stl_weapon_equipment_\d+/g,
    },
    {
      value: "Effect Model",
      label: "Effect Model",
      id: /EM_\d+/g,
    },
    {
      value: "Effect Texture",
      label: "Effect Texture",
      id: /ET_\d+/g,
    },
    {
      value: "Character Weapon Backing",
      label: "Character Weapon Backing",
      id: /stl_wpn_chara_\d+/g,
    },
    {
      value: "Character Burst Screen",
      label: "Character Burst Screen",
      id: /stl_chara_burst_\d+/g,
    },
    {
      value: "Default Weapon Icon",
      label: "Default Weapon Icon",
      id: /stl_default_equipment_\d+/g,
    },
    {
      value: "Event Medal",
      label: "Event Medal",
      id: /stl_event_medal_\d+/g,
    },
    {
      value: "Usable Item",
      label: "Usable Item",
      id: /stl_item_usable_\d+/g,
    },
    {
      value: "Loading Screen Artwork",
      label: "Loading Screen Artwork",
      id: /stl_loading_screen_\d+/g,
    },
    {
      value: "Sticker",
      label: "Sticker",
      id: /stl_stamp_\d+/g,
    },
    {
      value: "Summon Materials",
      label: "Summon Materials",
      id: /stl_summon_mat_\d+/g,
    },
    {
      value: "Summon Backings",
      label: "Summon Backings",
      id: /stl_wpn_beast_\d+/g,
    },
    {
      value: "Scene Script",
      label: "Scene Script",
      id: /talk_event_\d+/g,
    },
    {
      value: "Event Guide",
      label: "Event Guide",
      id: /BinaryData_Walkthrough_\d+/g,
    },
    {
      value: "UI Display Mapping",
      label: "UI Display Mapping",
      id: /.+.swf/g,
    },
    {
      value: "Old Stage Effects",
      label: "Old Stage Effects",
      id: /^EffStg\d+/g,
    },
    {
      value: "Stage Effects",
      label: "Stage Effects",
      id: /_EffStg\d+/g,
    },
    {
      value: "In-game Text",
      label: "In-game Text",
      id: /Message\d+/g,
    },
    {
      value: "In-game Text",
      label: "In-game Text",
      id: /MessageWW\d+/g,
    },
    {
      value: "MessageData Text",
      label: "MessageData Text",
      id: /MessageData_.+/g,
    },
    {
      value: "Guide Image",
      label: "Guide Image",
      id: /MessageImage\d+/g,
    },
    {
      value: "Stage Model",
      label: "Stage Model",
      id: /S\d+Model.bin.+/g,
    },
    {
      value: "Stage Texture",
      label: "Stage Texture",
      id: /S\d+Model.g1t.+/g,
    },
    {
      value: "Sound Effects",
      label: "Sound Effects",
      id: /SE\d+/g,
    },
    {
      value: "Guide Image",
      label: "Guide Image",
      id: /SkillInfo_Party\d+/g,
    },
    {
      value: "AI File Action",
      label: "AI File Action",
      id: /ai_action_think_\d+/g,
    },
    {
      value: "AI File React",
      label: "AI File React",
      id: /ai_reaction_\d+/g,
    },
    {
      value: "AI File Target",
      label: "AI File Target",
      id: /ai_target_think_\d+/g,
    },
    {
      value: "Character Home Screen",
      label: "Character Home Screen",
      id: /config_home_chara_reaction_data_\d+/g,
    },
    {
      value: "Camera Animations",
      label: "Camera Animations",
      id: /motion_camera_\d+/g,
    },
    {
      value: "Bloom Stone",
      label: "Bloom Stone",
      id: /stl_abiquartz_equipment_\d+/g,
    },
    {
      value: "Abyss Icons",
      label: "Abyss Icons",
      id: /stl_abyss_rules_\d+/g,
    },
    {
      value: "Summon Artwork",
      label: "Summon Artwork",
      id: /stl_beast_\d+/g,
    },
    {
      value: "Summon Gem",
      label: "Summon Gem",
      id: /stl_beast_face_\d\d+/g,
    },
    {
      value: "Summon Gem Face",
      label: "Summon Gem Face",
      id: /stl_beast_face_2_\d+/g,
    },
    {
      value: "Summon Card 3",
      label: "Summon Card 3",
      id: /stl_beast_face_3_\d+/g,
    },
    {
      value: "Summon Card 4",
      label: "Summon Card 4",
      id: /stl_beast_face_4_\d+/g,
    },
    {
      value: "Summon Card 5",
      label: "Summon Card 5",
      id: /stl_beast_face_5_\d+/g,
    },
    {
      value: "Summon Name",
      label: "Summon Name",
      id: /stl_beast_name_\d+/g,
    },
    {
      value: "Badge Icon",
      label: "Badge Icon",
      id: /stl_status_badge_l_\d+/g,
    }]

    if (Typesearch2 != null) {
      const filteredtype = typeList2.filter(function (ef) {
        const newfilterpull = ef["label"] === getQueryStringVal("category");
        return newfilterpull;
      })
      if (filteredtype.length != 0) {
        setTypesearch2(getQueryStringVal("category"))
        setCondFilter2(filteredtype[0].id)
      } else {
        setTypesearch2("")
        setCondFilter2("")
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Typesearch2])

  //param logic1
  useEffect(() => {
    //type params
    const typeList = [{
      value: ".g1t",
      label: ".g1t"
    },
    {
      value: ".bin",
      label: ".bin"
    },
    {
      value: ".g1m",
      label: ".g1m"
    },
    {
      value: ".sbin",
      label: ".sbin"
    },
    {
      value: ".swf",
      label: ".swf"
    },
    {
      value: ".config",
      label: ".config"
    },
    {
      value: ".g1s",
      label: ".g1s"
    },
    {
      value: ".vsh",
      label: ".vsh"
    },
    {
      value: ".fsh",
      label: ".fsh"
    },
    {
      value: ".txt",
      label: ".txt"
    },
    {
      value: ".json",
      label: ".json"
    }]

    if (getQueryStringVal("filetype") != null) {
      const filteredtype = typeList.filter(function (ef) {
        const newfilterpull = ef["label"] === getQueryStringVal("filetype");
        return newfilterpull;
      })
      if (filteredtype.length != 0) {
        setTypesearch(getQueryStringVal("filetype"))
        setCondFilter(filteredtype[0].label)
      } else {
        setTypesearch("")
        setCondFilter("")
      }
    }
  }, [setCondFilter, Typesearch, setTypesearch])

  useEffect(() => {
    //search params
    if (getQueryStringVal("search") != null) {
      setSearchTerm(getQueryStringVal("search") != null ? getQueryStringVal("search").toLowerCase() : "")
      setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
      setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
    }
  }, [setTEXTsearch, setFiltersearch])

  const showfilterbutton = () => {
    if (showFilter == false) {
      setFiltersearch("true")
    } else {
      setFiltersearch("")
    }
    setShowFilter((prevValue) => !prevValue);
  }


  const reversebutton = () => {
    setLoop(true);
    setReverse((prevValue) => !prevValue);
    setTimeout(() => setLoop(false), 1000);
  };

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
  //type selector
  const CondSelect2 = (e) => {
    if (e !== null) {
      setTypesearch2(e.label)
      setCondFilter2(e.id);
    } else {
      setCondFilter2("");
      setTypesearch2("")
    }
  };

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

  //button toogle
  useEffect(() => {
    if (reverse == true) {
      setReversesearch("true")
    } else {
      setReversesearch("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Reversesearch, setReverse, reverse])

  //unique
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  function inplaceReverse(arr) {
    var i = 0;
    while (i < arr.length - 1) {
      arr.splice(i, 0, arr.pop());
      i++;
    }
    return arr;
  }

  //filter
  useEffect(() => {
    const filterholder = rawData;

    if (filterholder.length === 0) {
      filterholder.push(...rawData);
    }

    const makeUnique = filterholder.filter(onlyUnique)
    if (reverse == true) {
      inplaceReverse(makeUnique)
    }
    const searchit = makeUnique.filter((file) =>
      (`${file.file_name} - #${file.label}`).toLowerCase().includes(searchTerm)
    );
    const getailmentfilter = searchit.filter(function (ef) {
      const newfilterpull = ef["file_name"].toLowerCase().includes(Typesearch)
      if (condFilter !== "") {
        return newfilterpull;
      }
      return ef
    });
    const getailmentfilter2 = getailmentfilter.filter(function (ef) {
      const newfilterpull2 = ef["file_name"].match(condFilter2) != null
      if (condFilter2 !== "") {
        return newfilterpull2;
      }
      return ef
    });
    setFilterResults(makeUnique);
    setSearchResults(getailmentfilter2);
    const newlistdisplay = getailmentfilter2.slice(0, limits);
    if (limits < getailmentfilter2.length) {
      setShowLoadMore(true);
      setListDisplay(newlistdisplay);
      setListLength(getailmentfilter2.length);
      setDisplayBanner(
        `Displaying ${newlistdisplay.length} of ${getailmentfilter2.length} ${banerDisplayTerm}`
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
  }, [searchTerm, clearFilter, condFilter, condFilter2, reverse, Typesearch]);


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
    setsearchdisplay("");
    setSearchTerm("");
    setCondFilter("")
    setCondFilter2("")
    setTimeout(() => setclearFilter(false), 1000);
  }

  function humanFileSize(bytes, si = false, dp = 1) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }

    const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
      bytes /= thresh;
      ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


    return bytes.toFixed(dp) + ' ' + units[u];
  }

  const makeurl = (data, ver) => {
    return `${ver == "JP" ? "http://cache-game.dissidiaff-oo.com/resource/Android/" : "http://cache-game.g.dissidiaff-oo.com/resource/iOS/"}${data.directory}/${data.file_name}?hash=${data.hash}`
  }

  const iconmaker = (name) => {
    if (name.toLowerCase().includes(".sbin") == true) {
      return <span className='emoji'>🔊</span>
    }
    if (name.toLowerCase().includes(".g1m") == true) {
      return <span className='emoji'>🦾</span>
    }
    if (name.toLowerCase().includes(".g1t") == true) {
      return <span className='emoji'>🖼️</span>
    }
    if (name.toLowerCase().includes(".bin") == true) {
      return <span className='emoji'>📁</span>
    }
    if (name.toLowerCase().includes(".swf") == true) {
      return <span className='emoji'>⛓️</span>
    }
    if (name.toLowerCase().includes(".config") == true) {
      return <span className='emoji'>🔗</span>
    }
    if (name.toLowerCase().includes(".vsh") == true) {
      return <span className='emoji'>🖇️</span>
    }
    if (name.toLowerCase().includes(".txt") == true) {
      return <span className='emoji'>📋</span>
    }
    if (name.toLowerCase().includes(".g1s") == true) {
      return <span className='emoji'>🌟</span>
    }
    if (name.toLowerCase().includes(".json") == true) {
      return <span className='emoji'>📝</span>
    }
    if (name.toLowerCase().includes(".dz") == true) {
      return <span className='emoji'>🤐</span>
    }
    return ""
  }

  const fileclass = (name) => {
    if (name.match(/CT_\d+/g) != null) {
      return "Character Texture"
    }
    if (name.match(/CM_\d+/g) != null) {
      return "Character Model"
    }
    if (name.match(/EventTitle\d+/g) != null) {
      return "Event Image"
    }
    if (name.match(/FieldMap_.+/g) != null) {
      return "Field Map Image"
    }
    if (name.match(/AV\d+/g) != null) {
      return "Character Audio"
    }
    if (name.match(/EV\d+/g) != null) {
      return "Character Event Audio"
    }
    if (name.match(/BGM\d+/g) != null) {
      return "Background Music"
    }
    if (name.match(/MOT_\d+/g) != null) {
      return "Character Animations"
    }
    if (name.match(/WM_\d+/g) != null) {
      return "Weapon Model"
    }
    if (name.match(/WT_\d+/g) != null) {
      return "Weapon Texture"
    }
    if (name.match(/^EffChr\d+/g) != null) {
      return "Old Character Effects"
    }
    if (name.match(/_EffChr\d+/g) != null) {
      return "Character Effects"
    }
    if (name.match(/battle_event_\d+/g) != null) {
      return "Event Script"
    }
    if (name.match(/battle_event_ww_\d+/g) != null) {
      return "Event Script"
    }
    if (name.match(/btl_icon_state_sp_\d+/g) != null) {
      return "Special Icon"
    }
    if (name.match(/stl_banner_l_g_WW_\d+/g) != null) {
      return "Banner Image"
    }
    if (name.match(/stl_banner_l_g_tex_\d+/g) != null) {
      return "Banner Image"
    }
    if (name.match(/stl_banner_m_s_tex_\d+/g) != null) {
      return "Mini Event Banner"
    }
    if (name.match(/stl_banner_m_s_WW_\d+/g) != null) {
      return "Mini Event Banner"
    }
    if (name.match(/stl_banner_s_tex_\d+/g) != null) {
      return "Sale Banner"
    }
    if (name.match(/stl_banner_s_WW_\d+/g) != null) {
      return "Sale Banner"
    }
    if (name.match(/stl_banner_shop_tex_\d+/g) != null) {
      return "Mini Pull Banner"
    }
    if (name.match(/stl_banner_shop_WW_\d+/g) != null) {
      return "Mini Pull Banner"
    }
    if (name.match(/stl_chara_\d+/g) != null) {
      return "Character Artwork"
    }
    if (name.match(/stl_chara_btl_ctb_\d+/g) != null) {
      return "Character Turn Order Icon"
    }
    if (name.match(/stl_chara_btl_status_\d+/g) != null) {
      return "Character Status Face"
    }
    if (name.match(/stl_chara_event_\d+/g) != null) {
      return "Character Event Face"
    }
    if (name.match(/stl_chara_face_\d+/g) != null) {
      return "Character Card Face"
    }
    if (name.match(/stl_mon_face_\d+/g) != null) {
      return "Monster Face"
    }
    if (name.match(/stl_weapon_equipment_\d+/g) != null) {
      return "Weapon Icon"
    }
    if (name.match(/EM_\d+/g) != null) {
      return "Effect Model"
    }
    if (name.match(/ET_\d+/g) != null) {
      return "Effect Texture"
    }
    if (name.match(/stl_wpn_chara_\d+/g) != null) {
      return "Character Weapon Backing"
    }
    if (name.match(/stl_chara_burst_\d+/g) != null) {
      return "Character Burst Screen"
    }
    if (name.match(/stl_default_equipment_\d+/g) != null) {
      return "Default Weapon Icon"
    }
    if (name.match(/stl_event_medal_\d+/g) != null) {
      return "Event Medal"
    }
    if (name.match(/stl_item_usable_\d+/g) != null) {
      return "Usable Item"
    }
    if (name.match(/stl_loading_screen_\d+/g) != null) {
      return "Loading Screen Artwork"
    }
    if (name.match(/stl_stamp_\d+/g) != null) {
      return "Sticker"
    }
    if (name.match(/stl_summon_mat_\d+/g) != null) {
      return "Summon Materials"
    }
    if (name.match(/stl_wpn_beast_\d+/g) != null) {
      return "Summon Backings"
    }
    if (name.match(/talk_event_\d+/g) != null) {
      return "Scene Script"
    }
    if (name.match(/BinaryData_Walkthrough_\d+/g) != null) {
      return "Event Guide"
    }
    if (name.match(/.+.swf/g) != null) {
      return "UI Display Mapping"
    }
    if (name.match(/EffAttachData_\d+/g) != null) {
      return "Ability Effects"
    }
    if (name.match(/^EffStg\d+/g) != null) {
      return "Old Stage Effects"
    }
    if (name.match(/_EffStg\d+/g) != null) {
      return "Stage Effects"
    }
    if (name.match(/Message\d+/g) != null) {
      return "In-game Text"
    }
    if (name.match(/MessageWW\d+/g) != null) {
      return "In-game Text"
    }
    if (name.match(/MessageData_.+/g) != null) {
      return "MessageData Text"
    }
    if (name.match(/MessageImage\d+/g) != null) {
      return "Guide Image"
    }
    if (name.match(/S\d+Model.bin.+/g) != null) {
      return "Stage Model"
    }
    if (name.match(/S\d+Model.g1t.+/g) != null) {
      return "Stage Texture"
    }
    if (name.match(/SE\d+/g) != null) {
      return "Sound Effects"
    }
    if (name.match(/SkillInfo_Party\d+/g) != null) {
      return "Guide Image"
    }
    if (name.match(/ai_action_think_\d+/g) != null) {
      return "AI File Action"
    }
    if (name.match(/ai_reaction_\d+/g) != null) {
      return "AI File React"
    }
    if (name.match(/ai_target_think_\d+/g) != null) {
      return "AI File Target"
    }
    if (name.match(/config_home_chara_reaction_data_\d+/g) != null) {
      return "Character Home Screen"
    }
    if (name.match(/motion_camera_\d+/g) != null) {
      return "Camera Animations"
    }
    if (name.match(/stl_abiquartz_equipment_\d+/g) != null) {
      return "Bloom Stone"
    }
    if (name.match(/stl_abyss_rules_\d+/g) != null) {
      return "Abyss Icons"
    }
    if (name.match(/stl_beast_\d+/g) != null) {
      return "Summon Artwork"
    }
    if (name.match(/stl_beast_face_\d\d+/g) != null) {
      return "Summon Gem"
    }
    if (name.match(/stl_beast_face_2_\d+/g) != null) {
      return "Summon Gem Face"
    }
    if (name.match(/stl_beast_face_3_\d+/g) != null) {
      return "Summon Card"
    }
    if (name.match(/stl_beast_face_4_\d+/g) != null) {
      return "Summon Card"
    }
    if (name.match(/stl_beast_face_5_\d+/g) != null) {
      return "Summon Card"
    }
    if (name.match(/stl_beast_name_\d+/g) != null) {
      return "Summon Name"
    }
    if (name.match(/stl_status_badge_l_\d+/g) != null) {
      return "Badge Icon"
    }
    return ""
  }

  const filelist = listDisplay;

  return (
    <div>
      <br />
      <div className="charfilterspacer" />
      <div key="filter1" onClick={showfilterbutton} className="charfilter"><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow" /> : <TiArrowSortedDown className="downarrow" />}</div>
      <div className="event-search-reverse-holder">
        {showFilter == true ? "" :
          <ul className="bufftypes">
            <Link to={`/${ver}/filelist/file_list/compare`} >
              <Tippy content={`Added from update`}>
                <li className={`${newcompare == "compare" ? "filteractive" : "filterinactive"} buffbutton newbutton spaceright`}></li>
              </Tippy>
            </Link>
          </ul>}
        {showFilter == false ?
          <div className="char-search-reverse-holder">
            <IoSearch className="searchicon" />
            <div className="search-holder el">
              <input
                className="char-search-bar"
                type="text"
                id="search"
                placeholder="Name Search"
                value={searchdisplay}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              {searchTerm === "" ? "" :
                <IoMdCloseCircleOutline onClick={clearSearch} className="clearsearch"></IoMdCloseCircleOutline>}
            </div>
          </div>
          : ""
        }
        {showFilter == true ? "" :
          <ul className="bufftypes">
            <Link to={`/${ver}/filelist/file_list/new`} >
              <Tippy content={`Full list`}>
                <li className={`${newcompare == "new" ? "filteractive" : "filterinactive"} buffbutton fullbutton`}></li>
              </Tippy>
            </Link>
          </ul>}
      </div>
      <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
        <div className="similarbanner">Volume Select</div>
        <div className="filterholderflair">
          <ul className="bufftypes">
            <Link to={`/${ver}/filelist/file_list/compare?filter=true`} >
              <Tippy content={`Added from update`}>
                <li className={`${newcompare == "compare" ? "filteractive" : "filterinactive"} buffbutton newbutton`}></li>
              </Tippy>
            </Link>
            <Link to={`/${ver}/filelist/file_list/new?filter=true`} >
              <Tippy content={`Full list`}>
                <li className={`${newcompare == "new" ? "filteractive" : "filterinactive"} buffbutton fullbutton`}></li>
              </Tippy>
            </Link>
          </ul>
          <div className="typeholder">
            <Select
              defaultValue={Typesearch2 != "" ? { value: Typesearch2, label: Typesearch2 } : null}
              key={Typesearch2}
              isSearchable={true}
              placeholder="Category..."
              className='typecontainer'
              classNamePrefix="typetext"
              onChange={CondSelect2}
              options={typeListArray2}
              isClearable={true}
            />
          </div>
          <div className="typeholder">
            <Select
              defaultValue={Typesearch != "" ? { value: Typesearch, label: Typesearch } : null}
              key={Typesearch}
              isSearchable={true}
              placeholder="File Type..."
              className='typecontainer'
              classNamePrefix="typetext"
              onChange={CondSelect}
              options={typeListArray}
              isClearable={true}
            />
          </div>
          <div className="search-reverse-holder">
            <div className="search-holder">
              <IoSearch className="innersearchicon" />
              <input
                className="search-bar"
                type="text"
                id="search2"
                placeholder="File Search"
                value={searchdisplay}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              {searchTerm === "" ? "" :
                <IoMdCloseCircleOutline onClick={clearSearch} className="clearsearch"></IoMdCloseCircleOutline>}
            </div>
            <Tippy content="Reverse Order" className="tooltip" >
              <div className={`reversebox`} ><i onClick={reversebutton} className={`reversebutton ${loop ? "flip" : ""}`} ><ImSortAmountDesc className={`reversebutton ${reverse ? "" : "nodisplay"}`} /><ImSortAmountAsc className={`reversebutton ${reverse ? "nodisplay" : ""}`} /></i></div>
            </Tippy>
          </div>
          <div>
            <CopyToClipboard text={url}>
              <div className="sharebox">
                <Tippy content="Link Copied!" inertia={true} animation={"shift-away"} touch={true} arrow={false} trigger={"click"} placement={"top"} duration={[100, 500]}>
                  <div className="centertext"><FaShareSquare className="shareicon" />&nbsp;Share</div>
                </Tippy>
              </div>
            </CopyToClipboard>
            <Tippy content="Reset Filters" className="tooltip" >
              <div onClick={resetbutton} className={`clearbox`} ><div className="makecenter">Reset&nbsp;<FaUndoAlt className={`clearbutton ${clearFilter ? "loop" : ""}`} ></FaUndoAlt></div></div>
            </Tippy>
          </div>
        </div>
        <a className="subtext whitecolor" href="https://www.google.com/search?q=browser+enable+insecure+content" target="_blank" rel="noreferrer noopener">If files won't download, make sure broswer has insecure content enabled for site</a>
      </div>
      <div className="ultimaweaponitemholder">
        <div className="subtext">
          {displayBanner}
        </div>
        {filelist.length > 0 ? (
          filelist.map(files => (
            <div className="infonameholder clicky newblue filelistclass" key={files.file_name}>
              <a className="filelisttext" rel="noreferrer noopener" target="_blank" download href={makeurl(files, ver)}>
                <div >{iconmaker(files.file_name)}{` ${files.file_name} - ${humanFileSize(files.size)}`}</div>
              </a>
              <div className="abilityJPname">
                {fileclass(files.file_name)}
              </div>
              <div className="unique">
                {files.label == undefined ? "" : files.label}
              </div>
            </div>
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
  )
}
export default File_List