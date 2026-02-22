import { useState } from "react";
import LoginForm from "../forms/LoginForm";
import RegistrationForm from "../forms/RegistrationForm";
import "../styles/authorization.css";

function Authorization() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Speak English with Confidence</h1>
          </div>

          <div className="auth-tabs">
            <button
              className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>

            <button
              className={`auth-tab ${activeTab === "register" ? "active" : ""}`}
              onClick={() => setActiveTab("register")}
            >
              Registration
            </button>
          </div>

          <div className="auth-form-wrapper">
            {activeTab === "login" ? (
              <LoginForm onRegisterClick={() => setActiveTab("register")} />
            ) : (
              <RegistrationForm onLoginClick={() => setActiveTab("login")} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authorization;
