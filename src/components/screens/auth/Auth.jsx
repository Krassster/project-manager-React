import Loader from "../../ui/Loader";

import styles from "./Auth.module.scss";

import { useAuthPage } from "./useAuthPage";
import { useState } from "react";

const Auth = () => {
  const {
    registerLogin,
    registerRegister,
    handleSubmitLogin,
    handleSubmitRegister,
    errorsRegister,
    onSubmit,
    setType,
    isLoading,
    authError,
    regisError,
  } = useAuthPage();

  const [isFocused, setIsFocused] = useState({
    username: false,
    email: false,
    password: false,
  });

  const handleFocus = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: false }));
  };

  return (
    <div className="container">
      <input type="checkbox" id={styles.chk} aria-hidden="false" />
      <div className={styles.signup}>
        <form onSubmit={handleSubmitRegister(onSubmit)}>
          <label htmlFor={styles.chk} aria-hidden="true">
            Регистрация
          </label>
          <input
            type="text"
            id="username"
            placeholder="Имя пользователя"
            {...registerRegister("username", {
              required: "Имя обязательно",
              minLength: {
                value: 3,
                message: "Имя пользователя должно содержать минимум 3 символа",
              },
            })}
            onFocus={() => handleFocus("username")}
            onBlur={() => handleBlur("username")}
          />
          {errorsRegister.username && !isFocused.username && (
            <p className={styles.error}>{errorsRegister.username.message}</p>
          )}

          <input
            type="email"
            id="email"
            placeholder="Email"
            {...registerRegister("email", {
              required: "Почта обязательна",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Некорректный формат email",
              },
            })}
            onFocus={() => handleFocus("email")}
            onBlur={() => handleBlur("email")}
          />
          {errorsRegister.email && !isFocused.email && (
            <p className={styles.error}>{errorsRegister.email.message}</p>
          )}

          <input
            type="password"
            id="password"
            placeholder="Пароль"
            {...registerRegister("password", {
              required: "Пароль обязателен",
              minLength: {
                value: 6,
                message: "Пароль должен содержать минимум 6 символов",
              },
            })}
            onFocus={() => handleFocus("password")}
            onBlur={() => handleBlur("password")}
          />
          {errorsRegister.password && !isFocused.password && (
            <p className={styles.error}>{errorsRegister.password.message}</p>
          )}

          {regisError && <p className={styles.error}>{regisError}</p>}

          <button onClick={() => setType("register")}>
            Зарегистрироваться
          </button>
        </form>
      </div>

      <div className={styles.login}>
        <form onSubmit={handleSubmitLogin(onSubmit)}>
          <label htmlFor={styles.chk} aria-hidden="true">
            Вход
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            {...registerLogin("email", {
              required: "Почта обязательна",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Некорректный формат email",
              },
            })}
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            {...registerLogin("password", {
              required: "Пароль обязателен",
              minLength: {
                value: 6,
                message: "Пароль должен содержать минимум 6 символов",
              },
            })}
          />
          <button onClick={() => setType("login")}>Войти</button>

          {authError && <p className={styles.error}>{authError}</p>}
        </form>
      </div>
    </div>
  );
};

export default Auth;
