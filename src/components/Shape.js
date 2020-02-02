import * as THREE from "three";
import React from "react";
import { animated as a } from "react-spring/three";

function Shape({ shape, rotation, position, color, opacity, index }) {
  return (
    <a.mesh
      rotation={rotation}
      position={position.interpolate((x, y, z) => [x, y, z + -index * 50])}
    >
      <a.meshPhongMaterial
        attach="material"
        color={color}
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
        transparent
      />
      <shapeBufferGeometry attach="geometry" args={[shape]} />
    </a.mesh>
  );
}

export default Shape;
