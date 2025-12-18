import { useState } from "react";
import { auth } from "../API/auth.jsx";
import ProfileForm from "./ProfileForm.jsx";

function AccountLogin({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toggleLogin, setToggleLogin] = useState(false);
  const [toggleAcctCreate, setToggleAcctCreate] = useState(false);
  const [message, setMessage] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setMessage("");

    try {
      const res = await auth.login({ username, password });
      if (res?.user) {
        setUser(res.user);
        setToggleLogin(false);
        setUsername("");
        setPassword("");
      } else {
        setMessage("Login failed.");
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={() => setToggleLogin(v => !v)}>
        {toggleLogin ? "Close Login" : "Login"}
      </button>

      <button onClick={() => setToggleAcctCreate(v => !v)}>
        {toggleAcctCreate ? "Cancel" : "Create Account"}
      </button>

      {toggleLogin && (
        <form onSubmit={handleLoginSubmit}>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" disabled={loginLoading}>
            {loginLoading ? "Logging in…" : "Log In"}
          </button>
        </form>
      )}

      {toggleAcctCreate && (
        <ProfileForm onSubmit={() => setToggleAcctCreate(false)} />
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default AccountLogin;
