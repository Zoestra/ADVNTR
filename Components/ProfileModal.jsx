const RACES = [
  { id: "dragonborn", label: "Dragonborn", img: "/images/races/dragonborn.png" },
  { id: "dwarf", label: "Dwarf", img: "/images/races/dwarf.png" },
  { id: "elf", label: "Elf", img: "/images/races/elf.png" },
  { id: "gnome", label: "Gnome", img: "/images/races/gnome.png" },
  { id: "goliath", label: "Goliath", img: "/images/races/goliath.png" },
  { id: "halfling", label: "Halfling", img: "/images/races/halfling.png" },
  { id: "human", label: "Human", img: "/images/races/human.png" },
  { id: "orc", label: "Orc", img: "/images/races/orc.png" },
  { id: "tiefling", label: "Tiefling", img: "/images/races/tiefling.png" }
];

const PRONOUNS = ["She / Her", "He / Him", "They / Them", "Any"];

function ProfileModal({ user, profile, setProfile, onClose }) {
  const activeRace = RACES.find(r => r.id === profile.race);

  return (
    <div className="profile-modal-backdrop" onClick={onClose}>
      <div className="profile-modal" onClick={e => e.stopPropagation()}>
        <button className="profile-modal-close" onClick={onClose}>×</button>

        <img
          src={activeRace.img}
          alt={activeRace.label}
          className="profile-art"
        />

        <h2>{user.username}</h2>

        {/* PRONOUNS */}
        <div className="profile-section">
          <label className="profile-label">Pronouns</label>

          <div className="pronoun-group">
            {PRONOUNS.map(p => (
              <button
                key={p}
                className={`pronoun-btn ${
                  profile.pronouns === p ? "selected" : ""
                }`}
                onClick={() =>
                  setProfile(prev => ({ ...prev, pronouns: p }))
                }
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* STATUS */}
        <div className="profile-section">
          <label className="profile-label">Status</label>
          <input
            value={profile.status}
            onChange={e =>
              setProfile(prev => ({ ...prev, status: e.target.value }))
            }
          />
        </div>

        {/* RACES */}
        <h3>Choose Race</h3>
        <div className="race-grid">
          {RACES.map(race => (
            <button
              key={race.id}
              className={`race-option ${
                profile.race === race.id ? "selected" : ""
              }`}
              onClick={() =>
                setProfile(prev => ({ ...prev, race: race.id }))
              }
            >
              <img src={race.img} alt={race.label} className="race-thumb" />
              <span>{race.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
