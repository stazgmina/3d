'use client'

import Link from "next/link"
import Login from "./components/Login"
import { useState } from "react"

const Page = () => {
  const [mode, setMode] = useState("login")
  return (
    <div>
      {mode === "login" && <Login mode="login" setMode={setMode}/>}
      {mode === "register" && <Login mode="register" setMode={setMode}/>}
    </div>
  )
}

export default Page