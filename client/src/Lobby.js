import React from "react";

const Lobby = ({ games, setPage, joinGame }) => {
  return (
    <div>
      <button onClick={() => setPage("CreateNewGame")}>Create</button>
      <table>
        <thead>
          <tr>
            <th>Game Name</th>
            <th>Number of Players</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {games.length === 0 && (
            <tr>
              <td>No games created yet</td>
            </tr>
          )}
          {games.map((game) => (
            <tr key={game.name}>
              <td>{game.name}</td>
              <td>{game.numberOfPlayers} / 2</td>
              <td>
                <button onClick={() => joinGame(game.id)}>Join Game</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lobby;
