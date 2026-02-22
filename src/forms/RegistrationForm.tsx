import { useState } from "react";
import { useForm } from "react-hook-form";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../validation/registrationSchema";
import type { RegistrationSchemaType } from "../validation/registrationSchema";
import { authStore } from "../store/authStore";

interface RegistrationFormProps {
  onLoginClick?: () => void;
}

function RegistrationForm({ onLoginClick }: RegistrationFormProps) {
  const { registration } = authStore();
  const handleRegistrationSubmit = async (data: RegistrationSchemaType) => {
    await registration(data.email, data.password);
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting, isValid },
  } = useForm<RegistrationSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(registrationSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(handleRegistrationSubmit)}
      className="auth-form"
    >
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
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

      <div className="form-group">
        <label>Подтвердите пароль</label>
        <div className="password-input-wrapper">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Повторите пароль"
            className={errors.confirmPassword ? "error" : ""}
            {...register("confirmPassword")}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            tabIndex={-1}
          >
            {showConfirmPassword ? (
              <IconEyeOff size={20} stroke={2} />
            ) : (
              <IconEye size={20} stroke={2} />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <span className="error-message">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
      </button>

      <p className="switch-form">
        Уже есть аккаунт?{" "}
        <button type="button" className="link-button" onClick={onLoginClick}>
          Войти
        </button>
      </p>
    </form>
  );
}

export default RegistrationForm;

