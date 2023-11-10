'use client'

import Link from "next/link"
import Login from "./components/Login"
import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sky } from "@react-three/drei"

const Page = () => {
  const [mode, setMode] = useState("login") // default login
  const [userData, setUserData] = useState('') // default ""

  function Box(props){
    return(
      <mesh {...props}>
        <boxGeometry args={[1, 1, 1]}/>
        <meshLambertMaterial attach="material" color={props.color || 'blue'}/>
      </mesh>
    )
  }

  return (
    <div>
      {mode === "login" && <Login mode="login" setMode={setMode} setUserData={setUserData}/>}
      {mode === "register" && <Login mode="register" setMode={setMode}/>}
      {(userData && userData != null && mode === 'game') && (
        <div className="absolute top-0 left-0 grid w-screen h-screen place-items-center">
          <Canvas>
            <OrbitControls/>
            <ambientLight intensity={0.5}/>
            <Sky sunPosition={[100,100,20]}/>
            <Box color={userData.color || 'red'} position={[-1.2, 0, 0]}/>
            <Box position={[1.2, 0, 0]}/>
          </Canvas>
        </div>
      )}
    </div>
  )
}

export default Page