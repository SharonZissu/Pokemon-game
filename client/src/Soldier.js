import React, { useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
const Soldier = ({
  cellColor,
  playerColor,
  weapon,
  player,
  index,
  exposed,
  turn,
  board,
  handleAttack,
  attackSoldier,
  moveSoldierBefore,
  chooseFlagClicked,
  chooseTrapClicked,
  flag,
  trap,
  direction,
  attackerIndex,
  setAttackerIndex,
  cellToMoveIndex,
  setCellToMoveIndex,
  checkArrows,
  arrayOfArrows,
  war,
  warDraw,
  attackerBeforeWar,
  defenderBeforeWar,
  warDrawHelpForDesign,
}) => {
  useEffect(() => {
    // setAttackerIndex(null);
    setCellToMoveIndex(null);
  }, []);

  const handlePickFlagAndTrapsClick = () => {
    if (!flag) chooseFlagClicked(index);
    else if (!trap) chooseTrapClicked(index);
  };

  const handleClick = () => {
    if (turn !== playerColor) return; //check if player try to click not in his turn
    if (attackSoldier) {
      // check if this is the second click that point on where the soldier want to move
      if (cellColor === playerColor) {
        // check if the second click is on one of the same team soldiers
        //if yes we want to change the attacker sodlier to this soldier
        checkIfSoldierCanAttack();
        return;
      }
      const check = checkIfAttackerCanMoveToCell();
      if (!check) return;

      const cellToAttack = {
        ...board[index],
        index: index,
      };
      moveSoldierBefore(cellToAttack);
    } else {
      // if this is the first click to define the attacker soldier
      checkIfSoldierCanAttack();
    }
  };

  const checkIfSoldierCanAttack = () => {
    const attackingSoldier = checkIfFirstClickConfirm();
    if (!attackingSoldier) return;
    handleAttack(attackingSoldier);
    checkArrows(index);
  };

  const checkIfFirstClickConfirm = () => {
    if (weapon === "flag" || weapon === "trap") return false; // you can't move the flag or the trap
    if (playerColor !== cellColor) return false; // you can't move the opponent soldier
    const attackingSoldier = {
      ...board[index],
      index: index,
      player,
    };
    return attackingSoldier;
  };

  const checkIfAttackerCanMoveToCell = () => {
    if (
      // check if soldier try to move to place he can't
      attackSoldier.index + 7 !== index &&
      attackSoldier.index + 1 !== index &&
      attackSoldier.index - 1 !== index &&
      attackSoldier.index - 7 !== index
    )
      return false;
    return true;
  };

  // console.log("attackerBeforeWar", attackerBeforeWar);
  // console.log("defenderBeforeWar", defenderBeforeWar);
  let img;

  const checkSoldier = () => {
    // if (
    //   Object.keys(attackerBeforeWar).length !== 0 &&
    //   Object.keys(defenderBeforeWar).length !== 0 &&
    //   warDraw
    // ) {
    //   if (attackerBeforeWar.index === index) {
    //     img = `pokeball-${attackerBeforeWar.color}`;
    //   }
    //   if (defenderBeforeWar.index === index) {
    //     img = `pokeball-${defenderBeforeWar.color}`;
    //   }
    //   return;
    // }
    if (
      Object.keys(attackerBeforeWar).length !== 0 &&
      Object.keys(defenderBeforeWar).length !== 0 &&
      warDrawHelpForDesign
    ) {
      if (attackerBeforeWar.index === index) {
        img = `pokeball-${attackerBeforeWar.color}`;
      }
      if (defenderBeforeWar.index === index) {
        img = `pokeball-${defenderBeforeWar.color}`;
      }
      return;
    }

    // (Object.keys(attackerBeforeWar).length !== 0 &&
    // Object.keys(defenderBeforeWar).length !== 0 &&
    // warDraw)
    if (
      Object.keys(attackerBeforeWar).length !== 0 &&
      Object.keys(defenderBeforeWar).length !== 0 &&
      war &&
      !warDrawHelpForDesign
    ) {
      if (attackerBeforeWar.index === index) {
        if (
          attackerBeforeWar.color === playerColor &&
          !attackerBeforeWar.exposed
        ) {
          if (attackerBeforeWar.weapon === "rock")
            img = `charmander-${playerColor}`;
          else if (attackerBeforeWar.weapon === "paper")
            img = `squirtle-${playerColor}`;
          else if (attackerBeforeWar.weapon === "scissors")
            img = `balbazor-${playerColor}`;
          else if (attackerBeforeWar.weapon === "flag")
            img = `${playerColor}-flag`;
          else if (attackerBeforeWar.weapon === "trap") img = `hole`;
          else if (!attackerBeforeWar.weapon) img = `pokeball-${playerColor}`;
        } else if (
          attackerBeforeWar.color === playerColor &&
          attackerBeforeWar.exposed
        ) {
          if (attackerBeforeWar.weapon === "rock")
            img = `charmander-${playerColor}-e`;
          else if (attackerBeforeWar.weapon === "paper")
            img = `squirtle-${playerColor}-e`;
          else if (attackerBeforeWar.weapon === "scissors")
            img = `balbazor-${playerColor}-e`;
          else if (attackerBeforeWar.weapon === "flag")
            img = `${playerColor}-flag`;
          else if (attackerBeforeWar.weapon === "trap") img = `hole`;
          else if (!attackerBeforeWar.weapon) img = `pokeball-${playerColor}`;
        } else if (
          attackerBeforeWar.color !== playerColor &&
          attackerBeforeWar.exposed
        ) {
          if (attackerBeforeWar.weapon === "rock")
            img = `charmander-${attackerBeforeWar.color}-e`;
          else if (attackerBeforeWar.weapon === "paper")
            img = `squirtle-${attackerBeforeWar.color}-e`;
          else if (attackerBeforeWar.weapon === "scissors")
            img = `balbazor-${attackerBeforeWar.color}-e`;
          else if (attackerBeforeWar.weapon === "flag")
            img = `${attackerBeforeWar.color}-flag`;
          else if (attackerBeforeWar.weapon === "trap") img = `hole`;
          else if (!attackerBeforeWar.weapon)
            img = `pokeball-${attackerBeforeWar.color}`;
        } else if (
          attackerBeforeWar.color !== playerColor &&
          !attackerBeforeWar.exposed
        ) {
          img = `pokeball-${attackerBeforeWar.color}`;
        }
      }
      if (defenderBeforeWar.index === index) {
        if (
          defenderBeforeWar.color === playerColor &&
          !defenderBeforeWar.exposed
        ) {
          if (defenderBeforeWar.weapon === "rock")
            img = `charmander-${playerColor}`;
          else if (defenderBeforeWar.weapon === "paper")
            img = `squirtle-${playerColor}`;
          else if (defenderBeforeWar.weapon === "scissors")
            img = `balbazor-${playerColor}`;
          else if (defenderBeforeWar.weapon === "flag")
            img = `${playerColor}-flag`;
          else if (defenderBeforeWar.weapon === "trap") img = `hole`;
          else if (!defenderBeforeWar.weapon) img = `pokeball-${playerColor}`;
        } else if (
          defenderBeforeWar.color === playerColor &&
          defenderBeforeWar.exposed
        ) {
          if (defenderBeforeWar.weapon === "rock")
            img = `charmander-${playerColor}-e`;
          else if (defenderBeforeWar.weapon === "paper")
            img = `squirtle-${playerColor}-e`;
          else if (defenderBeforeWar.weapon === "scissors")
            img = `balbazor-${playerColor}-e`;
          else if (defenderBeforeWar.weapon === "flag")
            img = `${playerColor}-flag`;
          else if (defenderBeforeWar.weapon === "trap") img = `hole`;
          else if (!defenderBeforeWar.weapon) img = `pokeball-${playerColor}`;
        } else if (
          defenderBeforeWar.color !== playerColor &&
          defenderBeforeWar.exposed
        ) {
          if (defenderBeforeWar.weapon === "rock")
            img = `charmander-${defenderBeforeWar.color}-e`;
          else if (defenderBeforeWar.weapon === "paper")
            img = `squirtle-${defenderBeforeWar.color}-e`;
          else if (defenderBeforeWar.weapon === "scissors")
            img = `balbazor-${defenderBeforeWar.color}-e`;
          else if (defenderBeforeWar.weapon === "flag")
            img = `${defenderBeforeWar.color}-flag`;
          else if (defenderBeforeWar.weapon === "trap") img = `hole`;
          else if (!defenderBeforeWar.weapon)
            img = `pokeball-${defenderBeforeWar.color}`;
        } else if (
          defenderBeforeWar.color !== playerColor &&
          !defenderBeforeWar.exposed
        ) {
          img = `pokeball-${defenderBeforeWar.color}`;
        }
      }

      // if (defenderBeforeWar.index === index) {
      //   img = `pokeball-${defenderBeforeWar.color}`;
      // }
      // if (
      //   (attackerBeforeWar.index === index) &&
      //   (playerColor !== attackerBeforeWar.color)
      // ) {
      //   img = `pokeball-${attackerBeforeWar.color}`;
      //   console.log("HERERERERERERER POKEBALL ATTACKER");
      // } else if (
      //   attackerBeforeWar.index === index &&
      //   playerColor === attackerBeforeWar.color
      // ) {
      //   if (attackerBeforeWar.weapon === "rock") {
      //     img = `charmander-${attackerBeforeWar.color}`;
      //     console.log("CHARMANDERRRRRRRRRRRRRRRR ");
      //   }

      //   if (attackerBeforeWar === "paper")
      //     img = `squirtle-${attackerBeforeWar.color}`;
      //   if (attackerBeforeWar === "scissors")
      //     img = `balbazor-${attackerBeforeWar.color}`;
      // } else if (
      //   defenderBeforeWar.index === index &&
      //   playerColor !== defenderBeforeWar.color
      // ) {
      //   img = `pokeball-${defenderBeforeWar.color}`;
      // } else if (
      //   defenderBeforeWar.index === index &&
      //   playerColor === defenderBeforeWar.color
      // ) {
      //   if (defenderBeforeWar.weapon === "rock")
      //     img = `charmander-${defenderBeforeWar.color}`;
      //   if (defenderBeforeWar === "paper")
      //     img = `squirtle-${defenderBeforeWar.color}`;
      //   if (defenderBeforeWar === "scissors")
      //     img = `balbazor-${defenderBeforeWar.color}`;
      // }
      return;
    }
    if (playerColor == cellColor && !exposed) {
      if (weapon === "rock") img = `charmander-${playerColor}`;
      else if (weapon === "paper") img = `squirtle-${playerColor}`;
      else if (weapon === "scissors") img = `balbazor-${playerColor}`;
      else if (weapon === "flag") img = `${playerColor}-flag`;
      else if (weapon === "trap") img = `hole`;
      else if (!weapon) img = `pokeball-${playerColor}`;
    } else {
      if (!exposed && cellColor !== "grey")
        img = `pokeball-${playerColor === "red" ? "blue" : "red"}`;
      else if (exposed && playerColor === cellColor) {
        if (weapon === "rock") img = `charmander-${playerColor}-e`;
        if (weapon === "paper") img = `squirtle-${playerColor}-e`;
        if (weapon === "scissors") img = `balbazor-${playerColor}-e`;
        if (weapon === "trap") img = "hole";
        if (weapon === "flag") img = `${playerColor}-flag`;
      } else if (exposed && playerColor !== cellColor) {
        if (weapon === "rock")
          img = `charmander-${playerColor === "red" ? "blue" : "red"}-e`;
        if (weapon === "paper")
          img = `squirtle-${playerColor === "red" ? "blue" : "red"}-e`;
        if (weapon === "scissors")
          img = `balbazor-${playerColor === "red" ? "blue" : "red"}-e`;
        if (weapon === "trap") img = "hole";
        if (weapon === "flag")
          img = `${playerColor === "red" ? "blue" : "red"}-flag`;
      }
    }
  };

  checkSoldier();

  // if (!weapon) {
  //   if (playerColor === cellColor && !exposed) {
  //     img = `pokeball-${playerColor}`;
  //   } else if (playerColor !== cellColor && cellColor !== "grey") {
  //     img = `pokeball-${playerColor === "red" ? "blue" : "red"}`;
  //   }
  // } else {
  //   if (playerColor !== cellColor && cellColor !== "grey") {
  //     img = `pokeball-${playerColor === "red" ? "blue" : "red"}`;
  //   } else if (playerColor === cellColor && !exposed && weapon === "flag") {
  //     img = `${playerColor}-flag`;
  //   } else if (playerColor === cellColor && !exposed && weapon === "trap") {
  //     img = `hole`;
  //   } else if (weapon === "rock") {
  //     img = `charmander-${playerColor}`;
  //   } else if (weapon === "paper") {
  //     img = `squirtle-${playerColor}`;
  //   } else if (weapon === "scissors") {
  //     img = `balbazor-${playerColor}`;
  //   }
  // }

  let movingSoldierTo;

  if (direction === "up") movingSoldierTo = "translateY(125%)";
  else if (direction === "down") movingSoldierTo = "translateY(-125%)";
  else if (direction === "right") movingSoldierTo = "translateX(-125%)";
  else if (direction === "left") movingSoldierTo = "translateX(125%)";
  //(playerColor === cellColor || exposed) ? weapon :
  return (
    <SoldierContainer
      show={
        (Object.keys(attackerBeforeWar).length !== 0 &&
          Object.keys(defenderBeforeWar).length !== 0 &&
          war &&
          attackerBeforeWar.index === index) ||
        (Object.keys(attackerBeforeWar).length !== 0 &&
          Object.keys(defenderBeforeWar).length !== 0 &&
          war &&
          defenderBeforeWar.index === index) ||
        (Object.keys(attackerBeforeWar).length !== 0 &&
          Object.keys(defenderBeforeWar).length !== 0 &&
          warDraw &&
          attackerBeforeWar.index === index) ||
        (Object.keys(attackerBeforeWar).length !== 0 &&
          Object.keys(defenderBeforeWar).length !== 0 &&
          warDraw &&
          defenderBeforeWar.index === index)
      }
      onClick={!flag || !trap ? handlePickFlagAndTrapsClick : handleClick}
      // bgColor={cellColor}
    >
      <>
        <ArrowContainer
          show={
            attackSoldier &&
            attackSoldier.index === index &&
            arrayOfArrows.includes("left")
          }
          type={
            attackSoldier && attackSoldier.index === index ? "left" : "none"
          }
        >
          <ArrowBackIcon fontSize="large" />
        </ArrowContainer>

        <ArrowContainer
          show={
            attackSoldier &&
            attackSoldier.index === index &&
            arrayOfArrows.includes("right")
          }
          type={
            attackSoldier && attackSoldier.index === index ? "right" : "none"
          }
        >
          <ArrowForwardIcon fontSize="large" />
        </ArrowContainer>

        <ArrowContainer
          show={
            attackSoldier &&
            attackSoldier.index === index &&
            arrayOfArrows.includes("up")
          }
          type={attackSoldier && attackSoldier.index === index ? "up" : "none"}
        >
          <ArrowUpwardIcon fontSize="large" />
        </ArrowContainer>
        <ArrowContainer
          show={
            attackSoldier &&
            attackSoldier.index === index &&
            arrayOfArrows.includes("down")
          }
          type={
            attackSoldier && attackSoldier.index === index ? "down" : "none"
          }
        >
          <ArrowDownwardIcon fontSize="large" />
        </ArrowContainer>
      </>

      {img && (
        <Img
          src={require(`./images/${img}.png`).default}
          alt="cell logo"
          flag={flag}
          color={cellColor === playerColor || exposed}
          type={weapon}
          movingSoldierTo={movingSoldierTo}
          animate={cellToMoveIndex ? cellToMoveIndex === index : false}
          zIndexUp={war || warDraw}
          scaleExposed={exposed && !war && !warDraw}
        />
      )}
    </SoldierContainer>
  );
};

export default Soldier;
const opacityPokadors = keyframes`
0% {
  opacity: 1;
  visibility: hidden;

}

100% {
  opacity: 0;
  visibility: hidden;

}

`;
const SoldierContainer = styled.button`
  width: 14.2857143%;
  border: none;
  height: 16.6666667%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: ${({ show }) => (show ? "351" : "auto")};
  ${({ show }) =>
    show &&
    css`
      animation: ${opacityPokadors} 0.2s 1.6s forwards;
    `}
  /* background-color: ${({ bgColor }) => bgColor}; */
  &:nth-child(2n) {
    background-color: #a5ce21;
  }
  &:nth-child(2n + 1) {
    background-color: #c6de83;
  }
  &:focus {
    outline: none;
  }
`;

const moving = (movingSoldierTo) => keyframes`
0% {
  
  transform: ${movingSoldierTo}
  
}
100% {
  transform: translateY(0);
  transform: translateX(0);
}
`;

const Img = styled.img`
  width: 80%;
  position: relative;
  /* z-index: ${({ zIndexUp }) => (zIndexUp ? "300" : "2")}; */
  z-index: 2;
  height: ${({ type, color }) => (type === "trap" && color ? "50%" : "80%")};
  animation: ${({ movingSoldierTo, animate }) =>
      animate && moving(movingSoldierTo)}
    1.2s;
`;

/* anima
  animation: ${({ movingSoldierTo, animate }) =>
    animate &&
    css`
      ${moving(movingSoldierTo)}
    `}; */
const ArrowContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transition: all 0.8s;
  transform: ${({ type }) => {
    if (type === "left") return "translate(-180%, -50%)";
    else if (type === "right") return "translate(75%, -50%)";
    else if (type === "up") return "translate(-50%, -170%)";
    else if (type === "down") return "translate(-50%, 80%)";
    else return "translate(-50%,-50%)";
  }};
  opacity: ${({ show }) => (show ? ".4" : "0")};
`;
