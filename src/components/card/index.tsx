import React from 'react';
import styled from 'styled-components';
import { BookEntity } from 'types/books';
import { getImgLink } from '@utils/helpers';

export interface BookCardProps {
  card: BookEntity,
  isGridStyled?: boolean
}

export const Card = ({ card, isGridStyled }: BookCardProps): JSX.Element => {
  const imageSrc = getImgLink(card);

  return (
      <CardImage isGridStyled={isGridStyled} src={imageSrc} alt={card.volumeInfo.title} />
  );
};

const CardImage = styled.img<{ isGridStyled?: boolean }>`
  /* aspect-ratio: 1 / 1.5; */
  width: 113px; height: 170px;

  @media (max-width: 769px) and (min-width: 542px) {
    width: 146px; height: 221px;
  }

  @media (max-width: 541px) {
    width: 57px; height: 85px;
  }
`;

export default Card;
