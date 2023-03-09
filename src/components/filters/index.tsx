import styled from "styled-components";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import Checkbox from '@components/checkbox';
import { FilterObject } from "types/filters";

export interface FiltersProps {
  filters: FilterObject[],
  cleanFilters: () => void
}

const Filters = ({ filters, cleanFilters }: FiltersProps): JSX.Element => {
  const history = useHistory();
  const hasSelectedFilters = filters.some(filter => filter.selectedValue);

  const getLink = (name: string, value: string) => {
    const qs = queryString.parse(history.location.search, { arrayFormat: 'separator' })

    if (qs[name] === value) {
      delete qs[name];
    } else {
      qs[name] = value;
    }

    return '/search?' + queryString.stringify(qs, { arrayFormat: 'separator' });
  };

  return (
    <>
      {hasSelectedFilters && <CleanButton onClick={cleanFilters}>LIMPAR FILTROS<span>X</span></CleanButton>}
      {filters.map((filter, index) => (
        <FilterWrapper key={index}>
          <Label>{ filter.display }</Label>
          { filter.values.map((value, i) => <Checkbox key={i} checked={value === filter.selectedValue} value={value} link={getLink(filter.name, value)} />) }
        </FilterWrapper>
      ))}
    </>
  )
}

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

const CleanButton = styled.a.attrs({ className: 'CleanButton' })`
  height: 47px;
  background: #ADB7BF;
  border: 1px solid rgba(64, 106, 118, 0.2);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  color: #F1F7FC;
  font-weight: bold;
  opacity: 0.6;

  & > span {
    margin-left: 30px;
  }
`;

export default Filters