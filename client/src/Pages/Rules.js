import React from "react";
import VoulmeIcons from "../VoulmeIcons";
import rulesImg from "../images/rules.png";
import Footer from "../Footer";
import styled from "styled-components";

const Rules = ({ setPage }) => {
  return (
    <Container>
      <VoulmeIcons />
      <Img src={rulesImg} alt="join game img" />
      <Content>
        <Line>- The goal: to reach the opponent's flag.</Line>

        <Line>
          - At the beginning of the game, you will be asked to choose a flag and
          a trap:
        </Line>
        <Line>
          {" "}
          - The flag - as soon as the opponent reached it - you lost.{" "}
        </Line>
        <Line>
          - The Trap - As soon as the opponent lands in the trap, his soldier
          will die.{" "}
        </Line>
        <Line>
          {" "}
          - Then, you will get your soldiers arranged in random order.{" "}
        </Line>
        <Soldiers>
          <Soldier>
            <SoldierText>Charmander</SoldierText>
            <SoldierImg src={require("../images/cha.png").default} />
            <SoldierText>Fire Pokemon</SoldierText>
          </Soldier>
          <Soldier>
            <SoldierText>Squirtle</SoldierText>
            <SoldierImg src={require("../images/squi.png").default} />
            <SoldierText>Water Pokemon</SoldierText>
          </Soldier>
          <Soldier>
            <SoldierText>Bulbasaur</SoldierText>
            <SoldierImg src={require("../images/balb.png").default} />
            <SoldierText>Grass Pokemon</SoldierText>
          </Soldier>
        </Soldiers>
        <Line>
          The rules: Fire wins Grass, Grass wins Water and Water wins Fire.{" "}
        </Line>
        <Line>
          - Your opponent does not see your flag, trap and soldiers. Only after
          a certain soldier fought and won the battle, that soldier was exposed
          and now the opponent does see him.
        </Line>
      </Content>
      <Button onClick={() => setPage("Lobby")}>Back To Lobby</Button>

      <Footer />
    </Container>
  );
};

export default Rules;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100vh;
  background-color: #f6f6f6;
`;

const Img = styled.img`
  width: 100%;
  flex: 0 0 32%;
`;

const Content = styled.p`
  flex: 0 0 45%;
  max-height: 45%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  font-size: 1.2rem;
  padding: 0.5rem;
  /* text-align: center; */
`;

const Line = styled.p``;

const Soldiers = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
`;

const Soldier = styled.div`
  display: flex;
  flex-direction: column;
  width: 33.333333%;
  align-items: center;
  justify-content: center;
`;
const SoldierText = styled.h2`
  font-size: 1rem;
`;

const SoldierImg = styled.img`
  width: 5rem;
  height: 5rem;
`;

const Button = styled.button`
  border: none;
  background-color: #a5ce21;
  align-self: auto;
  font-size: 2.7rem;
  font-family: inherit;
  text-transform: uppercase;
  padding: 1rem 2rem;
  flex: 0 0 7%;
  &:focus {
    outline: none;
  }
`;
