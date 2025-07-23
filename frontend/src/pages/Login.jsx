import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Ошибка входа");
      login(data.user, data.token);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className={styles.loginWrapper}>
<form className={styles.loginBox} onSubmit={handleLogin}>
        <h2>Вход</h2>
        <label>
          Email
          <input
            type="email"
            autoFocus
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </label>
        <label>
          Пароль
          <div className={styles.passwordField}>
            <input
              type={showPass ? "text" : "password"}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <button
              type="button"
              className={styles.showPass}
              onClick={() => setShowPass(v => !v)}
              tabIndex={-1}
            >
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>
        </label>
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" className={styles.loginBtn}>Войти</button>
        <div className={styles.registerLink}>
          Нет аккаунта? <a href="/register">Зарегистрироваться</a>
        </div>
      </form>
    </div>
  );
}
