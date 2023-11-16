import { useEffect, useRef, useState } from "react"

const Player = ({player, userData, color, position}) => {
  const playerRef = useRef(null)
  if(player.id === userData.id) playerRef.current = player.id

  return (
    <mesh position={position}>
        <boxGeometry args={[1, 1, 1]}/>
        <meshLambertMaterial attach="material" color={color || 'blue'}/>
    </mesh>
  )
}

export default Player