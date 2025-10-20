import React, { useState } from 'react'
import "../styles/Login.css"
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='login-container'>
      <h1 className='login-head'>Log in</h1>
      <form className='form-container'>
        <label htmlFor="username">Enter your email address</label>
        <div className='password-container'>

        <input className='password-input' type="text" placeholder="Email address" />
        </div>
        <label htmlFor="password">Enter your password</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="password-input"
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button className='submit' type="submit">Login</button>
      </form>
      
    </div>
  )
}

export default Login
