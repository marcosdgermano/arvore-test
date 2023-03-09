import styled from 'styled-components';
import { BookEntity } from 'types/books';
import { getImgLink } from '@utils/helpers';

export interface BookCardProps {
  card: BookEntity,
}

export const Card = ({ card }: BookCardProps): JSX.Element => {
  const imageSrc = getImgLink(card);

  return (
    <>
      <CardImage src={imageSrc} alt={card.volumeInfo.title} />
      <Title>{ card.volumeInfo.title }</Title>
      <Author>{ card.volumeInfo.authors?.[0] }</Author>
    </>
  );
};

const CardImage = styled.img`
  width: 113px; height: 170px;

  @media (max-width: 769px) {
    width: 146px; height: 221px;
  }
`;

const Title = styled.p`
  font-size: 12px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const Author = styled.p`
  font-weight: 400;
  font-size: 10px;
  color: #999999;
`;

export default Card;
