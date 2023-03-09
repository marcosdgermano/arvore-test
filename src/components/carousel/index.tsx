import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { capitalizeFirstLetter, getImgLink } from '@utils/helpers';
import { requestBooks } from '@services/books';
import { BookEntity } from 'types/books';
import Loading from '@components/loading';

export interface CarouselProps {
  searchTerm: string,
  isHighlighted?: boolean
}

export const Carousel = ({ searchTerm, isHighlighted = false }: CarouselProps): JSX.Element => {
  const [books, setBooks] = useState<BookEntity[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const carouselRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const fetch = async () => {
      if(loading) return
  
      setLoading(true);
      const { result, error } = await requestBooks(searchTerm)
  
      if (error) {
        setError(error);
      } else {
        setBooks(result);
      }
  
      setLoading(false);
    }

    fetch();
  }, [searchTerm])

  if (error){
    return (
      <Error>
        <p>
        Failed to load carousel
        </p>
      </Error>
    );  
  };

  function move(side: -1 | 1) {
    const shelf = carouselRef.current;
    if (!shelf) return;

    const itemSize = shelf.offsetWidth;
    const left = (itemSize * 0.88) * side;
    shelf.scrollBy({ left, behavior: 'smooth' });
  }

  return (
    <>
      { loading && <Loading /> }
      <Row isHighlighted={isHighlighted}>
        <SectionWrapper>
          <Title isHighlighted={isHighlighted}>{capitalizeFirstLetter(searchTerm)}</Title>
          <CarouselWrapper>
            <StyledButton onClick={() => move(-1)}>
              <img src="/public/assets/arrow-button.png"/>
              </StyledButton>
              <CardsWrapper key={searchTerm} ref={carouselRef}>
                { books.map(card => (
                  <ListItem key={card.id}>
                    <BookImg src={getImgLink(card)} />
                  </ListItem>
                )) }
              </CardsWrapper>
              <StyledButton onClick={() => move(1)}>
              <img style={{ transform: 'scaleX(-1)' }} src="/public/assets/arrow-button.png"/>
            </StyledButton>
          </CarouselWrapper>
        </SectionWrapper>
      </Row>
    </>
  );
};

type StyleProps = {
  isHighlighted?: boolean
}

const BookImg = styled.img`
  width: 170px; height: 255px;

  @media (max-width: 769px) {
    width: 124px; height: 185px;
  }

  @media (max-width: 541px) {
    width: 62px; height: 92px;
  }
`;

const Title = styled.h2<StyleProps>`
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 30px;

  ${({ isHighlighted }) => isHighlighted && 'color: #A977D8; font-size: 1.5em;'}

  @media (max-width: 541px) {
    padding-left: 15px;
  }
`

const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CardsWrapper = styled.ul`
  display: flex;
  overflow-x: hidden;

  @media (max-width: 769px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ListItem = styled.li`
  flex: 1 0 22%;
  
  @media (max-width: 541px) {
    &:first-child {
      padding-left: 15px;
    }
  }
`

const StyledButton = styled.button`
  margin: 0 -20px;
  z-index: 1;
  height: fit-content;
  transform: scaleX(-1);

  @media (max-width: 769px) {
    display: none;
  }
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

  @media (max-width: 769px) {
    width: auto;
    padding: 0 55px;
  }

  @media (max-width: 541px) {
    width: auto;
    padding: 0;
  }
`;

const Error = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;

  & > p {
    font-size: 26px;
    font-weight: bold;
  }
`;

export default Carousel;
