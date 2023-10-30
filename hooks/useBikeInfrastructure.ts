
import { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';


//TODO: type this as geojson formatted featurecollection
type bikeApiResponse = GeoJSON.FeatureCollection;
//type bikeApiResponse = any;

const INTERVAL = 60 * 60 * 12; // 1/2 day

//function to fetch the bicycle infrastructure
const getBikeInfrastructData = async (urlString) => {
    try {
        //TODO: remove that and put into .env at a later time to prevent leakage
        //let urlString = process.env.NEXT_PUBLIC_BICYCLE_INFRASTRUCTURE_URL;
        
        if (urlString == undefined){urlString =  ''}

        const res = await fetch(
            urlString,
        );
        const data = await res.json();
        return data;
    } catch (error) {

        //TODO: error handling down the line
        return error
    }

}

export default function useBikeInfrastructData(urlString) {
    const [data, setData] = useState<bikeApiResponse>()
    const [loopIteration, setLoopIteration] = useState(() => {return 0})
    function incrementLoop(){
        setLoopIteration(prevLoop => prevLoop + 1)
    }

    //start new loop whenever the iteration counter has changed
    useEffect(() => {
        //get the data
        getBikeInfrastructData(urlString).then(e => setData(e))

        //start another cycle of the loop
        setTimeout(() => {
            //increment count again, so the loop starts anew.
            //this way the cycle breaks when the component isn't running anymore    
            incrementLoop()
        }, INTERVAL * 1000)
    }, [loopIteration])

    useEffect(() => {
        if (!data) {
            return
        }

    })

    return data
}