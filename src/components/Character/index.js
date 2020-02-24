import React, { useState } from "react";
import SpriteAnimator from "react-sprite-animator";

import * as S from "./style";
import sceneController from "../../utils/sceneController";

function Character({ position }) {
  const [emotion, setEmotion] = useState();
  sceneController.setCharDispatcher(setEmotion);

  console.log(emotion);
  return (
    <S.Wrapper position={position}>
      <img style={{ transform: 'translateY(-100px)', width: '200px', height: '300px' }} src={`./images/char/${emotion}.png`} />
    </S.Wrapper>
  );
}

export default Character;
