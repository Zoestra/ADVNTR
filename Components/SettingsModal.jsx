import { useState } from "react";

function SettingsModal({ user, onClose, onLogout, setUser }) {
  const [username, setUsername] = useState(user.username);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  /* =====================
     UPDATE USERNAME
  ====================== */
  async function handleUsernameUpdate() {
    setMessage("");

    const res = await fetch("http://localhost:3000/api/update-username", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        newUsername: username,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Failed to update username");
      return;
    }

    setUser(prev => ({ ...prev, username }));
    setMessage("Username updated successfully");
  }

  /* =====================
     UPDATE PASSWORD
  ====================== */
  async function handlePasswordUpdate() {
    setMessage("");

    const res = await fetch("http://localhost:3000/api/update-password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        currentPassword,
        newPassword,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Failed to update password");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setMessage("Password updated successfully");
  }

  /* =====================
     DELETE ACCOUNT
  ====================== */
  async function handleDeleteAccount() {
    const confirmDelete = window.confirm(
      "This will permanently delete your account. Are you sure?"
    );

    if (!confirmDelete) return;

    await fetch("http://localhost:3000/api/delete-account", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id }),
    });

    onLogout();
    onClose();
  }

  return (
    <div className="profile-modal-backdrop" onClick={onClose}>
      <div className="profile-modal" onClick={e => e.stopPropagation()}>
        <button className="profile-modal-close" onClick={onClose}>×</button>

        <h2>Account Settings</h2>
        {message && <p>{message}</p>}

        <div className="profile-section">
          <label className="profile-label">Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} />
          <button onClick={handleUsernameUpdate}>Save Username</button>
        </div>

        <div className="profile-section">
          <label className="profile-label">Change Password</label>
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <button onClick={handlePasswordUpdate}>Update Password</button>
        </div>

        <div className="profile-section">
          <label className="profile-label danger">Danger Zone</label>
          <button className="danger-btn" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
