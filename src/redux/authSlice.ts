// Auth slice — users & session persisted in localStorage (no backend)
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type User = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

type AuthState = {
  users: User[];
  currentUser: Omit<User, "password"> | null;
  error: string | null;
  hydrated: boolean;
};

const isBrowser = typeof window !== "undefined";

const read = <T,>(key: string, fallback: T): T => {
  if (!isBrowser) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown) => {
  if (isBrowser) localStorage.setItem(key, JSON.stringify(value));
};

const initialState: AuthState = {
  users: [],
  currentUser: null,
  error: null,
  hydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Hydrate store from localStorage on the client after mount
    loadAuth(state) {
      state.users = read<User[]>("users", []);
      state.currentUser = read<AuthState["currentUser"]>("loggedInUser", null);
      state.hydrated = true;
    },
    register(state, action: PayloadAction<User>) {
      const exists = state.users.some(
        (u) => u.email.toLowerCase() === action.payload.email.toLowerCase(),
      );
      if (exists) {
        state.error = "An account with this email already exists.";
        return;
      }
      state.users.push(action.payload);
      state.error = null;
      write("users", state.users);
    },
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      const found = state.users.find(
        (u) =>
          u.email.toLowerCase() === action.payload.email.toLowerCase() &&
          u.password === action.payload.password,
      );
      if (!found) {
        state.error = "Invalid email or password.";
        state.currentUser = null;
        return;
      }
      const { password: _pw, ...safe } = found;
      state.currentUser = safe;
      state.error = null;
      write("loggedInUser", safe);
    },
    logout(state) {
      state.currentUser = null;
      state.error = null;
      if (isBrowser) localStorage.removeItem("loggedInUser");
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { loadAuth, register, login, logout, clearError } =
  authSlice.actions;
export default authSlice.reducer;
