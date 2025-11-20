"use client";

import { Icon, IconName } from "@/components/icons";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
} from "react";

export type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  type: ToastType;
  icon?: IconName;
  title: string;
  description?: string;
  reportTo?: string;
  timeout?: number;
}

interface ToastContextValue {
  toast: (options: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((options: Omit<Toast, "id">) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, ...options }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      options.timeout || 5000,
    );
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      <div className="fixed inset-x-2 top-6 sm:inset-x-auto sm:right-4 space-y-2 z-50">
        {toasts.map(
          ({ id, type, title, description, icon, reportTo }, index) => (
            <div
              key={index}
              className={[
                "w-full sm:min-w-md sm:max-w-3xl mx-auto sm:w-auto",
                "dark:bg-neutral-800/40 backdrop-blur-md bg-black/5",
                "rounded-lg pointer-events-auto overflow-hidden",
              ].join(" ")}
            >
              <div className="p-4">
                <div className="flex items-start gap-2">
                  {icon && (
                    <Icon
                      className={[
                        "my-auto",
                        type === "error"
                          ? "dark:fill-red-400 fill-red-500"
                          : type === "success"
                            ? "dark:fill-green-400 fill-green-500"
                            : "fill-current",
                      ].join(" ")}
                      name={icon}
                    />
                  )}
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="font-semibold text-xs capitalize">{title}</p>
                    {description && (
                      <p className="mt-1 text-xs">{description}</p>
                    )}
                  </div>
                  {reportTo && (
                    <div className="ml-4 my-auto">
                      <a
                        className={[
                          "text-xs text-start px-2 py-1 rounded my-auto",
                          "bg-black/10 dark:bg-white/10",
                          "text-black/50 hover:text-black dark:text-white dark:hover:text-white/50",
                        ].join(" ")}
                        target="_blank"
                        href={reportTo}
                        title="Report"
                      >
                        Report
                      </a>
                    </div>
                  )}
                  <div className="flex shrink-0">
                    <button
                      onClick={() =>
                        setToasts((prev) => prev.filter((t) => t.id !== id))
                      }
                      className={[
                        "inline-flex",
                        "focus:outline-none rounded-sm",
                        "dark:text-white/50 dark:hover:text-white dark:active:ring-1 dark:active:ring-white/50",
                        "hover:text-black/50 active:ring-1 active:ring-black/50",
                      ].join(" ")}
                    >
                      <Icon name="close" size={10} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}
