import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { translations } from "../constants/translations";
import useAuth from "../hooks/useAuth";

const LoginPage = ({ locale = "en" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { login } = useAuth();
  const t = translations[locale];

  const handleLogin = async (values) => {
    try {
      setIsLoading(true);
      setLoginError("");

      // Call the authentication service
      const result = await login(
        values.email,
        values.password,
        values.rememberMe
      );

      if (!result.success) {
        setLoginError(result.message || t.login.invalidCredentials);
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(t.login.errorOccurred);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-full max-w-md m-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{t.login.title}</h1>
          <p className="text-gray-600 mt-2">{t.login.subtitle}</p>
        </div>

        {loginError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            role="alert"
            data-testid="login-error"
          >
            <span className="block sm:inline">{loginError}</span>
          </div>
        )}

        <LoginForm
          onSubmit={handleLogin}
          isLoading={isLoading}
          locale={locale}
        />

        <div className="mt-6 text-center">
          <a
            href="#forgot-password"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {t.login.forgotPassword}
          </a>
          <p className="mt-4 text-sm text-gray-600">
            {t.login.noAccount}{" "}
            <a
              href="#register"
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              {t.login.signUp}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
