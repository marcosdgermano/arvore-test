import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import Card from '@components/card';
import Filters from '@components/filters';
import { requestBooks } from '@services/books';
import { useFilters } from '@services/filters';
import { BookEntity } from 'types/books';

export const Search = () => {
  const history = useHistory();
  const [books, setBooks] = useState<BookEntity[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const targetObserverRef = useRef<HTMLSpanElement>(null);
  const { selectedFilters, allFilters } = useFilters(history.location.search);
  const searchTerm = queryString.parse(history.location.search).q as string || '';
  
  const fetch = async (refetch?: boolean) => {
    if(loading) return

    setLoading(true);
    const { result, error } = await requestBooks(searchTerm, { maxResults: 20, startIndex: books.length }, selectedFilters)

    if (error) {
      setError(error);
    } else if (books.length && refetch) {
      const updatedBooks = books.concat(result);
      setBooks(updatedBooks);
    } else {
      setBooks(result);
    }

    setLoading(false);
  }


  useEffect(() => {
    fetch();
  }, [searchTerm])

  useEffect(() => {
    const targetObserver = targetObserverRef.current;
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        fetch(true);
      }
    });

    targetObserver && intersectionObserver.observe(targetObserver);
    return () => { targetObserver && intersectionObserver.unobserve(targetObserver) };
  })

  if (loading && !books.length) return <div>loading</div>;

  if (error) return <div>error</div>;

  return (
    <>
    <PageWrapper>
      <FiltersWrapper>
        <h2>Filtros</h2>
        <Filters filters={allFilters} />
      </FiltersWrapper>
      <ListWrapper>
        <h2>Resultados para "{ searchTerm }"</h2>
        <StyledList>
          {books.map((card, index) => (
            <StyledItem key={index}>
              <Card card={card} isGridStyled />
            </StyledItem>
          ))}
        </StyledList>
        { loading && <div>loading</div> }
      </ListWrapper>
    </PageWrapper>
      <span ref={targetObserverRef} style={{ width: '100%' }} />
      </>
  );
};

const PageWrapper = styled.div`
  display: flex;
  width: 950px;
  margin: 50px auto;
`;

const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 25%;
  padding-right: 50px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 75%;
`;

const StyledList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const StyledItem = styled.li`
  flex: 1 0 20%;
  padding-bottom: 20px;
// `

export default Search;
