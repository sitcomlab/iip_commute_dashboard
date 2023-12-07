import { useEffect, useState } from 'react';

const INTERVAL = 60 * 10

const getWeatherData = async function(urlString: String){
    try {        
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

export default function useWeatherData(lat, lon){
    const [data, setData] = useState<JSON>()
    const [loopIteration, setLoopIteration] = useState(() => {return 0})
    function incrementLoop(){
        setLoopIteration((prevLoop: number) => prevLoop + 1)
    }

    const owm_key = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY
    const urlString=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${owm_key}`

        //start new loop whenever the iteration counter has changed
        useEffect(() => {
            //get the data
            getWeatherData(urlString).then(e => setData(e))
    
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