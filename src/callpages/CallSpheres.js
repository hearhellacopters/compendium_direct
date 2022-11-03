import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getSpheres } from '../redux/ducks/spheres';
import Spheres from '../Spheres';
import Loading from './_loading'

const CallSpheres = () =>{
    
    const dispatch = useDispatch();

    const ProcessedSpheres = useSelector((state) => 
    state.spheres.spheres
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedSpheres == undefined) {
        dispatch(getSpheres());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,ProcessedSpheres]);

    return (
        ProcessedSpheres != undefined ?
        <Spheres ProcessedSpheres={ProcessedSpheres}/>
        : 
        <Loading/>
    )

}

export default CallSpheres;