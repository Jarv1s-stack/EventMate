import React, { useState, useContext } from "react";
import styles from "./CreateEvent.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function CreateEvent() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setInfo("");
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, date })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Ошибка создания события");
      setInfo("Событие успешно создано!");
      setTimeout(() => navigate("/"), 1200);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Создать событие</h2>
        <label>
          Название
          <input
            type="text"
            required
            minLength={3}
            maxLength={70}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Встреча, турнир, семинар..."
          />
        </label>
        <label>
          Описание
          <textarea
            required
            minLength={5}
            maxLength={500}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Кратко опишите событие"
          />
        </label>
        <label>
          Дата и время начала
          <input
            type="datetime-local"
            required
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </label>
        {error && <div className={styles.error}>{error}</div>}
        {info && <div className={styles.info}>{info}</div>}
        <button type="submit" className={styles.submitBtn}>Создать</button>
      </form>
    </div>
  );
}
