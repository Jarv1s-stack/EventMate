import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import ChatBox from "../components/ChatBox";

export default function EventDetail() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joinStatus, setJoinStatus] = useState("");


  const fetchEvent = () => {
    setLoading(true);
    api.get(`/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEvent();

  }, [id]);


  const handleJoin = async () => {
    setJoinStatus("");
    try {
      await api.post(`/events/${id}/join`);
      setJoinStatus("Успешно присоединились к событию!");
      fetchEvent();
    } catch (error) {
      if (error.response?.status === 409) {
        setJoinStatus("Вы уже участвуете в этом событии.");
      } else if (error.response?.status === 403) {
        setJoinStatus("Недостаточно прав. Авторизуйтесь или присоединитесь к событию.");
      } else {
        setJoinStatus("Ошибка при присоединении. Попробуйте позже.");
      }
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (!event) return <div>Событие не найдено.</div>;

  return (
    <div style={{
      maxWidth: 600,
      margin: "0 auto",
      background: "var(--bg, #fff)",
      borderRadius: 16,
      padding: 24,
      boxShadow: "0 4px 24px #0001"
    }}>
      <h2 style={{ marginBottom: 12 }}>{event.title}</h2>
      <p style={{ color: "#666", marginBottom: 20 }}>{event.description}</p>
      <div style={{ marginBottom: 16, fontSize: 15, color: "#999" }}>
        Дата: {new Date(event.date).toLocaleString()}
      </div>
      <div style={{ marginBottom: 16 }}>
        <b>Участники ({(event.participants ?? []).length}):</b>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {(event.participants ?? []).map(p => (
            <li key={p.id}>{p.username}</li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleJoin}
        style={{
          padding: "10px 22px",
          borderRadius: 10,
          border: "none",
          background: "var(--accent, #444cf7)",
          color: "#fff",
          fontWeight: 500,
          cursor: "pointer",
          marginBottom: 18
        }}
      >
        Присоединиться
      </button>

      {joinStatus && (
        <div style={{
          marginBottom: 18,
          color: joinStatus.startsWith("Успешно") ? "green" : "#cc2222"
        }}>
          {joinStatus}
        </div>
      )}


      <div style={{ marginTop: 30 }}>
        <ChatBox eventId={id} />
      </div>
    </div>
  );
}
