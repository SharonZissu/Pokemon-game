import React, { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components";
import createGameImg from "../images/createGameImg.jpg";
import bgImg from "../images/lobby-bg.jpg";
import l from "../images/pokemon-minimalism-squirtle-bulbasaur-wallpaper-preview.jpg";
// import lobby from "../images/lobboy-img.png";
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
      <CreateBtn onClick={() => handleClick("create")}>Create</CreateBtn>
      <JoinBtn onClick={() => handleClick("join")}>Join</JoinBtn>
      <RulesBtn onClick={() => handleClick("rules")}>Rules</RulesBtn>
      {/* <VolumeOffContainer fontSize="large">
        <VolumeOffIcon
          onClick={stopSound}
          style={{ width: "5rem", height: "5rem", cursor: "pointer" }}
        />
      </VolumeOffContainer> */}
      {/* <Img src={l} alt="main logo" /> */}
      {/* <VolumeUpContainer fontSize="large">
        <VolumeUpIcon
          onClick={playSound}
          style={{ width: "5rem", height: "5rem", cursor: "pointer" }}
        />
      </VolumeUpContainer> */}
      {/* <Cards>
        <Card>
          <CardImg src={require("../images/squirtle-lobby.png").default} />
          <CreateBtn onClick={() => handleClick("create")}>Create</CreateBtn>
        </Card>
        <Card>
          <CardImg src={require("../images/charmander-lobby.png").default} />
          <JoinBtn onClick={() => handleClick("join")}>Join</JoinBtn>
        </Card>
        <Card>
          <CardImg src={require("../images/balbazor-lobby.png").default} />
          <RulesBtn onClick={() => handleClick("rules")}>Rules</RulesBtn>
        </Card>
      </Cards> */}
      {/* <Buttons>
        <Button onClick={() => handleClick("create")}>Create Game</Button>
        <Button onClick={() => handleClick("join")}>Join Game</Button>
        <Button onClick={() => handleClick("rules")}>Rules</Button>
        <Button onClick={() => handleClick("about")}>About</Button>
      </Buttons> */}
      {/* <Footer /> */}
    </Container>
  );
};

export default Lobby;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-image: url(${bgImg});
  height: 100vh;
  /* background-color: #f6f6f6; */
  background-size: cover;
`;

const Img = styled.img`
  width: 100%;
  flex: 0 0 40%;
`;

const Buttons = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Cards = styled.div`
  display: flex;
  /* flex: 1; */
  padding: 1rem;
  padding-bottom: 3rem;
  justify-content: center;
  align-items: flex-end;
  /* background-color: #f6f6f6; */

  /* margin-left: 0.3rem; */
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30%;
  &:not(:last-child) {
    margin-right: 1.5rem;
  }
`;

const CardImg = styled.img`
  width: 7rem;
  height: 8rem;
  margin-bottom: -1rem;
`;
const Button = styled.button`
  @import url("https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap");
  font-family: "Josefin Sans", sans-serif;
  padding: 1rem 4rem;
  font-size: 3rem;
  background-color: rgba(256, 256, 256, 0.6);
  position: absolute;
  border: none;
  text-transform: uppercase;
`;
const CreateBtn = styled(Button)`
  /* top: 14.8rem; */
  top: 21%;
  left: 0;

  transform: rotate(15deg) translateX(60%);
`;

const JoinBtn = styled(Button)`
  /* top: 47.5rem; */
  top: 68%;

  left: 0;

  transform: rotate(-26deg) translateX(80%);
`;

const RulesBtn = styled(Button)`
  bottom: 1rem;
  left: 1rem;
`;
// const Button = styled.button`
//   @import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300&display=swap");
//   font-family: "Josefin Sans", sans-serif;

//   height: 10rem;
//   font-size: 2rem;
//   padding: 1rem;
//   border: none;
//   width: 100%;
//   text-transform: uppercase;
//   box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
//   /* &:not(:last-child) {
//     border-right: 0.5rem solid black;
//   } */
//   border-radius: 3px;
// `;

// const CreateBtn = styled(Button)`
//   background-image: radial-gradient(#4e9496, #12585a);
// `;
// const JoinBtn = styled(Button)`
//   background-image: radial-gradient(#feb980, #f2700e);
//   /* background-color: #eb7619; */
// `;
// const RulesBtn = styled(Button)`
//   background-image: radial-gradient(#68a569, #1b581c);
// `;
// const Button = styled.button`
//   border: none;
//   font-size: 2.8rem;
//   font-family: inherit;
//   text-transform: uppercase;
//   padding: 1rem 2rem;
//   height: 25%;
//   /*
//   &:nth-child(2n + 1) {
//     background-color: #f78d3e;
//   }
//   &:nth-child(2n) {
//     background-color: #83c9d5;
//   }
//   &:nth-child(3n) {
//     background-color: #81cbb1;
//   } */

//   &:nth-child(2n) {
//     background-color: #c6de83;
//   }
//   &:nth-child(2n + 1) {
//     background-color: #a5ce21;
//   }
// `;

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
