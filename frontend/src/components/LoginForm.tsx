"use client"

import type React from "react"
import { useState } from "react"
import { LogIn } from "lucide-react"
import styles from "../styles/LoginForm.module.css"

interface LoginFormProps {
  onLogin: (username: string, password: string) => Promise<void>
  loading: boolean
  error: string | null
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, loading, error }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) return

    try {
      await onLogin(username, password)
    } catch (err) {
      // Ошибка обрабатывается в AuthService
    }
  }

  return (
    <section className={styles.loginSection}>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <LogIn size={32} className={styles.loginIcon} />
            <h2 className={styles.loginTitle}>Вход в систему</h2>
            <p className={styles.loginSubtitle}>Для доступа к полной информации о технике и сервисе</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Логин</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.loginInput}
                placeholder="Введите логин"
                disabled={loading}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.loginInput}
                placeholder="Введите пароль"
                disabled={loading}
              />
            </div>

            {error && (
              <div className={styles.loginError}>
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <button type="submit" disabled={loading} className={styles.loginButton}>
              {loading ? "Вход..." : "Войти в систему"}
            </button>
          </form>

          <div className={styles.loginHelp}>
            <p>Тестовые учетные данные:</p>
            <div className={styles.testAccounts}>
              <div>
                👔 Менеджер: <code>manager / manager123</code>
              </div>
              <div>
                👤 Клиент: <code>client1 / client123</code>
              </div>
              <div>
                🔧 Сервис: <code>service1 / service123</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginForm
