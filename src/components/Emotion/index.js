import React, { useState } from "react";

import * as S from "./style";
import sceneController from "../../utils/sceneController";

function Emotion({ position }) {
  const [emotion, setEmotion] = useState("");
  sceneController.setEmotionDispatcher(setEmotion);

  function getRotation(currentEmotion) {
    if (currentEmotion.startsWith("sad")) {
      return "0deg";
    } else if (currentEmotion.startsWith("angry")) {
      return "36deg";
    } else if (currentEmotion.startsWith("surprise")) {
      return "72deg";
    } else if (currentEmotion.startsWith("calm")) {
      return "108deg";
    } else if (currentEmotion.startsWith("anticipated")) {
      return "144deg";
    } else if (currentEmotion.startsWith("happy")) {
      return "180deg";
    }
  }

  return (
    <S.Wrapper rotation={getRotation(emotion)} position={position}>
      👈
    </S.Wrapper>
  );
}

export default Emotion;
