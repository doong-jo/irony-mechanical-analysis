import React, { useState } from "react";

import * as S from "./style";
import sceneController from "../../utils/sceneController";

function Emotion({ position }) {
  const [emotion, setEmotion] = useState("");
  sceneController.setEmotionDispatcher(setEmotion);

  return <S.Wrapper position={position}>{emotion}</S.Wrapper>;
}

export default Emotion;
