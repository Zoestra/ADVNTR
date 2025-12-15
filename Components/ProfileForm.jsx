import { useState } from "react";

function ProfileForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [schedule, setSchedule] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newProfile = { name, location, schedule };

    try {
      const response = await fetch('http://localhost:5000/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProfile),
      });

      if (response.ok) {
        setMessage('Profile updated successfully!');
        onSubmit(newProfile);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }

    // Reset form
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
      <button type="submit">Save Profile</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default ProfileForm;