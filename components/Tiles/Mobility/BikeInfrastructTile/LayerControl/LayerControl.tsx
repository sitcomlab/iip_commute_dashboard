// from https://github.com/Roschl/react-leaflet-custom-layer-control-ts/tree/main/src

import React, { ReactElement, useState } from 'react';
import { IconButton, Paper, Typography } from '@mui/material';
import { useMapEvents } from 'react-leaflet';
import { Layer, Util } from 'leaflet';
import Accordion from '@mui/material/Accordion';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LayersIcon from '@mui/icons-material/Layers';
import { createStyles } from '@mui/material/styles';
import lodashGroupBy from 'lodash.groupby';
import { LayersControlProvider } from './layerControlContext';

import { styled as mui_styled } from '@mui/system';

import createControlledLayer from './controlledLayer';
import styled from 'styled-components';

const IconLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  > svg {
    width: 3rem;
  }

  :hover {
    background-color: rgba(181, 181, 181, 0.35);
  }
`;

const useStyles = mui_styled((theme: Theme) =>
  createStyles({
    panelSummary: {
      flexDirection: 'row-reverse',
      paddingLeft: '0px',
      height: '20px',
    },
    heading: {
      fontWeight: theme.typography.fontWeightBold,
    },
    innerMenuItem: {
      paddingLeft: '32px',
    },
    expanded: {
      padding: '0px',
    },
    accordionRoot: {},
  })
);

const POSITION_CLASSES: { [key: string]: string } = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
};

interface IProps {
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

function LayerControl({ position, children }: IProps) {
  const [collapsed, setCollapsed] = useState(true);
  const [layers, setLayers] = useState<ILayerObj[]>([]);
  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
  const classes = useStyles({});

  const map = useMapEvents({
    layerremove: () => {
      //console.log('layer removed');
    },
    layeradd: () => {
      //console.log('layer add');
    },
    overlayadd: () => {
      //console.log(layers);
    },
  });

  const onLayerClick = (layerObj: ILayerObj) => {
    if (map?.hasLayer(layerObj.layer)) {
      map.removeLayer(layerObj.layer);
      setLayers(
        layers.map((layer) => {
          if (layer.id === layerObj.id)
            {return {
              ...layer,
              checked: false,
            };}
          return layer;
        })
      );
    } else {
      map.addLayer(layerObj.layer);
      setLayers(
        layers.map((layer) => {
          if (layer.id === layerObj.id)
            {return {
              ...layer,
              checked: true,
            };}
          return layer;
        })
      );
    }
  };

  const onGroupAdd = (
    layer: Layer,
    name: string,
    group: string,
    icon: JSX.Element
  ) => {
    const cLayers = layers;
    cLayers.push({
      layer,
      group,
      name,
      icon,
      checked: map?.hasLayer(layer),
      id: Util.stamp(layer),
    });
    setLayers(cLayers);
  };

  const groupedLayers = lodashGroupBy(layers, 'group');

  return (
    <LayersControlProvider
      value={{
        layers,
        addGroup: onGroupAdd,
      }}
    >
      <div className={positionClass}>
        <div className="leaflet-control leaflet-bar">
          {
            <Paper
              onMouseEnter={() => setCollapsed(false)}
              onMouseLeave={() => setCollapsed(true)}
            >
              {collapsed && (
                <IconButton>
                  <LayersIcon fontSize="default" />
                </IconButton>
              )}
              {!collapsed &&
                Object.keys(groupedLayers).map((section, index) => (
                  <Accordion
                    key={`${section} ${index}`}
                    //classes={{ root: classes.accordionRoot }}
                  >
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      className={classes.panelSummary}
                      expandIcon={<ExpandMoreIcon />}
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        {section}
                      </Typography>
                    </AccordionSummary>
                    {groupedLayers[section]?.map((layerObj, index) => (
                      <AccordionDetails key={`accDetails_${index}`}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={layerObj.checked}
                              color="primary"
                              name="checkedB"
                              onChange={() => onLayerClick(layerObj)}
                            />
                          }
                          // label={layerObj.name}
                          label={
                            <IconLabel>
                              {layerObj.icon}
                              {/* {console.log('icon', layerObj.icon)} */}
                              {layerObj.name}
                            </IconLabel>
                          }
                        />
                      </AccordionDetails>
                    ))}
                  </Accordion>
                ))}
            </Paper>
          }
        </div>
        {children}
      </div>
    </LayersControlProvider>
  );
}

const GroupedLayer = createControlledLayer(
  (layersControl, layer, name, group) => {
    layersControl.addGroup(layer, name, group);
  }
);

export default LayerControl;
export { GroupedLayer };
