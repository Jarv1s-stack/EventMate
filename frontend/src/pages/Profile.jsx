import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Получаем из контекста функцию logout
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (!user) {
    return (
      <div
        style={{
          maxWidth: 480,
          margin: "40px auto",
          padding: "20px",
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 6px 32px #0001",
        }}
      >
        <h1>Вы не авторизованы</h1>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "40px auto",
        padding: "20px",
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 6px 32px #0001",
      }}
    >
      <h1 style={{ marginBottom: 24 }}>Профиль</h1>

      {user.avatar && (
        <img
          src={`http://localhost:5000${user.avatar}`}
          alt="avatar"
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: 16,
          }}
        />
      )}

      <div style={{ marginBottom: 16 }}>
        <strong>Имя:</strong> {user.username}
      </div>
      <div style={{ marginBottom: 16 }}>
        <strong>Email:</strong> {user.email}
      </div>
      <div style={{ marginBottom: 16 }}>
        <strong>Points:</strong> {user.points}
      </div>

      {/* Кнопка выхода */}
      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
        style={{
          marginTop: 16,
          padding: "8px 16px",
          background: "#f53d3d",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Выйти
      </button>
    </div>
  );
}
