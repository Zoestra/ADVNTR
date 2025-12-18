import { useEffect, useRef, useState } from "react";
import ThemeSelector from "./ThemeSelector.jsx";

function AccountDropdown({
  user,
  profile,
  onLogout,
  onOpenProfile,
  onOpenSettings,
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="account-menu-wrapper" ref={wrapperRef}>
      {/* Avatar button */}
      <button
        className="account-avatar-btn"
        onClick={() => setOpen(o => !o)}
      >
        <img
          src={`/images/races/${profile.race}.png`}
          alt="avatar"
          className="account-avatar"
        />
      </button>

      {open && (
        <div className="account-dropdown">
          {/* Profile header */}
          <button
            className="account-dropdown-header clickable"
            onClick={() => {
              setOpen(false);
              onOpenProfile();
            }}
          >
            <img
              src={`/images/races/${profile.race}.png`}
              className="account-avatar large"
            />

            <div className="account-user-info">
              <div className="account-name-row">
                <span className="account-name">{user.username}</span>
                <span className="account-chevron">›</span>
              </div>
              <div className="account-role">
                {user.role === "DM" ? "Dungeon Master" : "Player"}
              </div>
            </div>
          </button>

          {/* Menu list */}
          <ul className="account-dropdown-list">
            {/* THEME SELECTOR (functional now) */}
            <li className="theme-item">
              <ThemeSelector />
            </li>

            <li
              onClick={() => {
                setOpen(false);
                onOpenSettings();
              }}
            >
              Settings
            </li>

            <li className="divider" />

            <li
              className="logout"
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
            >
              Log out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default AccountDropdown;
