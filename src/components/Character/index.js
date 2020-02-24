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
      <SpriteAnimator
        width={250}
        height={350}
        // sprite={`./images/sprite/${emotion}.svg`}
        sprite={`./images/sprite/angry1.svg`}
        shouldAnimate={true}
        fps={30}
        scale={2}
        startFrame={0}
        stopLastFrame={false}
      />
    </S.Wrapper>
  );
}

export default Character;
