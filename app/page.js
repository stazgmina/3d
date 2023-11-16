'use client'
import { useEffect, useState } from "react"

import { io } from "socket.io-client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sky } from "@react-three/drei"

import Login from "../components/Login"

const Page = () => {
  const [mode, setMode] = useState("login") // default login
  const [userData, setUserData] = useState('') // default ""
  const [players, setPlayers] = useState([])
  const [tab, setTab] = useState(false)

  const socket = io('http://localhost:3003')

  useEffect(()=>{
    if(mode === "game" && userData){
      console.log(userData)
      socket.emit("login", JSON.stringify({
        id: userData.rest.id,
        nick: userData.rest.nickname,
        color: userData.rest.settings.color
      }))
    } 
    socket.on('update', players => setPlayers(players))

    return () => {
      socket.disconnect()
    }
  },[mode])

  const handleKeyDown = e => {
    if(e.key === "Tab") setTab(!tab)
    console.log(tab)
  }

  function Box(props){
    return(
      <mesh {...props}>
        <boxGeometry args={[1, 1, 1]}/>
        <meshLambertMaterial attach="material" color={props.color || 'blue'}/>
      </mesh>
    )
  }

  return (
    <div tabIndex="0" onKeyDown={handleKeyDown}>
      {mode === "login" && <Login mode="login" setMode={setMode} setUserData={setUserData}/>}
      {mode === "register" && <Login mode="register" setMode={setMode}/>}
      {(userData && userData != null && mode === 'game') && (
        <div className="absolute top-0 left-0 grid w-screen h-screen place-items-center">
            {players && tab ? (
              <div className="absolute z-10 top-5 left-5 bg-black/25 p-2">
                {players.map(player => (
                  <p key={player.id} style={{color: player.color}}>{player.id}: {player.nick}</p>
                ))}
              </div>
            ):''}
          <Canvas className="z-0">
            <OrbitControls/>
            <Sky sunPosition={[100,100,20]}/>
            <ambientLight intensity={0.5}/>
            {/* <Box color={userData?.rest?.settings.color || 'red'} position={[0, 0, 0]}/>
            <Box position={[1.2, 0, 0]}/> */}
            {players && players.map((player, index) => (
              <Box key={index} color={player.color || 'yellow'} position={[index*1.5,0,0]} />
            ))}
          </Canvas>
        </div>
      )}
    </div>
  )
}

export default Page