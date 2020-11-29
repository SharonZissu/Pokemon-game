import React from "react";
import styled, { keyframes, css } from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import Spinner from "./Spinner";
const WarDrawModal = ({
  show,
  warResult,
  attackerBeforeWar,
  defenderBeforeWar,
  playerColor,
  closeModal,
  chooseWeapon,
  player,
  isChooseWeapon,
}) => {
  const choose = (weapon) => {
    let player;
    if (attackerBeforeWar.color === playerColor) {
      player = attackerBeforeWar;
    } else {
      player = defenderBeforeWar;
    }
    chooseWeapon(weapon, player);
  };
  // console.log(attackerBeforeWar);
  // console.log(defenderBeforeWar);
  const checkImg = (weapon, color) => {
    switch (weapon) {
      case "rock":
        return `charmander-${color}`;
      case "paper":
        return `squirtle-${color}`;
      case "scissors":
        return `balbazor-${color}`;
    }
  };
  let attackerImg;
  let defenderImg;
  if (
    Object.keys(attackerBeforeWar).length !== 0 &&
    Object.keys(defenderBeforeWar).length !== 0
  ) {
    attackerImg = checkImg(attackerBeforeWar.weapon, attackerBeforeWar.color);
    defenderImg = checkImg(defenderBeforeWar.weapon, defenderBeforeWar.color);
  }
  return (
    <Container show={show}>
      {Object.keys(attackerBeforeWar).length !== 0 &&
        Object.keys(defenderBeforeWar).length !== 0 &&
        (!isChooseWeapon ? (
          <>
            <Attacker
              winner={warResult}
              show={show}
              showFirst={playerColor === attackerBeforeWar.color}
              type="attacker"
            >
              <Img
                src={require(`./images/${attackerImg}.png`).default}
                alt="attacker"
              />
            </Attacker>
            {/* <h1>Vs</h1> */}
            <ChoiseList>
              <Choise
                onClick={() => choose("rock")}
                src={require(`./images/charmander-${playerColor}.png`).default}
              />
              <Choise
                onClick={() => choose("scissors")}
                src={require(`./images/balbazor-${playerColor}.png`).default}
              />
              <Choise
                onClick={() => choose("paper")}
                src={require(`./images/squirtle-${playerColor}.png`).default}
              />
            </ChoiseList>
            <Defender
              winner={warResult}
              show={show}
              showFirst={playerColor === defenderBeforeWar.color}
              type="defender"
            >
              <Img
                src={require(`./images/${defenderImg}.png`).default}
                alt="defender"
              />
            </Defender>
          </>
        ) : (
          <SpinnerContainer>
            <Spinner />
            <h1>Waiting for opponent...</h1>
          </SpinnerContainer>
        ))}
      {/* <h1>Attacker: {attackerBeforeWar.weapon}</h1>
      <h1>Defender: {defenderBeforeWar.weapon}</h1>
      <h1>Result: {warResult}</h1> */}
    </Container>
  );
};

export default WarDrawModal;

const opacityWeapons = keyframes`
0%{
  opacity: 0;
  
}
100% {
  opacity: 1;
}
`;

const clickMeAnimation = keyframes`

  0% {
    transform: translate(-50%,-50%) scale(1);
    box-shadow: none;
  }
  50% {
    transform: translate(-50%,-50%) scale(1.05);
    box-shadow: 0 1rem 4rem rgba(0, 0, 0, 0.25);
  }
  100% {
    transform: translate(-50%,-50%) scale(1);
    box-shadow: none;
  }

}
`;

const Container = styled.div`
  opacity: ${({ show }) => (show ? "1" : "0")};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  width: 85%;
  height: 65%;
  display: flex;
  flex-direction: column;
  background-color: #c6de83;
  position: absolute;
  transition: ${({ show }) => (show ? "all 0.6s 1.6s" : "all 0.5s")};
  z-index: 349;
  top: 50%;
  left: 50%;
  /* justify-content: center; */
  align-items: center;
  transform: ${({ show }) =>
    show ? "translate(-50%,-50%)" : "translate(-50%, -300rem)"};
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const Attacker = styled.div`
  flex: 0 0 50%;
  display: flex;
  align-items: center;
  opacity: 0;
  align-self: flex-start;
  margin-left: 1rem;

  ${({ showFirst }) =>
    showFirst &&
    css`
      animation: ${opacityWeapons} 0.4s 2.5s forwards;
    `}

  ${({ showFirst }) =>
    !showFirst &&
    css`
      animation: ${opacityWeapons} 0.4s 3.5s forwards;
    `}
`;
const Defender = styled.div`
  align-self: flex-end;
  flex: 1;

  display: flex;
  align-items: center;
  opacity: 0;
  margin-right: 1rem;

  ${({ showFirst }) =>
    showFirst &&
    css`
      animation: ${opacityWeapons} 0.4s 2.5s forwards;
    `}

  ${({ showFirst }) =>
    !showFirst &&
    css`
      animation: ${opacityWeapons} 0.4s 3.5s forwards;
    `}
`;

const ChoiseList = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  opacity: 0;

  animation: ${opacityWeapons} 0.2s 4.5s forwards,
    ${clickMeAnimation} 0.8s 4.7s 4;
  /* border: 1px solid black; */
`;

const Choise = styled.img`
  width: 7rem;
  height: 8rem;
  cursor: pointer;
  :not(:last-child) {
    margin-bottom: 1rem;
  }
`;
const Img = styled.img`
  height: 12rem;
  width: 9rem;
`;

const SpinnerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
/*  ${({ showFirst }) =>
    showFirst
      ? css`
          animation: ${opacityWeapons} 1s 5s forwards;
        `
      : css`
          animation: ${opacityWeapons} 1s 6.5s forwards;
        `}; */
