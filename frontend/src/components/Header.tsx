"use client"

import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import styles from "../styles/Header.module.css"

const Header: React.FC = () => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path

  const navItems = [
    { path: "/", label: "Главная", icon: "🏠" },
    { path: "/machines", label: "Машины", icon: "🚛" },
    { path: "/maintenance", label: "ТО", icon: "🔧" },
    { path: "/complaints", label: "Рекламации", icon: "📋" },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Logo */}
          <Link to="/" className={styles.logoLink}>
            <div className={styles.logoContainer}>
              <img src="/public/images/Logo1.jpg" alt="Силант" className={styles.logo} />
            </div>
            <div className={styles.logoText}>
              <h1 className={styles.logoTitle}>СИЛАНТ</h1>
              <p className={styles.logoSubtitle}>Чебоксарский завод</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.nav}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.navLink} ${isActive(item.path) ? styles.navLinkActive : styles.navLinkInactive}`}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button className={styles.mobileMenuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            <nav className={styles.mobileNav}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${styles.mobileNavLink} ${
                    isActive(item.path) ? styles.mobileNavLinkActive : styles.mobileNavLinkInactive
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
