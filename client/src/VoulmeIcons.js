import React, { useContext } from "react";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { AudioContext } from "./audio-context";
import styled, { css } from "styled-components";

const VoulmeIcons = ({ type }) => {
  const { stopSound, playSound, stopBattleSound, playBattleSound } = useContext(
    AudioContext
  );

  return (
    <>
      <VolumeOffContainer type={type}>
        <VolumeOffIcon
          onClick={type ? stopBattleSound : stopSound}
          style={{ width: "100%", height: "100%" }}
        />
      </VolumeOffContainer>

      <VolumeOnContainer type={type}>
        <VolumeUpIcon
          onClick={type ? playBattleSound : playSound}
          style={{ width: "100%", height: "100%" }}
        />
      </VolumeOnContainer>
    </>
  );
};

export default VoulmeIcons;

const VolumeOffContainer = styled.div`
  position: absolute;
  ${({ type }) =>
    type
      ? css`
          bottom: 0.2rem;
          left: 3.2rem;
          width: 3rem;
          height: 3rem;
        `
      : css`
          top: 0;
          right: 0.2rem;
          width: 5rem;
          height: 5rem;
        `}
`;
const VolumeOnContainer = styled.div`
  position: absolute;
  ${({ type }) =>
    type
      ? css`
          bottom: 0.2rem;
          left: 0.2rem;
          width: 3rem;
          height: 3rem;
        `
      : css`
          top: 0;
          left: 0.2rem;
          width: 5rem;
          height: 5rem;
        `}
`;
