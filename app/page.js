'use client'

import { useState } from 'react'

export default function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function login() {
    const req = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })

    const res = await req.json()

    if (res.token) {
      localStorage.setItem('token', res.token)
      alert('Login berhasil')
      window.location.href = '/dashboard'
    } else {
      alert(res.message)
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>VSL POS Login</h1>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={login}>
        Login
      </button>
    </div>
  )
}