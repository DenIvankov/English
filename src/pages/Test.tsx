import { useState } from "react";
import "../styles/authorization.css";
import { IconLockQuestion } from "@tabler/icons-react";

type IsActiveType = "mylogin" | "registration";
type ColoreTextFaultType = {
  mylogin: boolean;
  myPassword: boolean;
  email: boolean;
  newPassword: boolean;
  repeatNewPassword: boolean;
};

function Test() {
  const [isActive] = useState<IsActiveType>("mylogin");
  const [coloreTextFault] = useState<ColoreTextFaultType>({
    mylogin: false,
    myPassword: false,
    email: false,
    newPassword: false,
    repeatNewPassword: false,
  });

  return (
    <div className="modal_container">
      <div className="modal_window">
        <strong>Today is a good day to speak English :)</strong>

        <div className="buttons_group">
          <button className={isActive === "mylogin" ? "active" : ""}>
            Login
          </button>

          <button className={isActive === "registration" ? "active" : ""}>
            Registration
          </button>
        </div>

        <div className="forms_wrapper">
          <div
            className={`form ${isActive === "mylogin" ? "active_form" : ""}`}
          >
            <div className="form_inputs">
              <p>Логин пользователя</p>
              <input placeholder="Введите логин" type="text" />

              <p>Пароль</p>
              <input placeholder="Введите пароль" type="password" />
            </div>

            <div className="confirmation_button_container">
              <button className="confirmation_button">Войти</button>
              <button className="memory" data-tooltip="Забыли пароль?">
                <IconLockQuestion stroke={1.5} />
              </button>
            </div>
          </div>

          <div
            className={`form ${
              isActive === "registration" ? "active_form" : ""
            }`}
          >
            <div className="form_inputs">
              <p>Электронная почта</p>
              <input placeholder="Введите email" type="text" />

              <p>Пароль</p>
              <input placeholder="Введите пароль" type="password" />

              <p>Повторно пароль</p>
              <input
                placeholder="Введите пароль"
                type="password"
                className={coloreTextFault.repeatNewPassword ? "fault" : ""}
              />
            </div>

            <div className="confirmation_button_container">
              <button className="confirmation_button">
                Зарегистрироваться
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
