import { useState } from "react";
import { useForm } from "react-hook-form";
import { authStore } from "../store/authStore";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { loginSchema } from "../validation/loginSchema";
import type { LoginSchemaType } from "../validation/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

interface LoginFormProps {
  onRegisterClick?: () => void;
}

function LoginForm({ onRegisterClick }: LoginFormProps) {
  const navigate = useNavigate();
  const { login } = authStore();
  const handleLoginSubmit = async (data: LoginSchemaType) => {
    await login(data.email, data.password);
    if (authStore.getState().isAuthenticated) {
      navigate("/main");
    }
  };
  const error = authStore((state) => state.error);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(handleLoginSubmit)} className="auth-form">
      <div className="form-group">
        <label>Email</label>
        <input
          type="text"
          placeholder="your@email.com"
          className={errors.email ? "error" : ""}
          {...register("email")}
        />
        {errors.email && (
          <span className="error-message">{errors.email.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>Пароль</label>
        <div className="password-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Ваш пароль"
            className={errors.password ? "error" : ""}
            {...register("password")}
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
        {errors.password && (
          <span className="error-message">{errors.password.message}</span>
        )}
      </div>

      <div className="form-footer">
        <button type="button" className="forgot-password">
          Забыли пароль?
        </button>
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "Вход..." : "Войти"}
      </button>

      <p className="switch-form">
        Нет аккаунта?{" "}
        <button type="button" className="link-button" onClick={onRegisterClick}>
          Зарегистрироваться
        </button>
      </p>
      {error && <span className="error">{error} </span>}
    </form>
  );
}

export default LoginForm;
