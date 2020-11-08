import React, { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components";
import l from "../images/pokemon-minimalism-squirtle-bulbasaur-wallpaper-preview.jpg";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import Footer from "./../Footer";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import { AudioContext } from "../audio-context";

// let count = 0;
const Lobby = ({ games, setPage, joinGame }) => {
  const { playSound, stopSound } = useContext(AudioContext);
  // const [audioPlaying, setAudioPlaying] = useState(false);
  // var audioTune = new Audio(sound);

  // useEffect(() => {
  //   audioTune.load();
  // }, []);

  // const playSound = () => {
  //   if (flag) return;
  //   audioTune.play();
  //   flag = true;
  // };

  // // pause audio sound
  // const pauseSound = () => {
  //   console.log("pause");
  //   audioTune.pause();
  // };

  // // stop audio sound
  // const stopSound = () => {
  //   audioTune.pause();
  //   audioTune.currentTime = 0;
  // };

  const handleClick = (type) => {
    playSound();
    switch (type) {
      case "create":
        setPage("CreateNewGame");
        break;
      case "join":
        setPage("JoinGame");
        break;
      case "rules":
        setPage("Rules");
        break;
      case "about":
        setPage("About");
        break;
    }
  };
  return (
    <Container>
      {/* <VolumeOffContainer fontSize="large">
        <VolumeOffIcon
          onClick={stopSound}
          style={{ width: "5rem", height: "5rem", cursor: "pointer" }}
        />
      </VolumeOffContainer> */}
      <Img src={l} alt="main logo" />
      {/* <VolumeUpContainer fontSize="large">
        <VolumeUpIcon
          onClick={playSound}
          style={{ width: "5rem", height: "5rem", cursor: "pointer" }}
        />
      </VolumeUpContainer> */}
      <Buttons>
        <Button onClick={() => handleClick("create")}>Create Game</Button>
        <Button onClick={() => handleClick("join")}>Join Game</Button>
        <Button onClick={() => handleClick("rules")}>Rules</Button>
        <Button onClick={() => handleClick("about")}>About</Button>
      </Buttons>
      <Footer />
    </Container>
  );
};

export default Lobby;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  height: 100vh;
  background-color: #f6f6f6;
`;

const Img = styled.img`
  width: 100%;
  flex: 0 0 50%;
`;

const Buttons = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  border: none;
  font-size: 2.8rem;
  font-family: inherit;
  text-transform: uppercase;
  padding: 1rem 2rem;
  height: 25%;
  &:nth-child(2n) {
    background-color: #c6de83;
  }
  &:nth-child(2n + 1) {
    background-color: #a5ce21;
  }
`;

const VolumeUpContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  opacity: ${({ audioPlaying }) => (audioPlaying ? "0" : "1")};
`;
const VolumeOffContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;
// const CreateButton = styled.button``;

// const JoinButton = styled(CreateButton)`
//   background-color: #c6de83;
// `;
