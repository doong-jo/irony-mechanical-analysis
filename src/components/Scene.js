import * as THREE from "three";
import React, { useState, useEffect } from "react";
import { useTransition, useSpring, animated as a } from "react-spring/three";

import Shape from "./Shape";
import SceneController from "../utils/sceneController";
import { colors } from "../constants/arrays";
import { paths } from "../utils/svg";

function Scene() {
  const [page, setPage] = useState(0);
  const [shapes, setShapes] = useState([]);

  SceneController.setPageDispatcher(setPage);
  useEffect(() => void paths[page].then(setShapes), [page]);

  const { color } = useSpring({ color: colors[page] });
  const transitions = useTransition(shapes, item => item.shape.uuid, {
    from: {
      rotation: [0.0, -Math.PI / 4, 0],
      position: [0, 50, -200],
      opacity: 0
    },
    enter: { rotation: [0, 0, 0], position: [0, 0, 0], opacity: 1 },
    leave: { rotation: [0, 0.25, 0], position: [0, -50, 10], opacity: 0 },
    order: ["leave", "enter", "update"],
    trail: 5,
    lazy: true
  });
  return (
    <>
      <mesh
        scale={[20000, 20000, 1]}
        rotation={[0, THREE.Math.degToRad(-20), 0]}
      >
        <planeGeometry attach="geometry" args={[1, 1]} />
        <a.meshPhongMaterial
          attach="material"
          color={color}
          depthTest={false}
        />
      </mesh>
      <group
        position={[1600, -700, page]}
        rotation={[0, THREE.Math.degToRad(180), 0]}
      >
        {transitions.map(({ item, key, props }) => (
          <Shape key={key} {...item} {...props} />
        ))}
      </group>
    </>
  );
}

export default Scene;
