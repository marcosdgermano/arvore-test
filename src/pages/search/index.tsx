import React from 'react';
import styled from 'styled-components';
import Card from '@components/card';
import { useBooksList } from '@services/books';

export const Search = () => {
  const { result, loading, error } = useBooksList('menino', { maxResults: 40 }, { saleability: 'NOT_FOR_SALE' });

  if (loading) return <div>loading</div>;

  if (error) return <div>error</div>;

  return (
    <PageWrapper>
      <FiltersWrapper>
        <h2>Filtros</h2>
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
  flex-basis: 25%;
`;

const ListWrapper = styled.div`
  flex-basis: 75%;
`;

const StyledList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const StyledItem = styled.li`
  flex: 1 0 20%;
  padding-bottom: 20px;
`

export default Search;
