import { useState } from "react";
import { useForm } from "react-hook-form";
import { authStore } from "../store/authStore";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { loginSchema } from "../validation/loginSchema";
import type { LoginSchemaType } from "../validation/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  recoverySchema,
  type RecoverySchemaType,
} from "../validation/recoverySchema";

interface LoginFormProps {
  onRegisterClick?: () => void;
}

function LoginForm({ onRegisterClick }: LoginFormProps) {
  const [forgotPassword, setForgotPassword] = useState(false);

  const { login, recovery } = authStore();

  const handleLoginSubmit = async (data: LoginSchemaType) => {
    await login(data.email, data.password);
  };
  const handleLoginRecoverySubmit = async (data: RecoverySchemaType) => {
    recovery(data.recoveryEmail);
  };
  const error = authStore((state) => state.error);
  const [showPassword, setShowPassword] = useState(false);

  const loginForm = useForm<LoginSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  const recoveryForm = useForm<RecoverySchemaType>({
    mode: "onTouched",
    resolver: zodResolver(recoverySchema),
  });
  return (
    <>
      {forgotPassword ? (
        <form
          key="recovery-form"
          onSubmit={recoveryForm.handleSubmit(handleLoginRecoverySubmit)}
          className="auth-form"
        >
          <div className="form-group">
            <label>Введите Email, указанный при регистрации</label>
            <input
              type="email"
              placeholder="your@email.com"
              className={
                recoveryForm.formState.errors.recoveryEmail ? "error" : ""
              }
              {...recoveryForm.register("recoveryEmail")}
            />
            {recoveryForm.formState.errors.recoveryEmail && (
              <span className="error-message">
                {recoveryForm.formState.errors.recoveryEmail.message}
              </span>
            )}
          </div>

          <button type="submit" className="submit-button">
            {recoveryForm.formState.isSubmitting ? "Отпрвка..." : "Отправить"}
          </button>

          <p className="switch-form">
            <button
              type="button"
              className="link-button"
              onClick={() => setForgotPassword(!forgotPassword)}
            >
              Отмена
            </button>
          </p>
          {error && <span className="error">{error} </span>}
        </form>
      ) : (
        <form
          key="login-form"
          onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
          className="auth-form"
        >
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className={loginForm.formState.errors.email ? "error" : ""}
              {...loginForm.register("email")}
            />
            {loginForm.formState.errors.email && (
              <span className="error-message">
                {loginForm.formState.errors.email.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Ваш пароль"
                className={loginForm.formState.errors.password ? "error" : ""}
                {...loginForm.register("password")}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <IconEyeOff size={20} stroke={2} />
                ) : (
                  <IconEye size={20} stroke={2} />
                )}
              </button>
            </div>
            {loginForm.formState.errors.password && (
              <span className="error-message">
                {loginForm.formState.errors.password.message}
              </span>
            )}
          </div>

          <div className="form-footer">
            <button
              type="button"
              className="forgot-password"
              onClick={() => setForgotPassword(!forgotPassword)}
            >
              Забыли пароль?
            </button>
          </div>

          <button type="submit" className="submit-button">
            {loginForm.formState.isSubmitting ? "Вход..." : "Войти"}
          </button>

          <p className="switch-form">
            Нет аккаунта?{" "}
            <button
              type="button"
              className="link-button"
              onClick={onRegisterClick}
            >
              Зарегистрироваться
            </button>
          </p>
          {error && <span className="server-error">{error} </span>}
        </form>
      )}
    </>
  );
}

export default LoginForm;


