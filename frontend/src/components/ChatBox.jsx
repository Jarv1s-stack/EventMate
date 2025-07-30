import { useEffect, useState, useRef } from "react";
import api from "../utils/api";

export default function ChatBox({ eventId }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const bottomRef = useRef();

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line
  }, [eventId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/messages/${eventId}`);
      setMessages(res.data);
    } catch {
      setMessages([]);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      await api.post(`/messages/${eventId}`, { content });
      setContent("");
      fetchMessages();
    } catch {}
  };

  return (
    <div className="chatbox">
      <div className="messages" style={{ maxHeight: 300, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={m.id || i} className="msg">
            <b>{m.username || "User"}: </b>
            <span>{m.content}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={sendMessage} className="chat-form" style={{ display: "flex", gap: 8 }}>
        <input
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Ваше сообщение..."
          maxLength={500}
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}
