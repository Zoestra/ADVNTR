import { useState } from "react";
import { auth } from "../API/auth.jsx";

function ProfileForm({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [schedule, setSchedule] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDM, setIsDM] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    
    const newProfile = { 
      username, 
      password, 
      location: location || null, 
      schedule: schedule || null 
    };

    try {
      const response = await auth.register(newProfile);
      
      if (response?.message) {
        setMessage(response.message);
        if (onSubmit) {
          onSubmit(newProfile); // Pass data back to parent
        }
        // Reset form on success
        setUsername("");
        setPassword("");
        setLocation("");
        setSchedule("");
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Your Profile</h2>
      
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Choose a username"
          />
        </label>
      </div>
      
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Choose a password"
            minLength="6"
          />
        </label>
      </div>
      
      <div>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Your location (optional)"
          />
        </label>
      </div>
      
      <div>
        <label>
          Scheduling Availability:
          <input
            type="text"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            placeholder="e.g., Mon-Fri 9-5 (optional)"
          />
        </label>
      </div>
      
      <label>
        Are you a DM or a player?
        <select value={isDM}
        onChange={(event) => setIsDM(event.target.value)}
        >
          <option value={true}>DM</option>
          <option value={false}>Player</option>
        </select>
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Creating Account..." : "Create Account"}
      </button>
      
      {message && <p>{message}</p>}
    </form>
  );
}

export default ProfileForm;