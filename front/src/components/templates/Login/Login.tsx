"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Text, ThemeToggle, LanguageToggle } from "@/components/atoms";
import { useI18n } from "@/i18n";

const advantages = [
  {
    key: "modules",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
      </svg>
    ),
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    key: "realtime",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    key: "security",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  {
    key: "integration",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg>
    ),
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    key: "support",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
      </svg>
    ),
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
  },
  {
    key: "updates",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
  },
];

export function Login() {
  const { t } = useI18n();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simular delay de autenticación para demo
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Para demo técnica: siempre redirigir al home
    router.push("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo - Información */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden">
        {/* Fondo con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-500" />
          </div>
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Contenido */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 py-12 w-full">
          {/* Logo y marca */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="text-white font-bold text-xl">NX</span>
            </div>
            <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">
              {t("login.welcome")}
            </p>
            <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4">
              NexusPro
            </h1>
            <p className="text-lg text-slate-300 max-w-md">
              {t("login.tagline")}
            </p>
          </div>

          {/* Ventajas */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-12">
            {advantages.map((adv) => (
              <div
                key={adv.key}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className={`flex-shrink-0 w-11 h-11 rounded-lg ${adv.bgColor} flex items-center justify-center ${adv.color}`}>
                  {adv.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-medium text-sm mb-1">
                    {t(`login.advantage.${adv.key}.title` as any)}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {t(`login.advantage.${adv.key}.desc` as any)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Trusted by */}
          <div className="mt-auto">
            <p className="text-slate-500 text-xs uppercase tracking-wider mb-4">
              {t("login.trusted")}
            </p>
            <div className="flex items-center gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-20 h-8 rounded bg-white/10 flex items-center justify-center"
                >
                  <span className="text-white/30 text-xs font-medium">Logo {i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho - Login */}
      <div className="w-full lg:w-1/2 xl:w-[45%] relative bg-white dark:bg-slate-900">
        {/* Controles superiores */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        {/* Formulario */}
        <div className="min-h-screen flex items-center justify-center p-6 sm:p-8">
          <div className="w-full max-w-md">
            {/* Logo móvil */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-4">
                <span className="text-slate-900 dark:text-white font-bold text-xl">NX</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                NexusPro
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                {t("login.brandTitle")}
              </p>
            </div>

            {/* Card del formulario */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-700">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
                  {t("login.title")}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t("login.subtitle")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg">
                    <Text variant="small" className="text-red-600 dark:text-red-400 text-center">
                      {error}
                    </Text>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    {t("login.email")}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("login.emailPlaceholder")}
                    autoComplete="email"
                    className="block w-full px-4 py-3 text-sm text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    {t("login.password")}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("login.passwordPlaceholder")}
                    autoComplete="current-password"
                    className="block w-full px-4 py-3 text-sm text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-blue-600 focus:ring-blue-500/50 focus:ring-offset-0"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">{t("login.remember")}</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
                  >
                    {t("login.forgot")}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading || !email || !password}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {t("login.loading")}
                    </span>
                  ) : (
                    t("login.submit")
                  )}
                </button>
              </form>

              {/* Credenciales demo */}
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-500 text-center mb-2">
                  {t("login.demo")}
                </p>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                  <code className="text-xs text-slate-600 dark:text-slate-400 block text-center font-mono">
                    admin@nexuspro.com / admin123
                  </code>
                </div>
              </div>
            </div>

            {/* Features móviles */}
            <div className="lg:hidden mt-8 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">{t("login.feature.secure")}</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">{t("login.feature.fast")}</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-2">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                  </svg>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">{t("login.feature.smart")}</p>
              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-8">
              © 2024 NexusPro. {t("login.rights")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
