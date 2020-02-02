// Illustrations @ Tina Henschel: https://www.instagram.com/tina.henschel

import * as THREE from "three";
import ReactDOM from "react-dom";
import React from "react";
import { Canvas } from "react-three-fiber";

import Scene from "./components/Scene";
import SubTitle from "./components/Subtitle";

import "./styles.css";
import musicPlayer from "./utils/musicPlayer";

function App() {
  musicPlayer.play();

  return (
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
      <ambientLight intensity={0.5} />
      <spotLight intensity={0.5} position={[300, 300, 4000]} />
      <SubTitle />
      <Scene />
    </Canvas>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
