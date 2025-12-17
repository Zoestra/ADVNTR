import { useEffect, useRef, useState } from "react";
import "./ProfileMenu.css";

export default function ProfileMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="profile-menu" ref={ref}>
      {/* Avatar button */}
      <button
        className="profile-avatar"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open profile menu"
      >
        {user.username[0].toUpperCase()}
      </button>

      {open && (
        <div className="profile-dropdown">
          <div className="profile-header">
            <div className="profile-avatar large">
              {user.username[0].toUpperCase()}
            </div>

            <div className="profile-meta">
              <div className="profile-name">{user.username}</div>
              <div className="profile-role">
                {user.role === "DM" ? "Dungeon Master" : "Player"}
              </div>
            </div>
          </div>

          <div className="profile-divider" />

          <button className="profile-item">Profile</button>
          <button className="profile-item">Settings</button>

          <div className="profile-divider" />

          <button className="profile-item danger" onClick={onLogout}>
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
