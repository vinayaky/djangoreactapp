import React, { useState } from "react"
import { Navigate, BrowserRouter as Router,Route,Routes } from "react-router-dom"

const Login = props => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)

  const submit = async e => {
    e.preventDefault()

    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password
      })
    })

    const content = await response.json()

    setRedirect(true)
    props.setName(content.name)
  }

  if (redirect) {
    return <Router><Routes>
      <Route path="*" element={<Navigate to="/" />}></Route>
    </Routes>
      </Router>
  }

  return (
    <form onSubmit={submit}>
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
      <input
        type="email"
        className="form-control"
        placeholder="Email address"
        required
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control"
        placeholder="Password"
        required
        onChange={e => setPassword(e.target.value)}
      />

      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Sign in
      </button>
    </form>
  )
}

export default Login
