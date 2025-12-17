import { useTheme } from "../src/context/ThemeContext";
import "./ThemeSelector.css";

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="theme-selector-row"
      data-theme-preview={theme}
    >
      {/* Left label */}
      <span className="theme-label">Theme</span>

      {/* Orb + hidden select wrapper */}
      <div className="theme-orb-wrapper">
        <select
          className="theme-select-hidden"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          aria-label="Color theme selector"
        >
          <option value="system">System Default</option>
          <option value="arcane-tavern">Arcane Tavern</option>
          <option value="draconic-blood">Draconic Blood</option>
          <option value="shadowfell">Shadowfell</option>
          <option value="deuteranopia">Deuteranopia Friendly</option>
          <option value="protanopia">Protanopia Friendly</option>
          <option value="high-contrast">Dungeon Master Mode</option>
        </select>

        <div className="theme-orb" aria-hidden="true" />
      </div>
    </div>
  );
}
