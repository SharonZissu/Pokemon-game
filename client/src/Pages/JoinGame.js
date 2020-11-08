import React, { useState } from "react";
import Footer from "../Footer";
import styled from "styled-components";
import joinImg from "../images/background.png";
import JoinModal from "../JoinModal";

const JoinGame = ({ games, joinGame, setPage }) => {
  const [showModal, setShowModal] = useState(false);
  const [gameId, setGameId] = useState(false);
  const [name, setName] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleJoin = (gameId, numberOfPlayers) => {
    if (numberOfPlayers === 2) return;
    setShowModal(true);
    setGameId(gameId);
  };

  const joinGameHandler = () => {
    joinGame(gameId, name);
  };

  const closeModal = () => setShowModal(false);
  return (
    <>
      <Container>
        <JoinModal
          show={showModal}
          joinGameHandler={joinGameHandler}
          closeModal={closeModal}
          handleChangeName={handleChangeName}
        />
        <Img src={joinImg} alt="join game img" />
        <TableContainer>
          {games.length === 0 ? (
            <NoGamesTitle>No games available</NoGamesTitle>
          ) : (
            <Table>
              <>
                <Thead>
                  <Tr>
                    <Th style={{ width: "40%" }}>Game Name</Th>
                    <Th>Players</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {games.map((game) => (
                    <Tr key={game.name}>
                      <Td>{game.gameName}</Td>
                      <Td>{game.numberOfPlayers} / 2</Td>
                      <Td>
                        <JoinBtn
                          onClick={() =>
                            handleJoin(game.id, game.numberOfPlayers)
                          }
                        >
                          Join
                        </JoinBtn>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </>
              )
            </Table>
          )}
        </TableContainer>
        <Button onClick={() => setPage("Lobby")}>Back To Lobby</Button>

        <Footer />
      </Container>
    </>
  );
};

export default JoinGame;

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
  flex: 0 0 50%;
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  flex: 0 0 25%;
  display: block;
  /* border: 1px solid black; */
  border-right: none;
  border-left: none;
  background-color: #c6de83;
  position: relative;
`;
const Table = styled.table`
  border-collapse: collapse;
  background-color: #c6de83;
  line-height: 0;
  width: 100%;

  /* height: 100%; */
`;

const NoGamesTitle = styled.p`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.2rem;
  text-transform: uppercase;
  width: 80%;
`;

const Thead = styled.thead`
  text-align: left;
  width: 100%;
`;

const Tbody = styled.tbody`
  text-align: left;
  width: 100%;
  font-size: 2rem;
`;
const Tr = styled.tr``;
const Td = styled.td`
  padding-left: 1rem;
  width: 33%;

  /* font-size: 1.8rem; */
`;
const Th = styled.th`
  font-size: 2rem;
  padding: 2rem 0 2rem 1rem;
  border-bottom: 1px solid black;
`;

const Button = styled.button`
  border: none;
  background-color: #a5ce21;
  align-self: auto;
  font-size: 3rem;
  font-family: inherit;
  text-transform: uppercase;
  padding: 1rem 2rem;
  flex: 1;
  &:focus {
    outline: none;
  }
`;
const JoinBtn = styled(Button)`
  margin: 0;
  width: 100%;
  padding: 0;
  padding: 1rem 0;
  font-size: 2.5rem;
`;