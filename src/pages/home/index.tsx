import styled from 'styled-components';
import Carousel from '@components/carousel';

export const Home = () => {
  return (
    <PageWrapper>
      <Carousel searchTerm='aventura' />
      <Carousel searchTerm='destaques' isHighlighted />
      <Carousel searchTerm='ação' />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  margin: 50px auto;
`;

export default Home;
