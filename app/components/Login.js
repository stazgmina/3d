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
    .then(res => {
      if(!res.ok){
        return res.json()
        .then(error => setError(error))
        .finally(console.log(error))
      }else{
        return res.json()
        .then(user => {
          if(mode === 'register'){
            console.log(user)
            setMode('login')
          }
          if(mode === 'login'){
            console.log(user)
            setUserData(user)
            setMode('game')
          }
        })
      }
    })
  }

  return (
    <main className="grid w-screen h-screen place-content-center">
    <form className="flex flex-col gap-4 p-4 rounded-md bg-slate-400">
      <input onChange={e=>setEmail(e.target.value)}  className="p-2 text-black rounded-md" type="text" placeholder="E-mail"/>
      {error.errors && <p className="text-red-500 text-sm">{error.errors.email[0]}</p>}
      {error.message && <p className="text-red-500 text-sm">{error.message}</p>}
      <input onChange={e=>setPassword(e.target.value)}  className="p-2 text-black rounded-md" type="password" placeholder="Password"/>
      {error.errors && <p className="text-red-500 text-sm">{error.errors.password[0]}</p>}
      {mode === "register" && (
        <>
            <input onChange={e=>setNickname(e.target.value)}  className="p-2 text-black rounded-md" type="text" placeholder="Nickname"/>
            {error.errors && <p className="text-red-500 text-sm">{error.errors.nickname[0]}</p>}
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