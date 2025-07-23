import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (avatar) formData.append("avatar", avatar);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: formData // НЕ ставим Content-Type вручную!
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Ошибка регистрации");
      login(data.user, data.token);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleRegister}>
        <h1>Регистрация</h1>

        <label>
          Ник
          <input
            type="text"
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Ваш ник"
            autoFocus
          />
        </label>

        <label>
          Email
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </label>

        <label>
          Пароль
          <div className={styles.passWrapper}>
            <input
              type={showPass ? "text" : "password"}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••"
            />
            <button
              type="button"
              className={styles.showBtn}
              onClick={() => setShowPass(p => !p)}
              tabIndex={-1}
            >
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>
        </label>

        <label>
          Фото профиля
          <input
            type="file"
            accept="image/*"
            onChange={e => setAvatar(e.target.files[0])}
          />
        </label>

        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" className={styles.registerBtn}>Создать аккаунт</button>
        <div className={styles.loginLink}>
          Уже есть аккаунт? <a href="/login">Войти</a>
        </div>
      </form>
    </div>
  );
}
