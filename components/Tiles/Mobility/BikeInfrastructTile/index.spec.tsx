import '@testing-library/jest-dom';
import {describe, expect, test} from '@jest/globals';
import {render} from '@testing-library/react';
import React from 'react';
import BikeInfrastructTile from '.';

describe('Bike infrastructure tile', () => {
    it('should render without crashing', () => {
        render(<BikeInfrastructTile city="muenster" />)
    })
})