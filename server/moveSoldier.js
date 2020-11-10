module.exports = ({ game, attackSoldier, cellToAttack, type }) => {
  const {
    weapon: Aw,
    player: Ap,
    color: Ac,
    index: Ai,
    exposed: Ae,
  } = attackSoldier;
  const { weapon: Dw, player: Dp, color: Dc, index: Di } = cellToAttack;
  console.log("attackSoldier", attackSoldier);
  console.log("cellToAttack", cellToAttack);
  if (type === "war") {
    game.turn = game.turn === "red" ? "blue" : "red"; // change the game turn
  }

  if (Dw === null) {
    //check if the destination is empty
    game.board[Di] = {
      // move all the details from the attacker to the destination cell
      weapon: Aw,
      player: Ap,
      color: Ac,
      exposed: Ae,
    };
    game.board[Ai] = {
      //make the attacker cell empty
      weapon: null,
      player: null,
      color: "grey",
    };
    return "empty";
  } else if (
    //check if the attacker wins the defender
    (Aw === "rock" && Dw === "scissors") ||
    (Aw === "paper" && Dw === "rock") ||
    (Aw === "scissors" && Dw === "paper")
  ) {
    game.board[Di] = {
      // move all the details from the attacker to the destination cell and exposed the attacker
      weapon: Aw,
      player: Ap,
      color: Ac,
      exposed: true,
    };
    game.board[Ai] = {
      //make the attacker cell empty
      weapon: null,
      player: null,
      color: "grey",
    };

    return "attacker";
  } else if (
    //check if the attacker loses the defender
    (Aw === "rock" && Dw === "paper") ||
    (Aw === "paper" && Dw === "scissors") ||
    (Aw === "scissors" && Dw === "rock")
  ) {
    console.log("HEREHEREHREHRE");
    game.board[Di] = {
      //mark that the defend soldier is exposed now
      ...game.board[Di],
      weapon: Dw !== game.board[Di].weapon ? Dw : game.board[Di].weapon,
      exposed: true,
    };
    console.log("DEFENCE AFTER:", game.board[Di]);

    game.board[Ai] = {
      //make the attacker cell empty
      weapon: null,
      player: null,
      color: "grey",
    };
    console.log("ATTACKER AFTER:", game.board[Ai]);

    return "defender";
  } else {
    //check if is draw
    return "draw";
  }
};
