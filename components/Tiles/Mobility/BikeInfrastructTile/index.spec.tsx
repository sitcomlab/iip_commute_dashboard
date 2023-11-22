import '@testing-library/jest-dom';
import {describe, expect, test} from '@jest/globals';
import {render} from '@testing-library/react';
import React from 'react';
import BikeInfrastructTile from '.';
import MobilityTile from '../MobilityTile';
import { BaseTile } from '../../Base/BaseTile';
import IconTile from '../../Base/IconTile';

jest.mock('.')

describe('Bike infrastructure tile', () => {
    it('should render Basetile without crashing', () => {
        render(
            <BaseTile><div>{"hey"}</div></BaseTile>
        )
        return
    })
    it('should render Icontile without crashing', () => {
        render(
            <IconTile><div>{"hey"}</div></IconTile>
        )
        return
    })
})