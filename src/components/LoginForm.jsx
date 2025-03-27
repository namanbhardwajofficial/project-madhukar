import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { translations } from "../constants/translations";

const LoginForm = ({ onSubmit, isLoading, locale = "en" }) => {
  const t = translations[locale];

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
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
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
            } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            placeholder={t.login.emailPlaceholder}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-sm text-red-600" data-testid="email-error">
              {formik.errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          {t.login.passwordLabel}
        </label>
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
            } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
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
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            data-testid="remember-checkbox"
            checked={formik.values.rememberMe}
            onChange={formik.handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="rememberMe"
            className="ml-2 block text-sm text-gray-700"
          >
            {t.login.rememberMe}
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          data-testid="login-button"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
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
  );
};

export default LoginForm;
