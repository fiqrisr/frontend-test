import { AuthBindings } from "@refinedev/core";
import { httpInstance } from "@/http";

export const authProvider: AuthBindings = {
  login: async ({ username, password }) => {
    const user = await httpInstance.post("/auth/login", { username, password });

    if (user) {
      if (typeof window !== "undefined")
        localStorage.setItem("auth", JSON.stringify(user));
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },

  logout: async () => {
    if (typeof window !== "undefined") localStorage.removeItem("auth");

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  check: async (ctx: any) => {
    let user;

    if (typeof window !== "undefined") user = localStorage.getItem("auth");

    if (user) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
      error: {
        message: "Check failed",
        name: "Unauthorized",
      },
    };
  },

  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
