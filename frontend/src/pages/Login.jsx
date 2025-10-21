import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { Eye, EyeOff } from "lucide-react";
import { useContentStore } from "../stores/contentStore.js";
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStores.js';
import Footer from "../components/Footer.jsx";

const validateEmailFormat = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const Login = () => {
  const { language, fetchContent, content } = useContentStore();
  const navigate = useNavigate();
  const { login, loading, error, isAuthenticated } = useAuthStore();
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
          fetchContent("login");
  }, [language])
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/pricelist', { replace: true });
      console.log("authenticated");
    }
  }, [isAuthenticated, navigate]);

 

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    let valid = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!validateEmailFormat(email.trim())) {
      setEmailError("Please enter a valid email address");
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    }

    if (!valid) {
      return; 
    }

    try {
      await login(email, password);
    } catch (err) {
      console.error('Login error:', err);
  
    }
  };

  const handleEmailFocus = () => setEmailError("");
  const handlePasswordFocus = () => setPasswordError("");

  return (
    <div className="login-container">
      <h1 className="login-head">{content?.login?.title || 'Log in'}
        {error && (
          <p className="error-text" role="alert" style={{ marginBottom: '1rem' }}>
            {error}
          </p>)}
      </h1>

      <form noValidate autoComplete="off" className="form-container" onSubmit={handleSubmit} >
        <label htmlFor="email">{content?.login?.username || 'Enter your email address'}</label>
        <div className="password-container">
          <input
            id="email"
            className={`password-input ${emailError ? "input-error" : ""}`}
            type="text"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={handleEmailFocus}
            aria-invalid={emailError ? "true" : "false"}
            aria-describedby={emailError ? "email-error" : undefined}
          />
        </div>
        {emailError && (
          <p id="email-error" className="error-text" role="alert">
            {emailError}
          </p>
        )}

        <label htmlFor="password">{content?.login?.password || 'Enter your password'}</label>
        <div className="password-container">
          <input
            id="password"
            className={`password-input ${passwordError ? "input-error" : ""}`}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={handlePasswordFocus}
            aria-invalid={passwordError ? "true" : "false"}
            aria-describedby={passwordError ? "password-error" : undefined}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {passwordError && (
          <p id="password-error" className="error-text" role="alert">
            {passwordError}
          </p>
        )}

        <button className="submit" type="submit" disabled={loading}>
          {loading ? 'Loading...' : (content?.login?.submit || 'Log in')}
        </button>
      </form>

      <div className="login-bottom">
        <label>{content?.login?.register || 'Register'}</label>
        <label>{content?.login?.forget || 'Forgotten password?'}</label>
      </div>

      <Footer/>
    </div>
  );
};

export default Login;
