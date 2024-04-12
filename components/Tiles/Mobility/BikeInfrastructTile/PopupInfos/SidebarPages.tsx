/**
 * Smart City Münster Dashboard
 * Copyright (C) 2022 Reedu GmbH & Co. KG
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { useState } from 'react';
import {
  ContentWrapper,
  FooterButton,
  FooterWrapper,
  HeadingWrapper,
  HighlightedFooterButton,
  IconWrapper,
} from '../styles';
import styled from 'styled-components';

import { SvgCyclingPathIcon as CyclingPathIcon } from '@/components/Icons/CyclingPathIcon';
import { SvgShopIcon as ShopIcon } from '@/components/Icons/ShopIcon';
import { SvgParkingIcon as ParkingIcon } from '@/components/Icons/ParkingIcon';

interface IPopupPagesProps {
  name: string;
  contentParking?: JSX.Element;
  contentCycling?: JSX.Element;
  contentService?: JSX.Element;
  contentPublicTransport?: JSX.Element;
}

interface IFooterProps {
  currentPage: OpenPage;
  setCurrentPage: Function;
}

enum OpenPage {
  Parking,
  Cycling,
  Service,
  PublicTransport,
}

export const SidebarWrapper = styled.div`
  max-width: 420px;
  height: 100%;
  margin: 0 auto;
  padding: 1rem;
  padding-top: 4rem;
  padding-bottom: 2rem;
  border: 0rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

function Footer(props: IFooterProps) {
  return (
    <FooterWrapper>
      {props.currentPage == OpenPage.Parking ?
        ( 
          <HighlightedFooterButton bold={true}>
            Parken
          </HighlightedFooterButton>
        ) : (
          <FooterButton
            onClick={() => {
              props.setCurrentPage(OpenPage.Parking)
            }}
          >
            Parken
          </FooterButton>
        )
      }

      {props.currentPage == OpenPage.Cycling ?
        ( 
          <HighlightedFooterButton bold={true}>
            Fahrradstraßen 2.0
          </HighlightedFooterButton>
        ) : (
          <FooterButton
            onClick={() => {
              props.setCurrentPage(OpenPage.Cycling)
            }}
          >
            Fahrradstraßen 2.0
          </FooterButton>
        )
      }

      {props.currentPage == OpenPage.Service ?
        ( 
          <HighlightedFooterButton bold={true}>
            Service
          </HighlightedFooterButton>
        ) : (
          <FooterButton
            onClick={() => {
              props.setCurrentPage(OpenPage.Service)
            }}
          >
            Service
          </FooterButton>
        )
      }

      {props.currentPage == OpenPage.PublicTransport ?
        ( 
          <HighlightedFooterButton bold={true}>
            Öffis
          </HighlightedFooterButton>
        ) : (
          <FooterButton
            onClick={() => {
              props.setCurrentPage(OpenPage.PublicTransport)
            }}
          >
            Öffis
          </FooterButton>
        )
      }
    </FooterWrapper>
  )
}

function SidebarPages(props: IPopupPagesProps) {
  const [currentPage, setCurrentPage] = useState(OpenPage.Service)

  return (
    <>
      {currentPage == OpenPage.Parking && (
        <SidebarWrapper>
          <HeadingWrapper>
            <IconWrapper>
              <ParkingIcon />
            </IconWrapper>
            <p className="is-size-4 has-text-weight-semibold">
              Stellplätze <br />
              <span className="is-size-4 has-text-weight-normal">
                in {props.name}
              </span>
            </p>
          </HeadingWrapper>
          <ContentWrapper>{props.contentParking}</ContentWrapper>
          <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </SidebarWrapper>
      )}
      {currentPage == OpenPage.Cycling && (
        <SidebarWrapper>
          <HeadingWrapper>
            <IconWrapper>
              <CyclingPathIcon />
            </IconWrapper>
            <p className="is-size-4 has-text-weight-semibold">
              Fahrradstraßen 2.0 <br />
              <span className="is-size-4 has-text-weight-normal">
                in {props.name}
              </span>
            </p>
          </HeadingWrapper>
          <ContentWrapper>{props.contentCycling}</ContentWrapper>
          <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </SidebarWrapper>
      )}
      {currentPage == OpenPage.Service && (
        <SidebarWrapper>
          <HeadingWrapper>
            <IconWrapper>
              <ShopIcon />
            </IconWrapper>
            {
              <p className="is-size-4 has-text-weight-semibold">
                Fahrradläden <br />
                <span className="is-size-4 has-text-weight-normal">
                  in {props.name}
                </span>
              </p>
            }
          </HeadingWrapper>
          <ContentWrapper>{props.contentService}</ContentWrapper>
          <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </SidebarWrapper>
      )}
      {currentPage == OpenPage.PublicTransport && (
        <SidebarWrapper>
          <HeadingWrapper>
            {
              <p className="is-size-4 has-text-weight-semibold">
                Öffentliche Verkehrsmittel <br />
                <span className="is-size-4 has-text-weight-normal">
                  in {props.name}
                </span>
              </p>
            }
          </HeadingWrapper>
          <ContentWrapper>{props.contentPublicTransport}</ContentWrapper>
          <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </SidebarWrapper>
      )}
    </>
  );
}

export default SidebarPages;
