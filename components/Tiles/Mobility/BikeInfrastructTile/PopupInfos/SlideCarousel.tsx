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

import './carousel_edited.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';

interface ISliderCarouselProps {
  contentParkingunits: JSX.Element;
  contentCapacity: JSX.Element;
  contentWeather: JSX.Element;
  contentTypes: JSX.Element;
}

const SliderPage = styled.div`
  height: 100%;
  padding: 0rem;
  margin: 0rem;
  border: 0rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

function SliderCarousel(props: ISliderCarouselProps) {
  return (
    <Carousel
      autoPlay={false}
      infiniteLoop={false}
      showArrows={true}
      showIndicators={false}
      showStatus={false}
      showThumbs={false}
    >
      <SliderPage>{props.contentParkingunits}</SliderPage>
      <div>{props.contentCapacity}</div>
      <div>{props.contentWeather}</div>
      <div>{props.contentTypes}</div>
    </Carousel>
  );
}

export default SliderCarousel;
