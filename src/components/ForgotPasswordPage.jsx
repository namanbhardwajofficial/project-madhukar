import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { translations } from "../constants/translations";

// First, let's add translations for forgot password if not already added
const forgotPasswordTranslations = {
  en: {
    title: "Reset your password",
    subtitle:
      "Enter your email address and we'll send you a link to reset your password",
    emailLabel: "Email address",
    emailPlaceholder: "your.email@example.com",
    resetButton: "Send reset link",
    backToLogin: "Back to login",
    processingRequest: "Processing...",
    successMessage:
      "If your email exists in our system, you will receive a password reset link shortly.",
    errorMessage: "An error occurred. Please try again later.",
  },
  es: {
    title: "Restablecer su contraseña",
    subtitle:
      "Ingrese su correo electrónico y le enviaremos un enlace para restablecer su contraseña",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "su.correo@ejemplo.com",
    resetButton: "Enviar enlace de restablecimiento",
    backToLogin: "Volver al inicio de sesión",
    processingRequest: "Procesando...",
    successMessage:
      "Si su correo electrónico existe en nuestro sistema, recibirá un enlace para restablecer su contraseña en breve.",
    errorMessage: "Ha ocurrido un error. Por favor intente más tarde.",
  },
  fr: {
    title: "Réinitialiser votre mot de passe",
    subtitle:
      "Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe",
    emailLabel: "Adresse e-mail",
    emailPlaceholder: "votre.email@exemple.com",
    resetButton: "Envoyer le lien de réinitialisation",
    backToLogin: "Retour à la connexion",
    processingRequest: "Traitement...",
    successMessage:
      "Si votre e-mail existe dans notre système, vous recevrez un lien de réinitialisation de mot de passe sous peu.",
    errorMessage: "Une erreur s'est produite. Veuillez réessayer plus tard.",
  },
};

// Add these translations to the main translations object
Object.keys(forgotPasswordTranslations).forEach((locale) => {
  if (!translations[locale].forgotPassword) {
    translations[locale].forgotPassword = forgotPasswordTranslations[locale];
  }
});

const ForgotPasswordPage = ({ locale = "en", onBackToLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // null, 'success', 'error'
  const t = translations[locale];

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t.validation.invalidEmail)
      .required(t.validation.emailRequired),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setStatus(null);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // For demo purposes, always show success
        setStatus("success");
      } catch (error) {
        console.error("Password reset error:", error);
        setStatus("error");
      } finally {
        setIsLoading(false);
      }
    },
  });

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
            Reset your password to regain access to your account.
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
                {t.forgotPassword.title}
              </h1>
              <p className="text-gray-600 mt-2">{t.forgotPassword.subtitle}</p>
            </div>

            {status === "success" && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
                role="alert"
              >
                <span className="block sm:inline">
                  {t.forgotPassword.successMessage}
                </span>
              </div>
            )}

            {status === "error" && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
                role="alert"
              >
                <span className="block sm:inline">
                  {t.forgotPassword.errorMessage}
                </span>
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t.forgotPassword.emailLabel}
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-300"
                        : "border-gray-300"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder={t.forgotPassword.emailPlaceholder}
                    disabled={status === "success"}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading || status === "success"}
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
                      {t.forgotPassword.processingRequest}
                    </span>
                  ) : (
                    t.forgotPassword.resetButton
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={onBackToLogin}
                className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                {t.forgotPassword.backToLogin}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
