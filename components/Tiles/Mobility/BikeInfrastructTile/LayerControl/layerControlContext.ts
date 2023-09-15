// from https://github.com/Roschl/react-leaflet-custom-layer-control-ts/tree/main/src

import { createContext, useContext } from 'react';

export const LayersControlContext = createContext<any>([[], () => {}]);

export const LayersControlProvider = LayersControlContext.Provider;

// tslint:disable
export function useLayerControlContext() {
  var context = useContext(LayersControlContext);

  if (context == null) {
    throw new Error(
      'No context provided: useLayerControlContext() can only be used in a descendant of <LayerControl>'
    );
  }

  return context;
}
// tslint:enable
