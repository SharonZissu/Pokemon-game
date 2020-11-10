import React from "react";
import styled, { keyframes, css } from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
const WarModal = ({
  show,
  warResult,
  attackerBeforeWar,
  defenderBeforeWar,
  playerColor,
  closeModal,
}) => {
  if (show) {
    console.log("show from WarModal", show);
    console.log("warResult from WarModal", warResult);
    console.log("attackerBeforeWar from WarModal", attackerBeforeWar);
    console.log("defenderBeforeWar from WarModal", defenderBeforeWar);
    console.log("playerColor from WarModal", playerColor);
  }

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
        Object.keys(defenderBeforeWar).length !== 0 && (
          <>
            <CloseIconContainer>
              <CloseIcon
                onClick={closeModal}
                style={{ height: "4rem", width: "4rem" }}
              />
            </CloseIconContainer>
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
        )}
      {/* <h1>Attacker: {attackerBeforeWar.weapon}</h1>
      <h1>Defender: {defenderBeforeWar.weapon}</h1>
      <h1>Result: {warResult}</h1> */}
    </Container>
  );
};

export default WarModal;

const modalAnimation = keyframes`
  0% {
    transform: translate(-50%, -45%);

  }

  100% {
    transform: translate(-50%, -44%);


  }
`;

const opacityModal = keyframes`
0%{
  opacity: 0;
  
}
100% {
  opacity: 1;
}
`;
const opacityWeapons = keyframes`
0%{
  opacity: 0;
  
}
100% {
  opacity: 1;
}
`;

const winnerAnimation = (type) => keyframes`
0%{
  transform: scale(1);
}

100% {
  
    ${
      type === "defender"
        ? css`
            transform: translateY(-8rem) scale(1.7);
          `
        : css`
            transform: translateY(8rem) scale(1.7);
          `
    }
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.7); */

}
`;

const loserAnimation = keyframes`
0%{
  transform: scale(1);
}

100% {
  transform:  scale(.4);
  opacity: 0;
  
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
  transition: ${({ show }) => (show ? "all 0.6s 3s" : "all 0.5s")};
  z-index: 352;
  top: 50%;
  left: 50%;
  /* justify-content: center; */
  align-items: center;
  transform: ${({ show }) =>
    show ? "translate(-50%,-50%)" : "translate(-50%, -240%)"};
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

  ${({ showFirst, winner, type }) =>
    showFirst &&
    winner === "attacker" &&
    css`
      animation: ${opacityWeapons} 0.2s 5s forwards,
        ${winnerAnimation(type)} 1s 8s forwards;
    `}
  ${({ showFirst, winner }) =>
    showFirst &&
    winner !== "attacker" &&
    css`
      animation: ${opacityWeapons} 0.2s 5s forwards,
        ${loserAnimation} 1s 8s forwards; ;
    `}

    ${({ showFirst, winner, type }) =>
    !showFirst &&
    winner === "attacker" &&
    css`
      animation: ${opacityWeapons} 1s 6.5s forwards,
        ${winnerAnimation(type)} 1s 8s forwards;
    `}

    ${({ showFirst, winner }) =>
    !showFirst &&
    winner !== "attacker" &&
    css`
      animation: ${opacityWeapons} 1s 6.5s forwards,
        ${loserAnimation} 1s 8s forwards; ;
    `}
`;
const Defender = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
  opacity: 0;

  ${({ showFirst, winner, type }) =>
    showFirst &&
    winner === "defender" &&
    css`
      animation: ${opacityWeapons} 0.2s 5s forwards,
        ${winnerAnimation(type)} 1s 8s forwards;
    `}
  ${({ showFirst, winner }) =>
    showFirst &&
    winner !== "defender" &&
    css`
      animation: ${opacityWeapons} 0.2s 5s forwards,
        ${loserAnimation} 1s 8s forwards;
    `}

    ${({ showFirst, winner, type }) =>
    !showFirst &&
    winner === "defender" &&
    css`
      animation: ${opacityWeapons} 1s 6.5s forwards,
        ${winnerAnimation(type)} 1s 8s forwards;
    `}

    ${({ showFirst, winner }) =>
    !showFirst &&
    winner !== "defender" &&
    css`
      animation: ${opacityWeapons} 1s 6.5s forwards,
        ${loserAnimation} 1s 8s forwards; ;
      ;
    `}
`;

const Img = styled.img`
  height: 12rem;
  width: 8rem;
`;

/*  ${({ showFirst }) =>
    showFirst
      ? css`
          animation: ${opacityWeapons} 1s 5s forwards;
        `
      : css`
          animation: ${opacityWeapons} 1s 6.5s forwards;
        `}; */
