import { useEffect, useRef, useState } from "react"

const Player = ({player, userData, color, position, socket}) => {
  const playerRef = useRef(null)
  if(player.id === userData) playerRef.current = player

  console.log(`======> player: ${player}`)
  console.log(`======> playerJSONstring: ${JSON.stringify(player)}`)
  console.log(`playerRef: ${playerRef.current}`)
  console.log(`playerId: ${player.id}`)
  console.log(`userDataId: ${userData}`)

  useEffect(()=>{
    const handleKey = e => {
        console.log(`handleKey: ${e.key}`)
        if(player.id === userData){
            switch(e.key){
                case 'ArrowUp':
                    playerRef.current.position[2] += 2
                    console.log(`playerRefPosition: ${playerRef.current.position}`)
                    socket.emit('updatePos', { id: userData, position: playerRef.current.position })
                break
            default:
                break
            }
        }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  return (
    <mesh position={position}>
        <boxGeometry args={[1, 1, 1]}/>
        <meshLambertMaterial attach="material" color={color || 'blue'}/>
    </mesh>
  )
}

export default Player