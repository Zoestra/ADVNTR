function UserCard({ user }) {
  return (
    <div className="user-card">
      <div className="user-card-header">
        <h3>{user.username}</h3>
        <span className="user-role">{user.role}</span>
      </div>

      <div className="user-card-body">
        <div className="user-row">
          <span className="label">Location</span>
          <span>{user.location || "Unknown"}</span>
        </div>

        <div className="user-row">
          <span className="label">Pronouns</span>
          <span>{user.pronouns || "Not listed"}</span>
        </div>

        <div className="user-row">
          <span className="label">Availability</span>
          <span>{user.schedule || "Flexible"}</span>
        </div>
      </div>

      <div className="user-card-footer">
        <button className="contact-btn">Contact</button>
      </div>
    </div>
  );
}

export default UserCard;
