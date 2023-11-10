import { useContext} from 'react';
import {Layer} from 'leaflet';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { Paper } from '@mui/material';

import { LayersControlContext } from './layerControlContext';

const POSITION_CLASSES: { [key: string]: string } = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
}

interface LegendProps {
    children: ReactElement[];
    position: string;
}

interface ILayerObj {
    layer: Layer;
    group: string;
    name: string;
    icon: JSX.Element;
    checked: boolean;
    id: number;
}

function getSymbology(layer){
    
}


function Legend({children, position}: LegendProps) {
    //const [layers, setLayers] = useState<ILayerObj[]>([]);
    const layers = useContext(LayersControlContext)
    const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;

    //const groupedLayers = lodashGroupBy(layers, 'group');

    const categories = layers.layers || [];
    console.log(categories)

    return (
        <>
            <div className={positionClass}>
                <div className='leaflet-control leaflet-bar'>
                    <Paper className='p-3'>
                        <span><h1 className='text-lg text-center bold'>Legende</h1></span>
                        {
                            categories.map((category, index) => (
                                category.checked && <div key={index}><p>{category.name}</p></div>
                            ))
                        }
                    </Paper>
                </div>
                {children}
            </div>
        </>
    )
}

export default Legend;