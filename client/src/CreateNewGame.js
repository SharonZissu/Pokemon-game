import React, { useState } from "react";

const CreateNewGame = ({ createGame }) => {
  const [name, setName] = useState("");

  return (
    <div>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <button onClick={() => createGame(name)}>Create New Game</button>
    </div>
  );
};

export default CreateNewGame;
