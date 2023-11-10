'use client'
import { useState } from "react"

const Login = ({mode, setMode, setUserData}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nickname, setNickname] = useState("")
  const [chColor, setChColor] = useState("")

  const [error, setError] = useState('')
    
  const handleChangeMode = () => {
    if(mode === "login")setMode("register")
    if(mode === "register")setMode("login")
  }

  const handleSubmit = e => {
    e.preventDefault()
    const body = {
        mode: mode,
        email: email,
        password: password,
        nickname: nickname,
        color: chColor
    }

    fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
        if(mode === 'login'){
            console.log(data)
            setUserData(data)
            setMode("game")
        }
        if(mode === 'register'){
            console.log(data)
            setMode("login")
        }
    }).catch(err => console.log(err))
  }

  return (
    <main className="grid w-screen h-screen place-content-center">
    <form className="flex flex-col gap-4 p-4 rounded-md bg-slate-400">
      <input onChange={e=>setEmail(e.target.value)} required className="p-2 text-black rounded-md" type="text" placeholder="E-mail"/>
      <input onChange={e=>setPassword(e.target.value)} required className="p-2 text-black rounded-md" type="password" placeholder="Password"/>
      {mode === "register" && (
        <>
            <input onChange={e=>setNickname(e.target.value)} required className="p-2 text-black rounded-md" type="text" placeholder="Nickname"/>
            <section className="flex items-center justify-between w-full">
                <p>Character color:</p>
                <input onChange={e=>setChColor(e.target.value)} className="p-2 text-black rounded-md" type="color"/>
            </section>
        </>  
       )}
      <button onClick={e=>handleSubmit(e)} className="p-2 bg-blue-500 rounded-md">
        {mode === 'register' && "Register"}
        {mode === "login" && "Log in"}
      </button>
      <button onClick={handleChangeMode} className="text-sm">
        {mode === 'register' && "Already have an account? Log in"}
        {mode === "login" && "Don't have an account yet? Register"}
      </button>
    </form>
  </main>
  )
}

export default Login