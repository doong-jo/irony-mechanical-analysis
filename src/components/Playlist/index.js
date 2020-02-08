import React, { useState } from "react";

import * as S from "./style";
import musicPlayer from "../../utils/musicPlayer";

function Playlist({ currentPlayIndex, list, position }) {
  const [playIndex, setPlayIndex] = useState(currentPlayIndex);
  musicPlayer.setPlayIndexDispatcher(setPlayIndex);

  return (
    <S.Container position={position}>
      {list.map((songName, index) => (
        <S.SongWrapper
          currentPlayIndex={index === playIndex}
          key={`${songName}_${index}`}
          onClick={() => {
            musicPlayer.playByIndex(index);
          }}
        >
          {songName}
        </S.SongWrapper>
      ))}
    </S.Container>
  );
}

export default Playlist;
