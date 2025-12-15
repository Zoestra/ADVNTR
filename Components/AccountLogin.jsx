import { useState } from "react";
import ProfileForm from "./ProfileForm.jsx";
import { auth } from "../API/auth.jsx";

function AccountLogin({ user, setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [toggleLogin, setToggleLogin] = useState(false);
    const [toggleAcctCreate, setToggleAcctCreate] = useState(false);
    const [message, setMessage] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);

    const loginVisible = () => setToggleLogin(prevState => !prevState);
    const createAcctVisible = () => {
        setToggleAcctCreate(prevState => !prevState);
        setMessage("");
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoginLoading(true);
        setMessage("");
        
        try {
            const res = await auth.login({ 
                username, 
                password 
            });
            
            if (res?.user) {
                setUser(res.user);
                setMessage(`Login successful! Welcome ${res.user.username} (${res.user.role})`);
                setToggleLogin(false);
                setUsername("");
                setPassword("");
            } else {
                setMessage("Login failed. Please check your credentials.");
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoginLoading(false);
        }
    };

    const handleAccountCreate = async (response) => {
        setMessage("");
        
        try {
            if (response?.success) {
                setMessage(`Account created successfully! Welcome ${response.username} (${response.role}). You can log in now.`);
                setToggleAcctCreate(false);
            } else {
                setMessage("Account creation failed. Please try again.");
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    const handleLogout = () => {
        setUser(null);
        setMessage("Logged out successfully!");
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            {user ? (
                <div style={{ textAlign: 'center' }}>
                    <h2>
                        Welcome, {user.username}! 
                        <span style={{
                            display: 'inline-block',
                            marginLeft: '10px',
                            padding: '2px 8px',
                            backgroundColor: user.role === 'DM' ? '#6a0dad' : '#2e7d32',
                            color: 'white',
                            borderRadius: '12px',
                            fontSize: '0.8em'
                        }}>
                            {user.role}
                        </span>
                    </h2>
                    <p>Role: {user.role === 'DM' ? 'Dungeon Master' : 'Player'}</p>
                    <button 
                        onClick={handleLogout}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Log Out
                    </button>
                </div>
            ) : (
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <button 
                        onClick={loginVisible}
                        style={{
                            marginRight: '10px',
                            padding: '10px 20px',
                            backgroundColor: toggleLogin ? '#6c757d' : '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        {toggleLogin ? "Close Login" : "Login"}
                    </button>
                    
                    <button 
                        onClick={createAcctVisible} 
                        style={{
                            padding: '10px 20px',
                            backgroundColor: toggleAcctCreate ? '#6c757d' : '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        {toggleAcctCreate ? "Cancel" : "Create Account"}
                    </button>
                </div>
            )}

            {toggleLogin && !user && (
                <form onSubmit={handleLoginSubmit} style={{ 
                    marginBottom: '20px', 
                    padding: '20px', 
                    border: '1px solid #ddd',
                    borderRadius: '8px'
                }}>
                    <h3 style={{ marginTop: 0 }}>Login</h3>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>
                            Username:
                            <input 
                                type="text" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                                required 
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </label>
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>
                            Password:
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </label>
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={loginLoading}
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: loginLoading ? '#ccc' : '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: loginLoading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loginLoading ? "Logging in..." : "Log In"}
                    </button>
                </form>
            )}

            {toggleAcctCreate && !user && (
                <div style={{ 
                    marginTop: '20px',
                    borderTop: '2px solid #eee',
                    paddingTop: '20px'
                }}>
                    <ProfileForm onSubmit={handleAccountCreate} />
                </div>
            )}
            
            {message && (
                <div style={{ 
                    marginTop: '20px', 
                    padding: '15px', 
                    backgroundColor: message.includes('success') ? '#d4edda' : message.includes('Error') ? '#f8d7da' : '#fff3cd',
                    color: message.includes('success') ? '#155724' : message.includes('Error') ? '#721c24' : '#856404',
                    borderRadius: '4px',
                    textAlign: 'center'
                }}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default AccountLogin;