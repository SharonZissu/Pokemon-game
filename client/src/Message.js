import React from "react";
import styled from "styled-components";

const Message = ({ text, color, playerColor, playerName }) => {
  return (
    <Container position={playerColor === color}>
      <Text>
        {playerColor !== color && <Name type="opponent">{playerName}</Name>}

        <Mes color={color}>{text}</Mes>

        {playerColor === color && <Name type="me">{playerName}</Name>}
      </Text>
    </Container>
  );
};

export default Message;

const Container = styled.div`
  display: flex;
  justify-content: ${({ position }) => (position ? "flex-start" : "flex-end")};
  padding: 0 0.5rem;
  width: 100%;
  margin-bottom: 0.4rem;
  /* background-color: ${({ position }) =>
    position ? "#a5ce21" : "#c6de83"}; */
`;

const Text = styled.div`
  display: flex;
  align-items: center;
`;

const Mes = styled.p`
  color: ${({ color }) => color};
  font-size: 1.5rem;
  background-color: #c6de83;
  padding: 0.4rem 1rem;
  border-radius: 1rem;
`;

const Name = styled.p`
  font-size: 1.5rem;
  margin-right: ${({ type }) => (type === "opponent" ? "0.5rem" : "0")};
  margin-left: ${({ type }) => (type === "me" ? "0.5rem" : "0")};
`;
