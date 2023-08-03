import type { ThemeConfig } from "antd"
import { theme } from "antd"

export const getTheme = (isDarkMode = false): ThemeConfig => ({
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
        colorPrimary: "#7e56f0",
        borderRadius: 15,
    },

})