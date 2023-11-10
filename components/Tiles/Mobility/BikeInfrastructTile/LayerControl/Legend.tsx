import { useState} from 'react';
import {Layer} from 'leaflet';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { Paper } from '@mui/material';
import lodashGroupBy from 'lodash.groupby';

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

function Legend({children, position}: LegendProps) {
    const [layers, setLayers] = useState<ILayerObj[]>([]);
    const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;

    const groupedLayers = lodashGroupBy(layers, 'group');

    return (
        <>
            <div className={positionClass}>
                <div className='leaflet-control leaflet-bar'>
                    <Paper>
                        <div>{'test'}</div>
                    </Paper>
                </div>
                {children}
            </div>
        </>
    )
}

export default Legend;