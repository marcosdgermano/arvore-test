import React from 'react';
import styled from 'styled-components';
import { BookEntity } from 'types/books';

export interface BookCardProps {
  card: BookEntity,
  isGridStyled?: boolean
}

export const Card = ({ card, isGridStyled }: BookCardProps): JSX.Element => {
  const imageSrc = card.volumeInfo.imageLinks?.thumbnail || '/public/assets/sem-capa.png';

  return (
    <div>
      <CardImage isGridStyled={isGridStyled} src={imageSrc} alt={card.volumeInfo.title} />
    </div>
  );
};

const CardImage = styled.img<{ isGridStyled?: boolean }>`
  ${({ isGridStyled }) => 
    isGridStyled ? 'width: 113px; height: 170px;' : 'width: 170px; height: 255px;'}
`;

export default Card;
