import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { translations } from "../constants/translations";
import useAuth from "../hooks/useAuth";

const LoginPage = ({ locale = "en", onForgotPassword, onSignup }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const t = translations[locale];

  // Effect to monitor authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      setLoginSuccess(true);
    }
  }, [isAuthenticated]);

  const handleLogin = async (values) => {
    try {
      setIsLoading(true);
      setLoginError("");
      setLoginSuccess(false);

      // Call the authentication service
      const result = await login(
        values.email,
        values.password,
        values.rememberMe
      );

      if (!result.success) {
        setLoginError(result.message || t.login.invalidCredentials);
      } else {
        setLoginSuccess(true); // Set success state immediately
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(t.login.errorOccurred);
    } finally {
      setIsLoading(false);
    }
  };

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t.validation.invalidEmail)
      .required(t.validation.emailRequired),
    password: Yup.string()
      .min(8, t.validation.passwordLength)
      .required(t.validation.passwordRequired),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  // If already logged in or just logged in successfully, show a success message
  if (loginSuccess || isAuthenticated) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              {t.dashboard.successfulLogin}
            </h2>
            <p className="mt-2 text-gray-600">{t.dashboard.welcome}</p>
            <div className="mt-6">
              <p className="text-sm text-gray-500">
                {t.login.redirecting || "Redirecting to dashboard..."}
              </p>
              <div className="mt-3 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 animate-pulse rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden lg:flex lg:flex-1 bg-indigo-900 relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
          <svg
            className="h-16 w-16 mb-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 6L14 6L14 14L6 14L6 6Z"
              fill="currentColor"
              fillOpacity="0.5"
            />
            <path d="M14 6L22 6L22 14L14 14L14 6Z" fill="currentColor" />
            <path d="M6 14L14 14L14 22L6 22L6 14Z" fill="currentColor" />
          </svg>
          <h1 className="text-4xl font-bold mb-4">Acme Dashboard</h1>
          <p className="text-xl text-center max-w-md">
            Access your analytics, track performance, and manage your business
            all in one place.
          </p>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto p-6 flex items-center justify-center lg:flex-1">
        <div className="w-full">
          <div className="flex justify-center mb-6 lg:hidden">
            <svg
              className="h-12 w-12 text-indigo-900"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6L14 6L14 14L6 14L6 6Z"
                fill="currentColor"
                fillOpacity="0.5"
              />
              <path d="M14 6L22 6L22 14L14 14L14 6Z" fill="currentColor" />
              <path d="M6 14L14 14L14 22L6 22L6 14Z" fill="currentColor" />
            </svg>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                {t.login.title}
              </h1>
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

            <form
              onSubmit={formik.handleSubmit}
              className="space-y-6"
              data-testid="login-form"
            >
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t.login.emailLabel}
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    data-testid="email-input"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-300"
                        : "border-gray-300"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder={t.login.emailPlaceholder}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p
                      className="mt-1 text-sm text-red-600"
                      data-testid="email-error"
                    >
                      {formik.errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t.login.passwordLabel}
                  </label>
                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    {t.login.forgotPassword}
                  </button>
                </div>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    data-testid="password-input"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-300"
                        : "border-gray-300"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder={t.login.passwordPlaceholder}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p
                      className="mt-1 text-sm text-red-600"
                      data-testid="password-error"
                    >
                      {formik.errors.password}
                    </p>
                  )}
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  data-testid="remember-checkbox"
                  checked={formik.values.rememberMe}
                  onChange={formik.handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-700"
                >
                  {t.login.rememberMe}
                </label>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  data-testid="login-button"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {t.login.loggingIn}
                    </span>
                  ) : (
                    t.login.signIn
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t.login.noAccount}{" "}
                <button
                  onClick={onSignup}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {t.login.signUp}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
