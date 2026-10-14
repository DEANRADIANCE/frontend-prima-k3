import { AuthProvider } from "@refinedev/core";

export const USER_STORAGE_KEY = "primak3_auth_user";

export interface UserIdentity {
  username: string;
  name: string;
  role: string;
  email: string;
  avatar?: string;
  licenseNumber?: string;
}

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    // Mapping akun admin / admin
    const normalizedUsername = (username || "").trim().toLowerCase();
    const normalizedPassword = (password || "").trim();

    if (normalizedUsername === "admin" && normalizedPassword === "admin") {
      const user: UserIdentity = {
        username: "admin",
        name: "dr. Hendra Pratama",
        role: "Dokter Penanggung Jawab K3",
        email: "admin.k3@primak3.id",
        licenseNumber: "SIP. 445/K3-OKUPASI/2024",
      };

      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "Login Gagal",
        message: "Username atau password salah! Gunakan akun: admin / admin",
      },
    };
  },

  logout: async () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },

  check: async () => {
    const user = localStorage.getItem(USER_STORAGE_KEY);
    if (user) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
      logout: true,
    };
  },

  onError: async (error) => {
    if (error?.status === 401 || error?.status === 403) {
      localStorage.removeItem(USER_STORAGE_KEY);
      return {
        logout: true,
        redirectTo: "/login",
        error,
      };
    }

    return { error };
  },

  getPermissions: async () => {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (raw) {
      return ["admin", "dokter"];
    }
    return null;
  },

  getIdentity: async () => {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw) as UserIdentity;
      } catch {
        return null;
      }
    }
    return null;
  },
};
