import '@testing-library/jest-dom';
import {describe, expect, test} from '@jest/globals';
import {render} from '@testing-library/react';
import React from 'react';

import { Suspense } from 'react';

import { BicycleIcon } from '@/components/Icons'
import BikeInfrastructTile from '.';
import MobilityTile from '../MobilityTile';
import { BaseTile } from '../../Base/BaseTile';
import IconTile from '../../Base/IconTile';
import BikeInfrastructTileContent from './BikeInfrastructTileContent';

jest.mock('.')

describe('Bike infrastructure tile', () => {
    it('should render Basetile without crashing', () => {
        render(
            <BaseTile><div>{"hey"}</div></BaseTile>
        )
        return
    })
    it('should render BikeInfrastructureTileContent without crashing', () => {
        render(
            <BikeInfrastructTileContent city='muenster'></BikeInfrastructTileContent>
        )
        return
    })
    /*
    //this won't work as it seems to contain asynchronous children
    //see https://github.com/vercel/next.js/issues/47131
    it('should render Icontile without crashing', () => {
        render(
            <Suspense fallback={<div>{'loading'}</div>}>
            <IconTile
                dataSource='safdafdads'
                icon={BicycleIcon}
                variant="mobility"
            ><div></div></IconTile>
            </Suspense>
        )
        return
    })
    */

})