import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Checkbox from '@components/checkbox';
import { FilterObject } from "types/filters";
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

export interface FiltersProps {
  filters: FilterObject[],
  visible: boolean,
  onClose: () => void
}

const FiltersModal = ({ filters, visible, onClose }: FiltersProps): JSX.Element => {
  const history = useHistory();
  const [selectedFilters, setSelectedFilters] = useState<{ [index: string]: string }>({});

  useEffect(() => {
    if (visible) { 
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;

      const { q, ...filters } = queryString.parse(history.location.search) as { [index: string]: string };
      setSelectedFilters(filters)
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [visible])

  const onSelect = (filter: FilterObject, value: string) => {
    const alreadySelected = selectedFilters[filter.name];
    let updatedSelectedFilters = { ...selectedFilters };
    
    if (alreadySelected && alreadySelected === value) {
      delete updatedSelectedFilters[filter.name]
    } else {
      updatedSelectedFilters[filter.name] = value
    }

    setSelectedFilters(updatedSelectedFilters);
  }

  const submitFilter = () => {
    const qs = queryString.parse(history.location.search);
    const query = queryString.stringify({ q: qs.q, ...selectedFilters });

    history.push(`${history.location.pathname}?${query}`)
    onClose();
  }

  return (
    <ModalWrapper visible={visible}>
      <ContentWrapper>
        <Head>
          <Title>Filtrar</Title>
          <CloseButton onClick={onClose}>x</CloseButton>
        </Head>
        {filters.map((filter, index) => (
          <FilterWrapper key={index}>
            <Label>{ filter.display }</Label>
            { filter.values.map((value, i) => <Checkbox key={i} value={value} checked={selectedFilters[filter.name] === value} onSelect={() => onSelect(filter, value)} />) }
          </FilterWrapper>
        ))}
      </ContentWrapper>
      <StyledButton primary onClick={submitFilter}>
        <img src='/public/assets/stroke.png' />
        FILTRAR AGORA
      </StyledButton>
      <StyledFooter>
        <span>Copyright © 2021 Árvore.</span> <span>Todos os direitos reservados.</span>
      </StyledFooter>
    </ModalWrapper>
  )
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const CloseButton = styled.button`
  font-weight: bold;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.span`
  color: #9EAEB7;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ContentWrapper = styled.div`
  padding: 30px;
`;

const ModalWrapper = styled.div.attrs({ className: 'ModalWrapper' })<{ visible: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 121;
  width: 100%;
  height: 100%;
  background-color: #FFF;
  box-sizing: border-box;
  transition: margin .15s ease-in, opacity .15s ease-in .1s;

  ${({ visible }) => visible && css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: opacity .3s ease-out,margin .15s ease-in;
  `}
`;

const StyledFooter = styled.div`
  font-size: 12.8px;
  color: #B2B4B9;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  border-top: 0.5px solid #D9D9D9;
`;

const StyledButton = styled.button<{ primary?: boolean }>`
  display: none;

  @media (max-width: 541px) {
    height: 60px;
    width: 80%;
    background: ${({ primary }) => primary ? '#8553F4' : '#ADB7BF'};
    border: 1px solid rgba(64, 106, 118, 0.2);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 20px;

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

export default FiltersModal
