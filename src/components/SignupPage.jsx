// src/components/SignupPage.jsx
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { translations } from "../constants/translations";

// First, ensure we have signup translations
const signupTranslations = {
  en: {
    title: "Create your account",
    subtitle: "Sign up to start using our platform",
    nameLabel: "Full name",
    namePlaceholder: "John Doe",
    emailLabel: "Email address",
    emailPlaceholder: "your.email@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "••••••••",
    confirmPasswordLabel: "Confirm password",
    confirmPasswordPlaceholder: "••••••••",
    termsLabel: "I agree to the terms and conditions",
    signupButton: "Create account",
    creatingAccount: "Creating account...",
    haveAccount: "Already have an account?",
    signIn: "Sign in",
    successMessage: "Account created successfully! You can now sign in.",
    errorMessage: "An error occurred. Please try again later.",
  },
  es: {
    title: "Cree su cuenta",
    subtitle: "Regístrese para comenzar a usar nuestra plataforma",
    nameLabel: "Nombre completo",
    namePlaceholder: "Juan Pérez",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "su.correo@ejemplo.com",
    passwordLabel: "Contraseña",
    passwordPlaceholder: "••••••••",
    confirmPasswordLabel: "Confirmar contraseña",
    confirmPasswordPlaceholder: "••••••••",
    termsLabel: "Acepto los términos y condiciones",
    signupButton: "Crear cuenta",
    creatingAccount: "Creando cuenta...",
    haveAccount: "¿Ya tiene una cuenta?",
    signIn: "Iniciar sesión",
    successMessage: "¡Cuenta creada con éxito! Ahora puede iniciar sesión.",
    errorMessage: "Ha ocurrido un error. Por favor intente más tarde.",
  },
  fr: {
    title: "Créez votre compte",
    subtitle: "Inscrivez-vous pour commencer à utiliser notre plateforme",
    nameLabel: "Nom complet",
    namePlaceholder: "Jean Dupont",
    emailLabel: "Adresse e-mail",
    emailPlaceholder: "votre.email@exemple.com",
    passwordLabel: "Mot de passe",
    passwordPlaceholder: "••••••••",
    confirmPasswordLabel: "Confirmer le mot de passe",
    confirmPasswordPlaceholder: "••••••••",
    termsLabel: "J'accepte les termes et conditions",
    signupButton: "Créer un compte",
    creatingAccount: "Création du compte...",
    haveAccount: "Vous avez déjà un compte?",
    signIn: "Se connecter",
    successMessage:
      "Compte créé avec succès! Vous pouvez maintenant vous connecter.",
    errorMessage: "Une erreur s'est produite. Veuillez réessayer plus tard.",
  },
};

// Add these translations to the main translations object
Object.keys(signupTranslations).forEach((locale) => {
  if (!translations[locale].signup) {
    translations[locale].signup = signupTranslations[locale];
  }
});

const SignupPage = ({ locale = "en", onBackToLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(""); // null, 'success', 'error'
  const t = translations[locale];

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email(t.validation.invalidEmail)
      .required(t.validation.emailRequired),
    password: Yup.string()
      .min(8, t.validation.passwordLength)
      .required(t.validation.passwordRequired),
    confirmPassword: Yup.string()
      .test("passwords-match", "Passwords must match", function (value) {
        return value === this.parent.password;
      })
      .required("Confirm password is required"),
    acceptTerms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setStatus("");

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // For demo purposes, always show success
        setStatus("success");
      } catch (error) {
        console.error("Signup error:", error);
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
            Join our platform and access all the powerful features to grow your
            business.
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
                {t.signup.title}
              </h1>
              <p className="text-gray-600 mt-2">{t.signup.subtitle}</p>
            </div>

            {status === "success" && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
                role="alert"
              >
                <span className="block sm:inline">
                  {t.signup.successMessage}
                </span>
              </div>
            )}

            {status === "error" && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
                role="alert"
              >
                <span className="block sm:inline">{t.signup.errorMessage}</span>
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t.signup.nameLabel}
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      formik.touched.name && formik.errors.name
                        ? "border-red-300"
                        : "border-gray-300"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder={t.signup.namePlaceholder}
                    disabled={status === "success"}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t.signup.emailLabel}
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
                    placeholder={t.signup.emailPlaceholder}
                    disabled={status === "success"}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-1 text-sm text-red-600">
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
                  {t.signup.passwordLabel}
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-300"
                        : "border-gray-300"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder={t.signup.passwordPlaceholder}
                    disabled={status === "success"}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t.signup.confirmPasswordLabel}
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? "border-red-300"
                        : "border-gray-300"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder={t.signup.confirmPasswordPlaceholder}
                    disabled={status === "success"}
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.confirmPassword}
                      </p>
                    )}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={formik.values.acceptTerms}
                    onChange={formik.handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    disabled={status === "success"}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="acceptTerms"
                    className="font-medium text-gray-700"
                  >
                    {t.signup.termsLabel}
                  </label>
                  {formik.touched.acceptTerms && formik.errors.acceptTerms && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.acceptTerms}
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
                      {t.signup.creatingAccount}
                    </span>
                  ) : (
                    t.signup.signupButton
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t.signup.haveAccount}{" "}
                <button
                  onClick={onBackToLogin}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {t.signup.signIn}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
