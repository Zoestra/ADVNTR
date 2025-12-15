import { useState } from "react";
import { auth } from "../API/auth.jsx";

function ProfileForm({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Player"); // Default to Player
  const [location, setLocation] = useState("");
  const [schedule, setSchedule] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    
    const newProfile = { 
      username, 
      password, 
      role, // Include role in the data
      location: location || null, 
      schedule: schedule || null 
    };

    try {
      const response = await auth.register(newProfile);
      
      if (response?.message) {
        setMessage(response.message);
        if (onSubmit) {
          onSubmit(newProfile);
        }
        // Reset form on success
        setUsername("");
        setPassword("");
        setRole("Player");
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
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Create Your Profile</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Username: *
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Choose a username"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </label>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Password: *
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="At least 6 characters"
            minLength="6"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </label>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          I am a: *
        </label>
        <div style={{ display: 'flex', gap: '20px', marginTop: '5px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input
              type="radio"
              name="role"
              value="Player"
              checked={role === "Player"}
              onChange={(e) => setRole(e.target.value)}
            />
            Player
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input
              type="radio"
              name="role"
              value="DM"
              checked={role === "DM"}
              onChange={(e) => setRole(e.target.value)}
            />
            Dungeon Master (DM)
          </label>
        </div>
        <div style={{ fontSize: '0.9em', color: '#666', marginTop: '5px' }}>
          {role === "Player" 
            ? "Join campaigns and play characters" 
            : "Create and manage campaigns for players"}
        </div>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, State (optional)"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </label>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Scheduling Availability:
          <input
            type="text"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            placeholder="e.g., Weekends, Mon/Wed evenings (optional)"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </label>
      </div>
      
      <button 
        type="submit" 
        disabled={loading}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: loading ? '#ccc' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '16px'
        }}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>
      
      {message && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: message.includes('success') ? '#d4edda' : '#f8d7da',
          color: message.includes('success') ? '#155724' : '#721c24',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}
    </form>
  );
}

export default ProfileForm;