import { useState } from "react";

function ProfileForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [schedule, setSchedule] = useState("");
  const [isDM, setIsDM] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProfile = { name, location, schedule };
    if (onSubmit) {
      onSubmit(newProfile);
    }
    // reset form
    setName("");
    setLocation("");
    setSchedule("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Your Profile</h2>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Scheduling Availability:
        <input
          type="text"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
        />
      </label>
      <br />
      <lable>
        Are you a DM or a player?
        <select value={isDM}
        onChange={(event) => setIsDM(event.target.value)}
        >
          <option value={true}>DM</option>
          <option value={false}>Player</option>
        </select>
      </lable>
      <button type="submit">Save Profile</button>
    </form>
  );
}

export default ProfileForm;
