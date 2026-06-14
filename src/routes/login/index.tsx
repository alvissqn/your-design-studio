import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Eye, EyeOff, MapPinned, Loader2, LogIn, AlertCircle } from "lucide-react";
import { mockLogin, setAuthState } from "@/lib/auth-store";

// Schema validation
const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ."),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
});
type LoginForm = z.infer<typeof loginSchema>;

export const Route = createFileRoute("/login/")({
  head: () => ({
    meta: [
      { title: "Đăng nhập — MapZest AI" },
      { name: "description", content: "Đăng nhập vào hệ thống quản lý địa điểm MapZest AI." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setServerError(null);
    try {
      const result = await mockLogin(data);
      setAuthState(result.token, result.user);
      navigate({ to: "/" });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Đăng nhập thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-canvas">
      {/* Background decorative gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-info/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple/10 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo + Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-info shadow-lg shadow-primary/30 mb-4">
            <MapPinned className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            MAP<span className="text-primary">ZEST</span> AI
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Nền tảng quản lý địa điểm thông minh</p>
        </div>

        {/* Form card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl shadow-black/5">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground">Đăng nhập</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Chưa có tài khoản?{" "}
              <Link to="/register" className="text-primary font-medium hover:underline transition-all">
                Đăng ký ngay
              </Link>
            </p>
          </div>

          {/* Server error */}
          {serverError && (
            <div className="flex items-start gap-2.5 p-3 mb-5 rounded-lg bg-danger-soft border border-destructive/20 text-destructive text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id="login-form" noValidate>
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="login-email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={`w-full h-10 px-3 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:ring-2 focus:ring-primary/40 focus:border-primary ${
                  errors.email ? "border-destructive focus:ring-destructive/30" : "border-input"
                }`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="login-password" className="text-sm font-medium text-foreground">
                  Mật khẩu
                </label>
                <button
                  type="button"
                  className="text-xs text-primary hover:underline transition-all"
                  onClick={() => setServerError("Tính năng quên mật khẩu sẽ có sớm.")}
                >
                  Quên mật khẩu?
                </button>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`w-full h-10 px-3 pr-10 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:ring-2 focus:ring-primary/40 focus:border-primary ${
                    errors.password ? "border-destructive focus:ring-destructive/30" : "border-input"
                  }`}
                  {...register("password")}
                />
                <button
                  type="button"
                  id="toggle-password-login"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm transition hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-sm shadow-primary/30 mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Đăng nhập
                </>
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 p-3 rounded-lg bg-info-soft border border-info/20 text-xs text-muted-foreground space-y-1">
            <p className="font-semibold text-foreground text-[11px] uppercase tracking-wider mb-1">Tài khoản demo</p>
            <p>🔑 <strong>admin@mapzest.com</strong> / bất kỳ pass ≥6 ký tự → Admin</p>
            <p>🔑 Bất kỳ email khác / bất kỳ pass ≥6 ký tự → User</p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          © 2026 MapZest AI — Location Intelligence Platform
        </p>
      </div>
    </div>
  );
}
