import { useState, useCallback } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback(async (email, password, rememberMe) => {
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Demo authentication logic
      if (email === "test@example.com" && password === "password123") {
        const userData = {
          id: "1",
          email,
          name: "Test User",
        };

        setUser(userData);
        setIsAuthenticated(true);

        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          sessionStorage.setItem("user", JSON.stringify(userData));
        }

        return { success: true };
      }

      return {
        success: false,
        message: "Invalid email or password",
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "An error occurred during login",
      };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  }, []);

  const restoreAuth = useCallback(() => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (e) {
        logout();
      }
    }
  }, [logout]);

  return {
    user,
    isAuthenticated,
    login,
    logout,
    restoreAuth,
  };
};

export default useAuth;
