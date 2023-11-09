'use client'

import Link from "next/link"
import Login from "./components/Login"
import { useState } from "react"
import { Canvas } from "@react-three/fiber"

const Page = () => {
  const [mode, setMode] = useState("game") // default login
  const [userData, setUserData] = useState('game') // default ""

  function Box(props){
    return(
      <mesh {...props}>
        <boxGeometry args={[1, 1, 1]}/>
        <meshLambertMaterial attach="material" color="hotpink"/>
      </mesh>
    )
  }

  return (
    <div>
      {mode === "login" && <Login mode="login" setMode={setMode} setUserData={setUserData}/>}
      {mode === "register" && <Login mode="register" setMode={setMode}/>}
      {(userData && mode === 'game') && (
        <div className="absolute top-0 left-0 grid w-screen h-screen place-items-center">
          <Canvas>
            <Box position={[-1.2, 0, 0]}></Box>
            <Box position={[1.2, 0, 0]}></Box>
          </Canvas>
        </div>
      )}
    </div>
  )
}

export default Page