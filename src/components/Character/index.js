import React from "react";
import SpriteAnimator from "react-sprite-animator";

import * as S from "./style";

function Character({ position }) {
  const ref = React.createRef();

  return (
    <S.Wrapper position={position}>
      <SpriteAnimator
        ref={ref}
        width={36}
        height={36}
        sprite="images/sprite/heart.svg"
        shouldAnimate={true}
        fps={60}
        startFrame={0}
        stopLastFrame={false}
      />
    </S.Wrapper>
  );
}

export default Character;
