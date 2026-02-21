import { useState } from "react";
import LoginForm from "../forms/LoginForm";
import RegistrationForm from "../forms/RegistrationForm";
import "../styles/authorization.css";

function Authorization() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="authorization-container">
      <div className="authorization-window">
        <h2 className="authorization-title">
          Today is a good day to speak English :)
        </h2>

        <div className="tabs">
          <button
            className={`tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`tab ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            Registration
          </button>
        </div>

        <div className="forms-container">
          {activeTab === "login" ? (
            <LoginForm onRegisterClick={() => setActiveTab("register")} />
          ) : (
            <RegistrationForm onLoginClick={() => setActiveTab("login")} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Authorization;
