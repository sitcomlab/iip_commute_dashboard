import * as React from 'react'
import { Button } from '@/components/Elements/Button'
import { MapViewContext, ViewMode } from './BikeInfrastructTileContent';
import { SVGProps } from 'react'

interface ButtonProps {
    type: ViewMode,
    mapViewContext: ViewMode,
    buttonText: string,
    buttonIcon?: (_props: SVGProps<SVGSVGElement>) => JSX.Element,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

function ButtonBase({ 
    type,
    mapViewContext, 
    buttonText, 
    buttonIcon,
    onClick
}: ButtonProps,
...props: any[]
){
    const buttonVariant = (type == mapViewContext) ? 'viewButtonActive' : 'viewButton' 
    const Icon = buttonIcon || <></>
    return(
        <Button
        hover={'view'}
        onClick={onClick}
        variant={buttonVariant}
        {...props}
        >{buttonText}</Button>
    )
}

function ViewButton({ type }: ButtonProps) {
    const {mapViewState, setMapViewState} = React.useContext(MapViewContext)

    if (type == ViewMode.AdministrativeAreas) {
        return(
            <ButtonBase 
                buttonText='Stadtteile'
                mapViewContext={mapViewState}
                onClick={() => {return setMapViewState(type);}}
                type={type}
            />
        )
    }

    if (type == ViewMode.BicycleNetwork) {
        return(
            <ButtonBase 
                buttonText='Radnetz'
                mapViewContext={mapViewState}
                onClick={() => {return setMapViewState(type);}}
                type={type}
            />
        )
    }

    if (type == ViewMode.PublicTransport) {
        return(
            <ButtonBase 
                buttonText='Bus & Bahn'
                mapViewContext={mapViewState}
                onClick={() => {return setMapViewState(type);}}
                type={type}
            />
        )
    }

    //this shall not be reached
    return <></>
}

export { ButtonBase }
export default ViewButton