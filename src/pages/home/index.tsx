import React from 'react';
import Carousel from '@components/carousel';

export const Home = () => {
  return (
    <>
      <div>Home</div>
      <Carousel searchTerm='aventura' />
      <Carousel searchTerm='destaques' isHighlighted />
      <Carousel searchTerm='ação' />
    </>
  );
};

export default Home;
