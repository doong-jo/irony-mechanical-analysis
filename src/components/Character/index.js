import React, { useState } from "react";
import SpriteAnimator from "react-sprite-animator";

import * as S from "./style";
import sceneController from "../../utils/sceneController";

function Character({ position }) {
  const [emotion, setEmotion] = useState();
  sceneController.setCharDispatcher(setEmotion);

  return (
    <S.Wrapper position={position}>
      <SpriteAnimator
        width={36}
        height={36}
        sprite={`images/sprite/${emotion}.svg`}
        shouldAnimate={true}
        fps={60}
        startFrame={0}
        stopLastFrame={false}
      />
    </S.Wrapper>
  );
}

export default Character;
