import React, { useEffect, useState } from "react";

//Components
import Footer from "../components/Footer";
import Modal from "../components/Modals/Modal";
import VoulmeIcons from "../components/UI/VoulmeIcons";

//styles
import styled from "styled-components";
import joinImg from "../images/joinGame-img.png";

const JoinGame = ({
  games,
  joinGame,
  setPage,
  gameIsFullMsg,
  setGameIsFullMsg,
  playerNameExistsMsg,
  setPlayerNameExistsMsg,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [gameId, setGameId] = useState(false);
  const [name, setName] = useState("");
  const [nameIsEmpty, setNameIsEmpty] = useState(false);

  useEffect(() => {
    if (name !== "") {
      setNameIsEmpty(false);
    }
  }, [name]);
  const handleChangeName = (e) => {
    setName(e.target.value);
    setPlayerNameExistsMsg(false);
  };

  const handleJoin = (gameId, numberOfPlayers) => {
    if (numberOfPlayers === 2) return;
    setShowModal(true);
    setGameId(gameId);
  };

  const joinGameHandler = () => {
    if (name === "") {
      setNameIsEmpty(true);
      return;
    }
    joinGame(gameId, name);
  };

  const closeJoinModal = () => {
    setShowModal(false);
    setGameIsFullMsg(false);
  };
  return (
    <>
      <Container>
        <VoulmeIcons />

        <Modal
          type="join"
          show={showModal}
          joinGameHandler={joinGameHandler}
          closeJoinModal={closeJoinModal}
          handleChangeName={handleChangeName}
          nameIsEmpty={nameIsEmpty}
          gameIsFullMsg={gameIsFullMsg}
          playerNameExistsMsg={playerNameExistsMsg}
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

// const VolumeContainer = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
// `;

const VolumeOffContainer = styled.div`
  position: absolute;
  top: 0;
  left: 1rem;
`;
const VolumeOnContainer = styled.div`
  position: absolute;
  top: 0;
  right: 1rem;
`;

const Img = styled.img`
  width: 100%;
  flex: 0 0 40%;
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  flex: 0 0 35%;
  display: block;
  padding-top: 2rem;
  /* border: 1px solid black; */
  border-right: none;
  border-left: none;
  /* background-color: #c6de83; */
  background-color: #f6f6f6;

  position: relative;
`;
const Table = styled.table`
  border-collapse: collapse;
  /* background-color: #c6de83; */
  background-color: #f6f6f6;

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
  font-size: 2.7rem;
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
  background-color: #c6de83;
`;
