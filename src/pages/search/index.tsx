import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import Card from '@components/card';
import Filters from '@components/filters';
import FiltersModal from '@components/filters/modal';
import { requestBooks } from '@services/books';
import { useFilters } from '@services/filters';
import { BookEntity } from 'types/books';
import Loading from '@components/loading';

export const Search = () => {
  const history = useHistory();
  const [books, setBooks] = useState<BookEntity[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const targetObserverRef = useRef<HTMLSpanElement>(null);
  const { selectedFilters, allFilters } = useFilters(history.location.search);
  const searchTerm = queryString.parse(history.location.search).q as string || '';
  const hasSelectedFilters = !!Object.keys(selectedFilters).length;

  const fetch = async (refetch?: boolean) => {
    if(loading) return

    setLoading(true);
    const { result, error } = await requestBooks(searchTerm, { maxResults: 40, startIndex: books.length }, selectedFilters)

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
  }, [history.location.search])

  useEffect(() => {
    const targetObserver = targetObserverRef.current;
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      const fullContentSize = document.getElementById('root')?.offsetHeight;
      const fullSizePage = fullContentSize && fullContentSize === document.body.offsetHeight
      if (entry?.isIntersecting && fullSizePage) {
        fetch(true);
      }
    });

    targetObserver && intersectionObserver.observe(targetObserver);
    return () => { targetObserver && intersectionObserver.unobserve(targetObserver) };
  })

  const cleanFilters = () => {
    history.push(`${history.location.pathname}?${queryString.stringify({ q: searchTerm })}`);
  }

  if (error) return (
    <Error>
      <p>
        Failed to load resources
      </p>
    </Error>
  );

  return (
    <>
    { loading && <Loading />}
    <PageWrapper>
      <FiltersWrapper>
        <h2>Filtros</h2>
        <Filters filters={allFilters} cleanFilters={cleanFilters} />
      </FiltersWrapper>
      <ListWrapper>
        <StyledButton primary onClick={() => setVisible(true)}>
          <img src='/public/assets/stroke.png' />
          FILTRAR
        </StyledButton>
        { hasSelectedFilters && (
          <StyledButton onClick={cleanFilters}>
            LIMPAR FILTRO
          </StyledButton>
        )}
        <h2>Resultados para "{ searchTerm }"</h2>
        <StyledList>
          {books.map((card, index) => (
            <StyledItem key={index}>
              <Card card={card} />
            </StyledItem>
          ))}
        </StyledList>
      </ListWrapper>
      </PageWrapper>
      <span ref={targetObserverRef} style={{ width: '100%' }} />
      <FiltersModal filters={allFilters} visible={visible} onClose={() => setVisible(false)} />
    </>
  );
};

const PageWrapper = styled.div`
  display: flex;
  max-width: 950px;
  margin: 50px auto;
  padding: 0 50px;

  @media (max-width: 769px) {
    padding: 0 70px;
  }

  @media (max-width: 541px) {
    padding: 0 30px;
  }
`;

const FiltersWrapper = styled.div.attrs({ className: 'FiltersWrapper' })`
  display: flex;
  flex-direction: column;
  flex-basis: 25%;
  padding-right: 50px;

  @media (max-width: 769px) {
    width: fit-content;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 30px;
    grid-row-gap: 30px;
    flex-basis: 30%;
    padding-right: 25px;
  }

  @media (max-width: 541px) {
    display: none;
  }
`;

const ListWrapper = styled.div.attrs({ className: 'ListWrapper' })`
  display: flex;
  flex-direction: column;
  flex-basis: 75%;

  @media (max-width: 541px) {
    flex-basis: 100%;
    align-items: center;
  }
`;

const StyledList = styled.ul.attrs({ className: 'StyledList' })`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;

  @media (max-width: 769px) {
    width: fit-content;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 30px;
    grid-row-gap: 30px;
  }
`;

const StyledItem = styled.li.attrs({ className: 'StyledItem' })`
  @media (max-width: 769px) {
    width: fit-content;
  }
`

const StyledButton = styled.button<{ primary?: boolean }>`
  display: none;

  @media (max-width: 541px) {
    height: 60px;
    width: 100%;
    background: ${({ primary }) => primary ? '#8553F4' : '#ADB7BF'};
    border: 1px solid rgba(64, 106, 118, 0.2);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;

    color: #F1F7FC;
    font-weight: bold;
    opacity: 0.6;

    & > span {
      margin-left: 30px;
    }
    & > img {
      padding-right: 15px;
    }
  }
`;

const Error = styled.div.attrs({ className: 'Error' })`
  width: 100%;
  height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
  
  & > p {
    font-size: 26px;
    font-weight: bold;
  }
`;

export default Search;
