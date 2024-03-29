const CityViewConfig = {
    muenster: {
        name: 'Münster',
        mapSettings: 
            {
                center: [51.962, 7.627],
                zoom: 12
            },
        infrastructureSource: process.env.NEXT_PUBLIC_BICYCLE_INFRASTRUCTURE_URL_MS
    },
    osnabrueck: {
        name: 'Osnabrück',
        mapSettings: 
            {
                center: [52.279, 8.047],
                zoom: 12
            },
        infrastructureSource: process.env.NEXT_PUBLIC_BICYCLE_INFRASTRUCTURE_URL_OS
    }
}

export default CityViewConfig