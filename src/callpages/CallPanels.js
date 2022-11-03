import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getPanels } from '../redux/ducks/panels';
import { getJPToggle } from '../redux/ducks/jptoggle';
import Panels from '../Panels';
import Loading from './_loading'

const CallBannersPage = () =>{
    
    const dispatch = useDispatch();

    const ProcessedPanels = useSelector((state) => 
    state.panels.panels
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedPanels == undefined) {
        dispatch(getPanels());
        }
        if (mounted) {
        dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,ProcessedPanels]);

    const jptoggledata = useSelector((state) => 
    state.toggle.toggle
    );

    return (
        ProcessedPanels != undefined && jptoggledata != undefined?
        <Panels ProcessedPanels={ProcessedPanels} jptoggledata={jptoggledata}/>
        : 
        <Loading/>
    )

}

export default CallBannersPage;