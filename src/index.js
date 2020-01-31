// Illustrations @ Tina Henschel: https://www.instagram.com/tina.henschel

import * as THREE from 'three'
import { SVGLoader as loader } from 'three/examples/jsm/loaders/SVGLoader'
import flatten from 'lodash-es/flatten'
import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
// A React renderer for Three-js: https://github.com/drcmda/react-three-fiber
import { Canvas } from 'react-three-fiber'
// A React x-platform animation library: https://github.com/react-spring/react-spring
import { useTransition, useSpring, animated as a } from 'react-spring/three'
import './styles.css'

const colors = ['#21242d', '#ea5158', '#0d4663', '#ffbcb7', '#2d4a3e', '#8bd8d2']
const svgs = ['night', 'city', 'morning', 'tubes', 'woods', 'beach']
  .map(name => `https://raw.githubusercontent.com/drcmda/react-three-fiber/master/examples/src/resources/images/svg/${name}.svg`)
  .map(
    url =>
      new Promise(resolve =>
        new loader().load(url, shapes =>
          resolve(flatten(shapes.paths.map((group, index) => group.toShapes(true).map(shape => ({ shape, color: group.color, index })))))
        )
      )
  )

/** This component renders a shape */
function Shape({ shape, rotation, position, color, opacity, index }) {
  return (
    <a.mesh rotation={rotation} position={position.interpolate((x, y, z) => [x, y, z + -index * 50])}>
      <a.meshPhongMaterial attach="material" color={color} opacity={opacity} side={THREE.DoubleSide} depthWrite={false} transparent />
      <shapeBufferGeometry attach="geometry" args={[shape]} />
    </a.mesh>
  )
}

/** This component sets up a background plane and transitions a group of shapes */
function Scene() {
  const [page, setPage] = useState(0)
  const [shapes, setShapes] = useState([])
  // Switches scenes every 4 seconds
  useEffect(() => void setInterval(() => setPage(i => (i + 1) % svgs.length), 3500), [])
  // Converts current SVG into mesh-shapes: https://threejs.org/docs/index.html#examples/loaders/SVGLoader
  useEffect(() => void svgs[page].then(setShapes), [page])
  // This spring controls the background color animation
  const { color } = useSpring({ color: colors[page] })
  // This one is like a transition group, but instead of handling div's it mounts/unmounts meshes in a fancy way
  const transitions = useTransition(shapes, item => item.shape.uuid, {
    from: { rotation: [0.0, -Math.PI / 4, 0], position: [0, 50, -200], opacity: 0 },
    enter: { rotation: [0, 0, 0], position: [0, 0, 0], opacity: 1 },
    leave: { rotation: [0, 0.25, 0], position: [0, -50, 10], opacity: 0 },
    order: ['leave', 'enter', 'update'],
    trail: 5,
    lazy: true
  })
  return (
    <>
      <mesh scale={[20000, 20000, 1]} rotation={[0, THREE.Math.degToRad(-20), 0]}>
        <planeGeometry attach="geometry" args={[1, 1]} />
        <a.meshPhongMaterial attach="material" color={color} depthTest={false} />
      </mesh>
      <group position={[1600, -700, page]} rotation={[0, THREE.Math.degToRad(180), 0]}>
        {transitions.map(({ item, key, props }) => (
          <Shape key={key} {...item} {...props} />
        ))}
      </group>
    </>
  )
}

/** Main component */
function App() {
  return (
    <Canvas
      concurrent
      camera={{
        fov: 80,
        position: [0, 0, 2000],
        rotation: [0, THREE.Math.degToRad(-20), THREE.Math.degToRad(180)],
        near: 0.1,
        far: 20000
      }}>
      <ambientLight intensity={0.5} />
      <spotLight intensity={0.5} position={[300, 300, 4000]} />
      <Scene />
    </Canvas>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
