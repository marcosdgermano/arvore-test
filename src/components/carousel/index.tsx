import React, { useRef } from 'react';
import styled from 'styled-components';
import Card from '@components/card';
import { capitalizeFirstLetter } from '../../helpers';
import { useBooksList } from '../../services/books';

export interface CarouselProps {
  searchTerm: string,
  isHighlighted?: boolean
}

export const Carousel = ({ searchTerm, isHighlighted = false }: CarouselProps): JSX.Element => {
  const { result, loading, error } = useBooksList(searchTerm);
  const carouselRef = useRef<HTMLUListElement>(null);

  if (loading) return <div>loading</div>;

  if (error) return <div>error</div>;

  function move(side: -1 | 1) {
    const shelf = carouselRef.current;
    if (!shelf) return;

    const itemSize = shelf.offsetWidth;
    const left = (itemSize * 0.88) * side;
    shelf.scrollBy({ left, behavior: 'smooth' });
  }

  return (
    <Row isHighlighted={isHighlighted}>
      <SectionWrapper>
        <Title isHighlighted={isHighlighted}>{capitalizeFirstLetter(searchTerm)}</Title>

        <CarouselWrapper>
          <StyledButton onClick={() => move(-1)}>
            <img src="/public/assets/arrow-button.png"/>
          </StyledButton>
          <CardsWrapper key={searchTerm} ref={carouselRef}>
            { result.map(card => (
              <ListItem key={card.id}>
                <Card card={card} />
              </ListItem>
            )) }
          </CardsWrapper>
          <StyledButton onClick={() => move(1)}>
            <img style={{ transform: 'scaleX(-1)' }} src="/public/assets/arrow-button.png"/>
          </StyledButton>
        </CarouselWrapper>
      </SectionWrapper>
    </Row>
  );
};

type StyleProps = {
  isHighlighted: boolean
}

const Title = styled.h2<StyleProps>`
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 30px;

  ${({ isHighlighted }) => isHighlighted && 'color: #A977D8; font-size: 1.5em;'}
`

const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CardsWrapper = styled.ul`
  display: flex;
  overflow-x: hidden;
`;

const ListItem = styled.li`
  flex: 1 0 22%;
`

const StyledButton = styled.button`
  margin: 0 -20px;
  z-index: 1;
  height: fit-content;
  transform: scaleX(-1);
`;

const Row = styled.div<StyleProps>`
  margin-top: 45px;
  ${({ isHighlighted }) => isHighlighted && 'background-color: #DAF6F3;  padding: 35px 0;'}
`

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 950px;
`;

export default Carousel;
