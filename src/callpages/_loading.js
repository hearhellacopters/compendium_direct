import React, {useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import Random from '../processing/Random'
import { useDispatch, useSelector } from "react-redux";
import { getMaintenance } from '../redux/ducks/maintenance';

const LoadHelper = () => {

    const randomimage = Random(7);

    const [timeout, settimeout] = useStateIfMounted(false)

    useEffect(()=>{
    setTimeout(() => 
        settimeout(true)
    ,25000)
    },[settimeout])

    const dispatch = useDispatch();

    const check = useSelector((state) => 
      state.maintenance.maintenance
      );
  
      useEffect(() => {
        let mounted = true
        if (mounted && check == undefined) {
        dispatch(getMaintenance())
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,check]);

var agent = {browser:{name:null,version:null,v:null,userAgent:null,app:null,os:null},mobile:false,pointlock:false};

var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName  = navigator.appName;
var fullVersion  = ''+parseFloat(navigator.appVersion); 
var majorVersion = parseInt(navigator.appVersion,10);
var nameOffset,verOffset,ix;
agent.pointlock = 'pointerLockElement' in document ||
    'mozPointerLockElement' in document ||
    'webkitPointerLockElement' in document;

// In Opera, the true version is after "Opera" or after "Version"
if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
 browserName = "Opera";
 fullVersion = nAgt.substring(verOffset+6);
 if ((verOffset=nAgt.indexOf("Version"))!=-1) 
   fullVersion = nAgt.substring(verOffset+8);
}
// In MSIE, the true version is after "MSIE" in userAgent
else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
 browserName = "Microsoft Internet Explorer";
 fullVersion = nAgt.substring(verOffset+5);
}
// In Chrome, the true version is after "Chrome" 
else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
 browserName = "Chrome";
 fullVersion = nAgt.substring(verOffset+7);
}
// In Safari, the true version is after "Safari" or after "Version" 
else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
 browserName = "Safari";
 fullVersion = nAgt.substring(verOffset+7);
 if ((verOffset=nAgt.indexOf("Version"))!=-1) 
   fullVersion = nAgt.substring(verOffset+8);
}
// In Firefox, the true version is after "Firefox" 
else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
 browserName = "Firefox";
 fullVersion = nAgt.substring(verOffset+8);
}
// In most other browsers, "name/version" is at the end of userAgent 
else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
          (verOffset=nAgt.lastIndexOf('/')) ) 
{
 browserName = nAgt.substring(nameOffset,verOffset);
 fullVersion = nAgt.substring(verOffset+1);
 if (browserName.toLowerCase()==browserName.toUpperCase()) {
  browserName = navigator.appName;
 }
}
// trim the fullVersion string at semicolon/space if present
if ((ix=fullVersion.indexOf(";"))!=-1)
   fullVersion=fullVersion.substring(0,ix);
if ((ix=fullVersion.indexOf(" "))!=-1)
   fullVersion=fullVersion.substring(0,ix);

majorVersion = parseInt(''+fullVersion,10);
if (isNaN(majorVersion)) {
 fullVersion  = ''+parseFloat(navigator.appVersion); 
 majorVersion = parseInt(navigator.appVersion,10);
}
agent.browser.name = browserName;
agent.browser.version = fullVersion;
agent.browser.v = majorVersion;
agent.browser.app = navigator.appName;
agent.browser.userAgent = navigator.userAgent;
var OSName="Unknown OS";
if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

agent.browser.os = OSName;
agent.mobile = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);

    return (
        timeout == false ?
        check && check.maintenance == true ?
        <div className="content loading2">
            <h1><img className="loadingbardots" src={"https://dissidiacompendium.com/images/static/site/loading.gif"}></img></h1>
                <div className="filterholder">
                    <div className="filterholderflair" >
                        <div className="infobase Debuffbase centertext warning">
                        Site is in maintenance and may not load<br/>
                        Please check back again later<br/>
                        Sorry for the inconvenience!
                        </div>
                    </div>
                </div>
        </div>
        :
        <div className="content loading2"><h1><img className="loadingbardots" src={"https://dissidiacompendium.com/images/static/site/loading.gif"}></img></h1></div>
        :
        <div className="content loading2">
            <h1><img className="loadingbardots" src={"https://dissidiacompendium.com/images/static/site/loading.gif"}></img></h1>
                <div className="filterholder">
                    <div className="filterholderflair" >
                        <div className="nolinksholder"><img alt="oh no" src={`https://dissidiacompendium.com/images/static/icons/404/${randomimage}.png`}/>
                        </div>
                        {check == true ?
                        <div className="infobase Debuffbase centertext warning">
                        Site is in maintenance and may not load<br/>
                        Please check back again later<br/>
                        Sorry for the inconvenience!
                        </div>
                        :
                        <div className="infobase Debuffbase centertext warning">
                        Loading is taking longer than normal<br/>
                        Please make sure you have a strong connection<br/><br/>
                        We recommend <a className="updatelink" rel="noreferrer noopener"  target="_blank" href={`https://www.google.com/chrome/`}>Google Chrome Browser</a><br/>
                        for maximum compatibility<br/><br/> 
                        You can also try <a className="updatelink" rel="noreferrer noopener"  target="_blank" href={`https://www.google.com/search?q=how+to+clear+browser+cache+${agent.browser.name}${agent.browser.os != "Unknown OS" ? `+for+${agent.browser.os}`: ""}`}>clearing your browser's cache</a><br/><br/>
                        If issues persistent, please notify <a className="updatelink" rel="noreferrer noopener" href="https://drive.google.com/open?id=1IJE93eDUcKIEKuQH0jwMZ7WaWVcrldUqbc6EyEZRrzs" target="_blank">admins</a>
                        </div>
                        }
                    </div>
                </div>
        </div>
        )
}
export default LoadHelper