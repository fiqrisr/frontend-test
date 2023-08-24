import { AuthBindings } from "@refinedev/core";
import { httpInstance } from "@/http";

export const authProvider: AuthBindings = {
  login: async ({ username, password }) => {
    const res = await httpInstance.post("/auth/login", { username, password });

    if (res && res.data?.message === "LOGIN SUCCESS") {
      if (typeof window !== "undefined")
        localStorage.setItem("auth", JSON.stringify(res.data));
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
    console.log(user);

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

  register: async ({ username, profileName, password }) => {
    const res = await httpInstance.post("/auth/register", {
      username,
      profileName,
      password,
    });

    if (res && res.data?.message === "USERNAME IS REGISTERED") {
      return {
        success: true,
        redirectTo: "/login",
      };
    }

    return {
      success: false,
      error: {
        name: "RegisterError",
        message: "User already exist",
      },
    };
  },
};
