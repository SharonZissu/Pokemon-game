import React from "react";
import styled from "styled-components";
import { checkValueAndBgBeforeStart } from "./utils";
const Cell = ({ value, index, flag, trap, chooseFlag, chooseTrap, color }) => {
  const handleClick = () => {
    if (!flag) {
      chooseFlag(index);
    } else if (!trap) {
      chooseTrap(index);
    }
  };

  const [img, bgColor] = checkValueAndBgBeforeStart(value, index, color);

  return (
    <CellContainer bgColor={bgColor} img={img} onClick={handleClick}>
      {img}
    </CellContainer>
  );
};

export default Cell;

const CellContainer = styled.button`
  width: 14.2857143%;
  height: 16.6666667%;
  border: none;
  background-color: ${({ bgColor }) => bgColor};
`;
