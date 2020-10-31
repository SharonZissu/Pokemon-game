import React, { useEffect } from "react";
import styled, { css, keyframes } from "styled-components";

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
  moveSoldier,
  chooseFlagClicked,
  chooseTrapClicked,
  flag,
  trap,
  direction,
  attackerIndex,
  setAttackerIndex,
  cellToMoveIndex,
  setCellToMoveIndex,
}) => {
  useEffect(() => {
    // setAttackerIndex(null);
    setCellToMoveIndex(null);
  }, []);
  const handlePickFlagAndTrapsClick = () => {
    if (!flag) {
      chooseFlagClicked(index);
    } else if (!trap) {
      chooseTrapClicked(index);
    }
  };
  const handleClick = () => {
    console.log("TURN", turn);
    console.log("playerColor", playerColor);
    if (turn !== playerColor) {
      //check if player try to click not in his turn
      console.log("player try to click not in his turn");
      return;
    }

    if (attackSoldier) {
      // check if this is the second click that point on where the soldier want to move
      console.log("attackSoldier");
      if (cellColor === playerColor) {
        // check if i try to attck soldier of my team
        console.log("cellColor === playerColor");
        return;
      }
      if (
        // check if soldier try to move to place he can't
        playerColor === "red" &&
        attackSoldier.index + 7 !== index &&
        attackSoldier.index + 1 !== index &&
        attackSoldier.index - 1 !== index
      )
        return;
      if (
        playerColor === "blue" &&
        attackSoldier.index + -7 !== index &&
        attackSoldier.index + 1 !== index &&
        attackSoldier.index - 1 !== index
      )
        return;

      const cellToAttack = {
        ...board[index],
        index: index,
      };
      console.log("cellToAttack", cellToAttack);
      moveSoldier(cellToAttack);
    } else {
      // if this is the first click to define the attacker soldier
      if (weapon === "flag" || weapon === "trap") {
        // you can't move the flag or the trap
        console.log('weapon === "flag" || weapon === "trap"');
        return;
      }
      if (playerColor !== cellColor) {
        // you can't move the opponent soldier
        console.log("playerColor !== cellColor");
        return;
      }
      const attackingSoldier = {
        ...board[index],
        index: index,
        player,
      };
      handleAttack(attackingSoldier);
    }

    //   if(board[i+7].weapon !== null && board[i+1] !==null && board[i-1] !== null) return;
    //   if(turn === 'red' && index === 0)
  };

  let img;
  if (playerColor == cellColor) {
    if (weapon === "rock") img = `charmander-${playerColor}`;
    else if (weapon === "paper") img = `squirtle-${playerColor}`;
    else if (weapon === "scissors") img = `balbazor-${playerColor}`;
    else if (weapon === "flag") img = `${playerColor}-flag`;
    else if (weapon === "trap") img = `hole`;
    else if (!weapon) img = `pokeball-${playerColor}`;
  } else {
    if (!exposed && cellColor !== "grey")
      img = `pokeball-${playerColor === "red" ? "blue" : "red"}`;
    else if (exposed) {
      if (weapon === "rock")
        img = `charmander-${playerColor === "red" ? "blue" : "red"}`;
      if (weapon === "paper")
        img = `squirtle-${playerColor === "red" ? "blue" : "red"}`;
      if (weapon === "scissors")
        img = `balbazor-${playerColor === "red" ? "blue" : "red"}`;
    }
  }
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

  if (direction === "up") movingSoldierTo = "translateY(110%)";
  else if (direction === "down") movingSoldierTo = "translateY(-110%)";
  else if (direction === "right") movingSoldierTo = "translateX(-130%)";
  else if (direction === "left") movingSoldierTo = "translateX(130%)";
  //(playerColor === cellColor || exposed) ? weapon :
  return (
    <SoldierContainer
      onClick={!flag || !trap ? handlePickFlagAndTrapsClick : handleClick}
      // bgColor={cellColor}
    >
      {img && (
        <Img
          src={require(`./images/${img}.png`).default}
          alt="cell logo"
          flag={flag}
          color={cellColor === playerColor}
          type={weapon}
          movingSoldierTo={movingSoldierTo}
          animate={cellToMoveIndex ? cellToMoveIndex === index : false}
        />
      )}
    </SoldierContainer>
  );
};

export default Soldier;

const SoldierContainer = styled.button`
  width: 14.2857143%;
  border: none;
  height: 16.6666667%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  height: ${({ type, color }) => (type === "trap" && color ? "50%" : "80%")};

  animation: ${({ movingSoldierTo, animate }) =>
      animate && moving(movingSoldierTo)}
    2s;
`;

/* anima
  animation: ${({ movingSoldierTo, animate }) =>
    animate &&
    css`
      ${moving(movingSoldierTo)}
    `}; */
