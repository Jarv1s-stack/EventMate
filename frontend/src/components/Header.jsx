import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import { AuthContext } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/logo.svg";
import home from "../assets/home.svg";
import profile from "../assets/profile.svg";
import search from "../assets/searchIcon.svg";
import createEvent from "../assets/createEvent.svg";
import shop from "../assets/shop.svg"; 
import lightIcon from "../assets/light.svg";
import darkIcon from "../assets/dark.svg";

export default function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className={styles["header-left"]} onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className={styles.logoImg} height={36} />
        <span className={styles.logoText}>EventMate</span>
      </div>
      <nav className={styles["nav"]}>
        <button
          className={`${styles.navBtn} ${isActive("/") ? styles.active : ""}`}
          onClick={() => navigate("/")}
          title="Главная"
        >
          <img src={home} alt="Home" height={28} />
        </button>
        <button
          className={`${styles.navBtn} ${isActive("/create-event") ? styles.active : ""}`}
          onClick={() => navigate("/create-event")}
          title="Создать событие"
        >
          <img src={createEvent} alt="Create Event" height={28} />
        </button>
        <button
          className={`${styles.navBtn} ${isActive("/shop") ? styles.active : ""}`}
          onClick={() => navigate("/shop")}
          title="Магазин"
        >
         <img src={shop} alt="shop" height={28}/>
        </button>
      </nav>
      <form className={styles["searchBox"]} onSubmit={e => { e.preventDefault(); }}>
        <input type="text" className={styles.searchInput}  placeholder="Поиск событий..."/>
        <button className={styles.searchBtn} type="submit" title="Поиск">
          <img src={search} alt="Search" height={22} />
        </button>
      </form>
      <div className={styles["header-actions"]}>
        <button
          className={`${styles.profileBtn} ${isActive("/profile") ? styles.active : ""}`}
          onClick={() => navigate("/profile")}
          title="Профиль"
        >
          <img src={profile} alt="Profile" height={28} />
          <span className={styles.pointsBadge}>
            {user ? user.points : 0}
          </span>
        </button>
        <ThemeToggle/>
      </div>
    </header>
  );
}
