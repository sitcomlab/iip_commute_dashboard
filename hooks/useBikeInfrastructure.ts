
import { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';


//TODO: type this as geojson formatted featurecollection
type bikeApiResponse = GeoJSON.FeatureCollection;
//type bikeApiResponse = any;

//simplest example of a live-updating hook

const INTERVAL = 60 * 60 * 24; // 1 day

//function to fetch the bicycle infrastructure
const getBikeInfrastructData = async () => {
    try {
        //TODO: remove that and put into .env at a later time to prevent leakage
        let urlString = process.env.NEXT_PUBLIC_BICYCLE_INFRASTRUCTURE_URL;
        if (urlString == undefined){urlString = ''}

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

export default function useBikeInfrastructData() {
    const [data, setData] = useState<bikeApiResponse>()

    //fetch the data periodically
    useEffect(() => {
        const timer = setInterval(() => {
            //set the data once it arrives
            getBikeInfrastructData().then(e => setData(e))
        }, INTERVAL * 1000)
        getBikeInfrastructData().then(e => setData(e))

    }, [])

    useEffect(() => {
        if (!data) {
            return
        }


    })

    return data
}