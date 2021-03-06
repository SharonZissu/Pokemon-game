import React, { createContext, useState, useEffect } from "react";

//sounds
import sound from "../sounds/sound2.mp3";
import battleSound from "../sounds/battle-sound2.mp3";
import warSound from "../sounds/war.mp3";

const AudioContext = createContext();
const { Provider } = AudioContext;

const AudioProvider = ({ children }) => {
  let audioTune = new Audio(sound);
  let battleAudio = new Audio(battleSound);
  let warAudio = new Audio(warSound);
  // const [audioTuneState, setAudioTuneState] = useState(false);

  useEffect(() => {
    audioTune.load();
    battleAudio.load();
  }, []);

  const playSound = () => {
    audioTune.play();
    // setAudioTuneState(true);
  };

  const playBattleSound = () => {
    battleAudio.play();
    battleAudio.loop = true;
  };

  const playWarSound = () => {
    warAudio.play();
  };

  // pause audio sound
  const pauseSound = () => {
    audioTune.pause();
  };

  const pauseBattleSound = () => {
    battleAudio.pause();
  };

  const pauseWarSound = () => {
    warAudio.pause();
  };

  // stop audio sound
  const stopSound = () => {
    audioTune.pause();
    audioTune.currentTime = 0;
    // setAudioTuneState(false);
  };

  const stopBattleSound = () => {
    battleAudio.pause();
    battleAudio.currentTime = 0;
  };

  const stopWarSound = () => {
    warAudio.pause();
    audioTune.currentTime = 0;
  };
  return (
    <Provider
      value={{
        playSound,
        playBattleSound,
        playWarSound,
        pauseSound,
        pauseBattleSound,
        pauseWarSound,
        stopBattleSound,
        stopSound,
        stopWarSound,
      }}
    >
      {children}
    </Provider>
  );
};

export { AudioContext, AudioProvider };
