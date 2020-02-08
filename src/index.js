// Illustrations @ Tina Henschel: https://www.instagram.com/tina.henschel

import * as THREE from "three";
import ReactDOM from "react-dom";
import React from "react";
import { Canvas } from "react-three-fiber";

import "./styles.css";
import songs from "./constants/songs";
import musicPlayer from "./utils/musicPlayer";
import { Scene, Subtitle, Playlist, Character } from "./components";

function App() {
  musicPlayer.play();

  return (
    <>
      <Canvas
        concurrent
        camera={{
          fov: 80,
          position: [0, 0, 2000],
          rotation: [0, THREE.Math.degToRad(-20), THREE.Math.degToRad(180)],
          near: 0.1,
          far: 20000
        }}
      >
        <ambientLight intensity={0.1} />
        <spotLight intensity={0.5} position={[300, 300, 4000]} />
        <Subtitle />
        <Scene />
      </Canvas>
      <Playlist currentPlayIndex={0} list={songs.map(song => song.name)} />
      <Character position={{ left: "30%", top: "70%" }} />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
