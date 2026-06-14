import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import {
  Eye, EyeOff, MapPinned, Loader2, UserPlus, AlertCircle,
  CheckCircle2, User, Mail, Lock,
} from "lucide-react";
import { mockRegister, setAuthState } from "@/lib/auth-store";

// Schema validation
const registerSchema = z
  .object({
    name: z.string().min(2, "Tên phải có ít nhất 2 ký tự.").max(60, "Tên quá dài."),
    email: z.string().email("Email không hợp lệ."),
    password: z
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự.")
      .regex(/[A-Z]/, "Phải có ít nhất 1 chữ hoa.")
      .regex(/[0-9]/, "Phải có ít nhất 1 chữ số."),
    confirmPassword: z.string(),
    agreeTerms: z.literal(true, { errorMap: () => ({ message: "Bạn phải đồng ý điều khoản." }) }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp.",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export const Route = createFileRoute("/register/")({
  head: () => ({
    meta: [
      { title: "Đăng ký — MapZest AI" },
      { name: "description", content: "Tạo tài khoản MapZest AI để quản lý địa điểm thông minh." },
    ],
  }),
  component: RegisterPage,
});

// Tiêu chí mật khẩu
const pwCriteria = [
  { label: "Ít nhất 6 ký tự", test: (v: string) => v.length >= 6 },
  { label: "Ít nhất 1 chữ hoa", test: (v: string) => /[A-Z]/.test(v) },
  { label: "Ít nhất 1 chữ số", test: (v: string) => /[0-9]/.test(v) },
];

function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { agreeTerms: undefined },
  });

  // Theo dõi password để hiển thị criteria realtime
  const pwValue = watch("password") ?? "";

  const onSubmit = async (data: RegisterForm) => {
    setServerError(null);
    try {
      const result = await mockRegister({ name: data.name, email: data.email, password: data.password });
      setAuthState(result.token, result.user);
      navigate({ to: "/" });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-canvas py-8">
      {/* Background decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-info/15 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-purple/10 blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

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
            <h2 className="text-xl font-semibold text-foreground">Tạo tài khoản</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Đã có tài khoản?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline transition-all">
                Đăng nhập
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id="register-form" noValidate>
            {/* Full name */}
            <div className="space-y-1.5">
              <label htmlFor="register-name" className="text-sm font-medium text-foreground flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-muted-foreground" /> Họ và tên
              </label>
              <input
                id="register-name"
                type="text"
                autoComplete="name"
                placeholder="Nguyễn Văn A"
                className={`w-full h-10 px-3 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:ring-2 focus:ring-primary/40 focus:border-primary ${
                  errors.name ? "border-destructive focus:ring-destructive/30" : "border-input"
                }`}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="register-email" className="text-sm font-medium text-foreground flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-muted-foreground" /> Email
              </label>
              <input
                id="register-email"
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
              <label htmlFor="register-password" className="text-sm font-medium text-foreground flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-muted-foreground" /> Mật khẩu
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className={`w-full h-10 px-3 pr-10 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:ring-2 focus:ring-primary/40 focus:border-primary ${
                    errors.password ? "border-destructive focus:ring-destructive/30" : "border-input"
                  }`}
                  {...register("password")}
                />
                <button
                  type="button"
                  id="toggle-password-register"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength criteria */}
              {pwValue && (
                <div className="grid grid-cols-1 gap-1 mt-2">
                  {pwCriteria.map((c) => {
                    const ok = c.test(pwValue);
                    return (
                      <div key={c.label} className="flex items-center gap-1.5 text-xs">
                        <CheckCircle2 className={`w-3.5 h-3.5 transition-colors ${ok ? "text-success" : "text-muted-foreground/40"}`} />
                        <span className={ok ? "text-success" : "text-muted-foreground"}>{c.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {errors.password && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm password */}
            <div className="space-y-1.5">
              <label htmlFor="register-confirm-password" className="text-sm font-medium text-foreground flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-muted-foreground" /> Xác nhận mật khẩu
              </label>
              <div className="relative">
                <input
                  id="register-confirm-password"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className={`w-full h-10 px-3 pr-10 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:ring-2 focus:ring-primary/40 focus:border-primary ${
                    errors.confirmPassword ? "border-destructive focus:ring-destructive/30" : "border-input"
                  }`}
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  id="toggle-confirm-password-register"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showConfirm ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Agree terms */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                id="register-agree-terms"
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-input accent-primary cursor-pointer"
                {...register("agreeTerms")}
              />
              <label htmlFor="register-agree-terms" className="text-sm text-muted-foreground leading-snug cursor-pointer select-none">
                Tôi đồng ý với{" "}
                <span className="text-primary hover:underline cursor-pointer">Điều khoản sử dụng</span>{" "}
                và{" "}
                <span className="text-primary hover:underline cursor-pointer">Chính sách bảo mật</span>{" "}
                của MapZest AI.
              </label>
            </div>
            {errors.agreeTerms && (
              <p className="text-xs text-destructive flex items-center gap-1 -mt-2">
                <AlertCircle className="w-3 h-3" />
                {errors.agreeTerms.message}
              </p>
            )}

            {/* Submit */}
            <button
              id="register-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm transition hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-sm shadow-primary/30 mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang tạo tài khoản...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Tạo tài khoản
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          © 2026 MapZest AI — Location Intelligence Platform
        </p>
      </div>
    </div>
  );
}
