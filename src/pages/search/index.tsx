import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Card from '@components/card';
import Filters from '@components/filters';
import { useBooksList } from '@services/books';
import { useFilters } from '@services/filters';

export const Search = () => {
  const history = useHistory();
  const { selectedFilters, allFilters } = useFilters(history.location.search);
  const { result, loading, error } = useBooksList('menino', { maxResults: 40 }, selectedFilters);

  if (loading) return <div>loading</div>;

  if (error || !result) return <div>error</div>;

  return (
    <PageWrapper>
      <FiltersWrapper>
        <h2>Filtros</h2>
        <Filters filters={allFilters} />
      </FiltersWrapper>
      <ListWrapper>
        <h2>Resultados para "menino"</h2>
        <StyledList>
          {result.map(card => (
            <StyledItem key={card.id}>
              <Card card={card} isGridStyled />
            </StyledItem>
          ))}
        </StyledList>
      </ListWrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  width: 950px;
  margin: 50px auto 0;
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
