import React from 'react';
import styled from 'styled-components';
import { BookEntity } from 'types';

export interface BookCardProps {
  card: BookEntity
}

export const Card = ({ card }: BookCardProps): JSX.Element => {
  const imageSrc = card.volumeInfo.imageLinks?.thumbnail || '/public/assets/sem-capa.png';

  return (
    <div>
      <CardImage src={imageSrc} alt={card.volumeInfo.title} />
    </div>
  );
};

const CardImage = styled.img`
  width: 170px;
  height: 255px;
`;

export default Card;
