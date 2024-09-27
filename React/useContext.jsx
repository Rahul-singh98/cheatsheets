import React, { createContext, useContext, useState } from "react";
import { Moon, Sun } from "lucide-react";

// Create a context for the theme
const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create a custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Component that uses the theme
const ThemedComponent = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div
      className={`p-4 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">Theme Switcher Example</h1>
      <p className="mb-4">
        This component uses the current theme from context.
      </p>
      <button
        onClick={toggleTheme}
        className={`px-4 py-2 rounded ${
          isDarkMode ? "bg-white text-black" : "bg-gray-800 text-white"
        }`}
      >
        {isDarkMode ? (
          <Sun className="inline mr-2" />
        ) : (
          <Moon className="inline mr-2" />
        )}
        Toggle Theme
      </button>
    </div>
  );
};

// Main App component
const App = () => {
  return (
    <ThemeProvider>
      <ThemedComponent />
    </ThemeProvider>
  );
};

export default App;
