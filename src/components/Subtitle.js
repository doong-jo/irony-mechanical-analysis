import React, { useState } from "react";
import { Dom } from "react-three-fiber";
import musicPlayer from "../utils/musicPlayer";

function Subtitle() {
  const [subtitle, setSubtitle] = useState("");
  musicPlayer.setSubTitleDispatcher(setSubtitle);

  return (
    <Dom position={[2000, -1900, 100]}>
      <h1>{subtitle}</h1>
    </Dom>
  );
}

export default Subtitle;
