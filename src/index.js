// Illustrations @ Tina Henschel: https://www.instagram.com/tina.henschel

import * as THREE from "three";
import ReactDOM from "react-dom";
import React from "react";
import { Canvas } from "react-three-fiber";

import Scene from "./components/Scene";
import { requestGoogleNlpApi } from "./utils/googleApi";

import "./styles.css";
import { NLP_EMOTION } from "./constants/string";

/** Main component */
function App() {
  (async function test() {
    const result = await requestGoogleNlpApi("i am sad", NLP_EMOTION);
    console.log(result);
  })();

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
      <Scene />
    </Canvas>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
