import React from 'react';
import styled from 'styled-components';

export enum Status {
    good,
    warning,
    bad,
    dummy,
}
  
export enum Size {
    big,
    normal,
}

interface PopupDataProps {
    value: number;
    header?: string;
    size: Size;
    status?: Status;
    unit?: string;
    decimals?: number;
    hover?: string;
    hoverID?: string;
}

interface TileStyleProps {
    status?: Status;
    size?: Size;
}

const DataContainer = styled.div<TileStyleProps>`
    background-color: ${(props) => {
        switch (props.status) {
          case Status.good:
            return 'var(--scms-green)';
          case Status.warning:
            return 'var(--scms-yellow)';
          case Status.bad:
            return 'var(--scms-red)';
          case Status.dummy:
            return 'lightgrey';
          default:
            return 'var(--scms-primary-blue)';
        }
    }};
    width: ${(props) => {
        switch (props.size) {
          case Size.big:
            return '9.5rem';
          case Size.normal:
            return '7.2rem';
        }
    }};
    height: ${(props) => {
      switch (props.size) {
        case Size.big:
          return '9.5rem';
        case Size.normal:
          return '7.2rem';
      }
    }};

    margin-top: 0rem;
    padding-top: 0rem;
    margin: 0.5rem;
    padding: 0.5rem;
    text-align: center;
    border-radius: 1rem;


    box-shadow: var(--scms-box-shadow);
    color: white;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    aligh-items: center;
    justify-content: center;
`;

const TopText = styled.p<TileStyleProps>`
  font-weight: var(--scms-semi-bold);
  position: relative;
  top: ${(props) => {
    switch (props.size) {
      case Size.big:
        return '35%';
      case Size.normal:
        return '50%';
    }
  }};
`;

const Value = styled.p<TileStyleProps>`
  font-weight: var(--scms-semi-bold);
  position: relative;
  top: ${(props) => {
    switch (props.size) {
      case Size.big:
        return '0%';
      case Size.normal:
        return '2%';
    }
  }};
`;

const UnitText = styled.p<TileStyleProps>`
  font-weight: var(--scms-semi-bold);
  position: relative;
  top: ${(props) => {
    switch (props.size) {
      case Size.big:
        return '-45%';
      case Size.normal:
        return '-45%';
    }
  }};
`;



function PopupData(props: PopupDataProps) {
  //round to the specified decimals
  const valueRound = Math.round(props.value*(10**props.decimals)) / (10**props.decimals)

  return (
    <DataContainer
        data-tip={props.hover}
        size={props.size}
        status={props.status}
    >
        {props.size === Size.normal && (
            <>
            <TopText className="is-size-7" size={props.size}>
                {props.header}
            </TopText>
            <Value className="is-size-4" size={props.size}>
                {valueRound}
            </Value>
            <UnitText className="is-size-7" size={props.size}>
                 {props.unit}
            </UnitText>
            </>
        )}
        {props.size === Size.big && (
            <>
            <TopText className="is-size-6" size={props.size}>
                {props.header}
            </TopText>
            <Value className="is-size-2" size={props.size}>
                {valueRound}
            </Value>
            <UnitText className="is-size-7" size={props.size}>
                 {props.unit}
            </UnitText>
            </>
        )}
    </DataContainer>
    )
}

export default PopupData