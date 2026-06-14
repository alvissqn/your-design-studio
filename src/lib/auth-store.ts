// Auth store - quản lý trạng thái đăng nhập
// Dùng localStorage + custom event để đồng bộ giữa các tab

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: "guest" | "user" | "contributor" | "business_owner" | "moderator" | "admin" | "super_admin";
  avatar?: string;
}

export interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
}

const AUTH_KEY = "mapzest_auth";

// Lấy state từ localStorage
export function getAuthState(): AuthState {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return { token: null, user: null, isAuthenticated: false };
    const parsed = JSON.parse(raw) as { token: string; user: AuthUser };
    return { token: parsed.token, user: parsed.user, isAuthenticated: true };
  } catch {
    return { token: null, user: null, isAuthenticated: false };
  }
}

// Lưu thông tin đăng nhập
export function setAuthState(token: string, user: AuthUser): void {
  localStorage.setItem(AUTH_KEY, JSON.stringify({ token, user }));
  window.dispatchEvent(new Event("auth-change"));
}

// Xóa thông tin đăng nhập (đăng xuất)
export function clearAuthState(): void {
  localStorage.removeItem(AUTH_KEY);
  window.dispatchEvent(new Event("auth-change"));
}

// --- Mock auth functions (sẽ thay bằng API thật sau) ---

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

// Mock login - giả lập delay network 800ms
export async function mockLogin(payload: LoginPayload): Promise<{ token: string; user: AuthUser }> {
  await new Promise((r) => setTimeout(r, 800));

  // Demo: bất kỳ email/pass đều đăng nhập được, admin@mapzest.com => role admin
  const isAdmin = payload.email === "admin@mapzest.com";

  if (!payload.email || !payload.password) {
    throw new Error("Email và mật khẩu không được để trống.");
  }
  if (payload.password.length < 6) {
    throw new Error("Mật khẩu phải có ít nhất 6 ký tự.");
  }

  const user: AuthUser = {
    id: "usr_" + Math.random().toString(36).slice(2, 9),
    email: payload.email,
    name: isAdmin ? "Admin MapZest" : payload.email.split("@")[0],
    role: isAdmin ? "admin" : "user",
  };

  return { token: "mock_jwt_" + Math.random().toString(36).slice(2), user };
}

// Mock register - giả lập delay network 1000ms
export async function mockRegister(payload: RegisterPayload): Promise<{ token: string; user: AuthUser }> {
  await new Promise((r) => setTimeout(r, 1000));

  if (!payload.name || !payload.email || !payload.password) {
    throw new Error("Vui lòng điền đầy đủ thông tin.");
  }
  if (payload.password.length < 6) {
    throw new Error("Mật khẩu phải có ít nhất 6 ký tự.");
  }

  const user: AuthUser = {
    id: "usr_" + Math.random().toString(36).slice(2, 9),
    email: payload.email,
    name: payload.name,
    role: "user",
  };

  return { token: "mock_jwt_" + Math.random().toString(36).slice(2), user };
}
