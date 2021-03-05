import { useEffect, useState } from 'react'
import Geolocation from 'react-native-geolocation-service'
import { useDispatch } from 'react-redux'
import { ASIGNARPOSITION } from '../Reducer/ActionTypes'

export const WatchPosition = () => {

    const dispatch = useDispatch()
    const [errorRegion, setErrorRegion] = useState(null)
    let watchId = null;

    useEffect(() => {
        const getlocation = async () => {
            watchId = Geolocation.watchPosition((position) => 
                {
                    dispatch({ type: ASIGNARPOSITION, payload: position.coords })
                },
                (error) => {
                    setErrorRegion(error)
                }, 
                { 
                    timeout: 20000, enableHighAccuracy: true, maximumAge: 10000, distanceFilter: 10
                }
            );
        }

        getlocation()
        
        return (() => {
            Geolocation.clearWatch(watchId)
        })
    }, [watchId, setErrorRegion])

    return { errorRegion: errorRegion }
}