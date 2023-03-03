import React from 'react';
import { useBooksList } from '../../services/books';

export const Home = () => {
  const { result, loading, error } = useBooksList('aventura');
  console.log('result >>>>>', result)

  if (loading) return <div>loading</div>;

  if (error) return <div>error</div>;

  return <div>Home{result.length}</div>;
};

export default Home;
