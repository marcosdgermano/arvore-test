import React from 'react';
import Carousel from '@components/carousel';

export const Home = () => {
  return (
    <>
      <div>Home</div>
      <Carousel searchTerm='aventura' />
      &nbsp;
      <Carousel searchTerm='destaques' />
      &nbsp;
      <Carousel searchTerm='ação' />
    </>
  );
};

export default Home;
