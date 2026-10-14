import {
  type PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { ConfigProvider, theme } from "antd";

type ColorModeContextType = {
  mode: string;
  setMode: (mode: string) => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType
);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const colorModeFromLocalStorage = localStorage.getItem("colorMode");
  const isSystemPreferenceDark = window?.matchMedia?.(
    "(prefers-color-scheme: dark)"
  )?.matches;

  const systemPreference = isSystemPreferenceDark ? "dark" : "light";
  const [mode, setMode] = useState(
    colorModeFromLocalStorage || systemPreference
  );

  useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
  }, [mode]);

  const setColorMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  const { darkAlgorithm, defaultAlgorithm } = theme;
  const isDark = mode === "dark";

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <ConfigProvider
        theme={{
          algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
          token: {
            colorPrimary: "#0F766E", // Deep Medical Teal
            colorInfo: "#1E3A8A", // Royal Dark Blue Accent
            colorSuccess: "#10b981",
            colorWarning: "#f59e0b",
            colorError: "#DC2626", // Danger / Emergency Red
            borderRadius: 10,
            borderRadiusLG: 14,
            colorBgBase: isDark ? "#0c1310" : "#ffffff",
            colorBgContainer: isDark ? "#141d19" : "#ffffff",
            colorBgElevated: isDark ? "#1a2621" : "#ffffff",
            colorBgLayout: isDark ? "#090e0c" : "#f8fafc",
            colorBorder: isDark ? "#23332c" : "#e2e8f0",
            colorBorderSecondary: isDark ? "#1c2b24" : "#f1f5f9",
            colorText: isDark ? "#f1f5f9" : "#0f172a",
            colorTextSecondary: isDark ? "#94a3b8" : "#475569",
            colorTextHeading: isDark ? "#f8fafc" : "#0f172a",
            fontFamily:
              "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif",
          },
          components: {
            Layout: {
              headerBg: isDark ? "#141d19" : "#ffffff",
              siderBg: isDark ? "#141d19" : "#ffffff",
              bodyBg: isDark ? "#090e0c" : "#f8fafc",
            },
            Menu: {
              itemBg: isDark ? "#141d19" : "#ffffff",
              itemColor: isDark ? "#cbd5e1" : "#334155",
              itemSelectedColor: "#0F766E",
              itemSelectedBg: isDark ? "#13352c" : "#f0fdfa",
              itemHoverColor: "#0F766E",
              itemHoverBg: isDark ? "#132b24" : "#f0fdf4",
              subMenuItemBg: isDark ? "#0e1713" : "#fafafa",
              borderRadius: 8,
            },
            Card: {
              headerBg: "transparent",
              colorBgContainer: isDark ? "#141d19" : "#ffffff",
              boxShadowTertiary: "0 2px 8px rgba(15, 118, 110, 0.06)",
            },
            Button: {
              controlHeight: 38,
              borderRadius: 8,
              fontWeight: 500,
            },
            Table: {
              headerBg: isDark ? "#182823" : "#f0fdfa",
              headerColor: isDark ? "#99f6e4" : "#0f766e",
              rowHoverBg: isDark ? "#15241f" : "#f8fafc",
            },
            Descriptions: {
              labelBg: isDark ? "#18241f" : "#f8fafc",
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ColorModeContext.Provider>
  );
};
