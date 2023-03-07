import React from "react";
import styled, { css } from "styled-components";
import { filtersDictionary } from "@utils/helpers";

export interface CheckboxProps {
  link: string,
  checked: boolean,
  value: string
} 

const Checkbox = ({link, value, checked}: CheckboxProps): JSX.Element => {
  return (
    <Link href={link}>
      <StyledCheckbox checked={checked}>
        { filtersDictionary[value] }
      </StyledCheckbox>
    </Link>
  );
}

const Link = styled.a`
  margin-bottom: 10px;
`;

const StyledCheckbox = styled.span<{checked: boolean}>`
  padding-left: 1.5rem;
  display: inline-block;
  position: relative;
  width: 100%;
  color: #053B4B;


  &::before {
    position: absolute;
    top: 2px;
    left: 2px;
    content: "";
    display: inline-block;
    width: 12px;
    height: 12px;
    padding-top: 1px;
    border: 2px solid #fff;
    box-shadow: 0 0 0 1px #867e75;
    vertical-align: middle;
    border-radius: 2px;

    ${({ checked }) => checked && css`
      color: #81dbd1;
      background-color: #81dbd1;
      border: 2px solid #fff;
      box-shadow: 0 0 0 1px #81dbd1;
    `}
  }
`;

export default Checkbox