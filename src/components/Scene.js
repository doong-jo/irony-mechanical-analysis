import * as THREE from "three";
import React, { useState, useEffect } from "react";
import { useTransition, useSpring, animated as a } from "react-spring/three";

import Shape from "./Shape";
import { colors } from "../constants/arrays";
import { paths } from "../utils/svg";

function Scene() {
  const [page, setPage] = useState(0);
  const [shapes, setShapes] = useState([]);
  // Switches scenes every 4 seconds
  useEffect(
    () => void setInterval(() => setPage(i => (i + 1) % paths.length), 3500),
    []
  );
  // Converts current SVG into mesh-shapes: https://threejs.org/docs/index.html#examples/loaders/SVGLoader
  useEffect(() => void paths[page].then(setShapes), [page]);
  // This spring controls the background color animation
  const { color } = useSpring({ color: colors[page] });
  // This one is like a transition group, but instead of handling div's it mounts/unmounts meshes in a fancy way
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
