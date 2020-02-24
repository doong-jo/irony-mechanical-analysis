import React, { useState } from "react";

import * as S from "./style";
import sceneController from "../../utils/sceneController";

function Emotion({ position }) {
  const [emotion, setEmotion] = useState("");
  sceneController.setEmotionDispatcher(setEmotion);

  function getRotation(currentEmotion) {
    if (currentEmotion.startsWith("happy")) {
      return "-90deg";
    } else if (currentEmotion.startsWith("anticipated")) {
      return "-45deg";
    } else if (currentEmotion.startsWith("calm")) {
      return "-20deg";
    } else if (currentEmotion.startsWith("surprise")) {
      return "20deg";
    } else if (currentEmotion.startsWith("sad")) {
      return "45deg";
    } else if (currentEmotion.startsWith("angry")) {
      return "90deg";
    } else {
      console.log('0deg', currentEmotion);
    }
  }

  return (
    <div style={{ position: 'fixed', left: position.left, top: position.top, transform: 'translate(70px, -30px)' }}>
      <S.Wrapper position={position}>
        <img style={{ width: '300px', height: '200px', transform: "translate(-130px, -100px)"}} src='./images/emotion/emotion-diagram.png' alt='emotion-diagram' />
      </S.Wrapper>
      <S.Wrapper rotation={getRotation(emotion)} position={position}>
        <img style={{ transformOrigin: "50% 100%", width: '50px', height: '100px'}} src='./images/emotion/needle.png' alt='emotion-diagram' />
      </S.Wrapper>
    </div>
  );
}

export default Emotion;
