
import React, { useState, useEffect, useCallback } from 'react';
import { ObjectView } from 'react-object-view'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import ReplacerCharacter from './components/ReplacerCharacter';
import makediff from './processing/makediff';
import Dropzone from 'react-dropzone'
import format_cleaner from './processing/format_cleaner';
import Tippy from './components/TippyDefaults'

export default function Diffing () {

    const form = {updown:true,diffing:true}

    const [filesListed1, setfilesListed1] = useState();
    const [filesListed2, setfilesListed2] = useState();
    const [textold, settextold] = useState();
    const [textnew, settextnew] = useState();
    const [justtext, setjusttext] = useState();
    const [textcompare, settextcompare] = useState();
    const [compared, setcompared] = useState();
    const [collapsed, setcollapsed] = useState(true)
    const [formatting, setformatting] = useState(true)

    const togglemerge = () => {
        setformatting((prevValue) => !prevValue);
    }

    const isEqualArrays = function compareArray(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        var match = true;
        for (var i = 0, x = arr1.length; i < x; i++) {
            if (arr1[i] !== arr2[i]) {
                match = false;
            }
        }
        return match;
    }
    const toString = Object.prototype.toString;

    const check_numbers = (e) => {
        var holder = e
        if (typeof e == "string") {
            if (formatting == true) {
                holder = format_cleaner(e)
            }
        }
        if (typeof e == "object") {
            const returner = {}
            const all_keys = Object.keys(e)
            all_keys.map(self => {
                if (typeof e[self] == "string") {
                    Object.assign(returner, { [self]: format_cleaner(e[self]) })
                } else {
                    Object.assign(returner, { [self]: e[self] })
                }
            })
            holder = returner
        }
        return holder
    }

    function compare(a, b, allDiffs, previousPath) {
        var akeys = Object.keys(a);
        var key = undefined
        for (key of akeys) {
            var currentPath = previousPath.concat(key);
            var typeOfa = toString.call(a[key]);
            var typeOfb = toString.call(b[key]);
            if (typeOfa !== typeOfb) {
                allDiffs.push({ Entry: currentPath[0], objectname: currentPath[1], valueOld: check_numbers(b[key]), valueNew: check_numbers(a[key]) })
                continue
            }
            if (typeOfa === '[object Array]') {
                //if(!isEqualArrays(a[key], b[key])){//remove this if , if you want enhance route
                //   allDiffs.push({Entry: currentPath[0], object: currentPath[1], valueOld: b[key], valueNew: a[key]})
                //}
                continue;
            }
            if (typeOfa === '[object Object]') {
                compare(a[key], b[key], allDiffs, currentPath)
                continue
            }
            if (a[key] !== b[key]) {
                allDiffs.push({ Entry: currentPath[0], objectname: currentPath[1], valueOld: check_numbers(b[key]), valueNew: check_numbers(a[key]) })
            }
        }

        const group = {};

        const finaloutput = allDiffs.forEach(({ Entry, ...rest }) => {
            group[Entry] = group[Entry] || { Entry, changed: [] };
            group[Entry].changed.push(rest)
            //Object.assign(group[Entry], {changed: rest})

        })

        return group
    }

    const loadcompare = () => {
        if (filesListed1 == undefined || filesListed2 == undefined) {
            ""
        } else {
            const compared2 = compare(filesListed1, filesListed2, [], [])
            setcompared(compared2)
        }
    }

    const [loadfile1, setloadfile1] = useState();
    const [loadfile2, setloadfile2] = useState();
    const [classname1, setclassname1] = useState("dropzone");
    const [classname2, setclassname2] = useState("dropzone");

    const handleChange3 = (f) => {
        if (f == null) { "" } else {
            const files = Object.entries(f).filter(function ([file, value]) {
                return value["name"] != null;
            })
            const fr = new FileReader();
            fr.onload = e => {
                const result = JSON.parse(e.target.result);
                setfilesListed1(result)
            }
            fr.readAsText(files[0][1]);
        }
    }
    const handleChange4 = (f) => {
        if (f == null) { "" } else {
            const files = Object.entries(f).filter(function ([file, value]) {
                return value["name"] != null;
            })
            const fr = new FileReader();
            fr.onload = e => {
                const result = JSON.parse(e.target.result);
                setfilesListed2(result)
            }
            fr.readAsText(files[0][1]);
        }
    }

    const openallbutton = () => {
        if (collapsed == true) {
            setcollapsed(false)
        } else {
            setcollapsed(true)
        }
    }

    const handleChangeOld = (e) => {
        settextold(e.target.value)
    };

    const handleKeyDownOld = (event) => {
        if (event.key === 'Enter') {
            settextold(event.target.value);
        }
    }

    const handleChangeNew = (e) => {
        settextnew(e.target.value)
    };

    const handleKeyDownNew = (event) => {
        if (event.key === 'Enter') {
            settextnew(event.target.value);
        }
    }

    const comparetext = () => {
        if (textold != undefined && textnew != undefined) {
            settextcompare(makediff(textold, textnew))
        }
        if (textold == undefined && textnew != undefined) {
            let replacement = textnew
            setjusttext(replacement)
        }
        if (textold != undefined && textnew == undefined) {
            let replacement = textold
            setjusttext(replacement)
        }
    }

    return (
        <div className="">
            <Helmet>
                <title>Diffing - Dissidia Compendium Direct</title>
                <meta property="og:site_name" content="Dissidia Compendium" />
                <meta property="og:type" content="website" />
                <meta name="description" content="Diffing" />
                <meta name="twitter:title" content="Compendium Direct Diffing Page." />
                <meta name="twitter:description" content="Compendium Direct Diffing Page." />
                <meta name="twitter:image" content="https://dissidiacompendium.com/images/static/site/logo152.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image:alt" content="Dissidia Direct Compendium" />
                <meta property="og:title" content="Compendium Direct Diffing" />
                <meta property="og:description" content="Compendium Direct Diffing Page." />
                <meta property="og:image" content="https://dissidiacompendium.com/images/static/site/logo152.png" />
                <meta property="og:url" content="https://direct.dissidiacompendium.com/" />
            </Helmet>
            <div className="content">
                <h1>Tools</h1>
                <ul className="bannertabs">
                    {
                    //<Link to={`/tools/notices`}>
                    //    <li className={""} >Notices</li>
                    //</Link>
                    //<Link to={`/tools/missions?JP=true&panels=true`}>
                    //    <li className={""} >Missions</li>
                    //</Link>
                    }
                    <Link to={`/tools/diffing`}>
                        <li className={"active"} ><span className="gemselected" />Diffing</li>
                    </Link>
                    <Link to={`/tools/trans`}>
                        <li className={""} >Trans</li>
                    </Link>
                    {
                    //<Link to={`/tools/compare`}>
                    //    <li className={""} >Compare</li>
                    //</Link>
                    }
                </ul>
                <div className="buffsholder">
                    <div className="lastupdate">File Diffing</div>
                    <div className="filterholder">
                        <div className="filterholderflair">
                            <Dropzone
                                accept={{ "application/json": ['.json'] }}
                                onDrop={(files, event) => { setloadfile1(files[0]), setclassname1("dropzone"), handleChange3(files) }}
                                onDragOver={(event) => setclassname1("dropzoneactive")}
                                onFrameDrop={(event) => setclassname1("dropzone")}
                                onDragLeave={(event) => setclassname1("dropzone")}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                        <div className={classname1} {...getRootProps()}>
                                            <input id="search" {...getInputProps()} />
                                            {loadfile1 ? <div>{`New File: ${loadfile1.name}`}<br />{`Size: ${loadfile1.size}`}</div> : "Drop New File Here"}
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        </div>
                    </div>
                    <div className="filterholder">
                        <div className="filterholderflair">
                            <Dropzone
                                accept={{ "application/json": ['.json'] }}
                                onDrop={(files, event) => { setloadfile2(files[0]), setclassname2("dropzone"), handleChange4(files) }}
                                onDragOver={(event) => setclassname2("dropzoneactive")}
                                onFrameDrop={(event) => setclassname2("dropzone")}
                                onDragLeave={(event) => setclassname2("dropzone")}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                        <div className={classname2} {...getRootProps()}>
                                            <input id="search2" {...getInputProps()} />
                                            {loadfile2 ? <div>{`Old File: ${loadfile2.name}`}<br />{`Size: ${loadfile2.size}`}</div> : "Drop Old File Here"}
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        </div>
                    </div>
                    <div className="margeholder">
                        <div className="Merge">
                            <Tippy content="Replaces programming tags">
                                <label htmlFor='search' className="MergeText">Formatting?</label>
                            </Tippy>
                            <div key="mergecheck1" className={`${formatting == true ? "nodisplay" : `uncheck`}`} onClick={togglemerge} />
                            <div key="mergecheck2" className={`${formatting == true ? "check" : `nodisplay`}`} onClick={togglemerge} />
                        </div>
                    </div>
                    <div className="eventbuttons">
                        <div className="chq-atc--button margauto" onClick={loadcompare}>Compare</div>
                        <div className="sharebutton margauto fiveupanddown" onClick={openallbutton}>{collapsed == true ? "Open All" : "Close All"}</div>
                    </div>
                    <div className="mainholder">
                    <span className='react-json-view'>
                            <ObjectView 
                            options={
                                {
                                  hideDataTypes: true,
                                }
                              }
                            data={compared} />
                    </span>
                    </div>
                    <div>
                        <div className="lastupdate">Text Diffing</div>
                        <div className="diffholder">
                            <textarea
                                className="diffbox"
                                type="text"
                                placeholder="Old Text"
                                onChange={handleChangeOld}
                                onKeyDown={handleKeyDownOld}>
                            </textarea>
                            <textarea
                                className="diffbox"
                                type="text"
                                placeholder="New Text"
                                onChange={handleChangeNew}
                                onKeyDown={handleKeyDownNew}>
                            </textarea>
                        </div>
                        <div className="chq-atc--button margauto" onClick={comparetext}>Compare</div>
                        <div>
                            <div className="bluebase introflex">
                                {textcompare != undefined && textold != undefined && textnew != undefined ?
                                    ReplacerCharacter(textcompare,form)
                                    :
                                    justtext == undefined ? <div style={{ textAlign: "center" }}>Run a text compare</div> : ""}
                                {justtext != undefined && textold == undefined && textnew != undefined ?
                                    ReplacerCharacter(justtext,form)
                                    : ""}
                                {justtext != undefined && textold != undefined && textnew == undefined ?
                                    ReplacerCharacter(justtext,form)
                                    : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}