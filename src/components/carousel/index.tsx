import React, { useRef } from 'react';
import styled from 'styled-components';
import Card from '@components/card';
import { capitalizeFirstLetter } from '../../helpers';
import { useBooksList } from '../../services/books';

export interface CarouselProps {
  searchTerm: string
}

export const Carousel = ({ searchTerm }: CarouselProps): JSX.Element => {
  const { result, loading, error } = useBooksList(searchTerm);
  const carouselRef = useRef<HTMLDivElement>(null);

  if (loading) return <div>loading</div>;

  if (error) return <div>error</div>;

  function move(side: -1 | 1) {
    const shelf = carouselRef.current;
    if (!shelf) return;

    const itemSize = shelf.offsetWidth;
    const left = itemSize * side;
    shelf.scrollBy({ left, behavior: 'smooth' });
  }

  return (
    <SectionWrapper>
      <h2>{capitalizeFirstLetter(searchTerm)}</h2>

      <CarouselWrapper>
        <StyledButton onClick={() => move(-1)}>
          <img src="/public/assets/arrow-button.png"/>
        </StyledButton>
        <CardsWrapper key={searchTerm} ref={carouselRef}>
          { result.map(card => <Card key={card.id} card={card} />) }
        </CardsWrapper>
        <StyledButton onClick={() => move(1)}>
          <img style={{ transform: 'scaleX(-1)' }} src="/public/assets/arrow-button.png"/>
        </StyledButton>
      </CarouselWrapper>
    </SectionWrapper>
  );
};

const StyledButton = styled.button`
  all: unset;
  margin: 0 -20px;
  z-index: 1;
  height: fit-content;
  transform: scaleX(-1);
`;

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  width: 950px;
  padding: 0 75px;
`;

const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CardsWrapper = styled.div`
  display: flex;
  overflow-x: hidden;
`;

export default Carousel;
