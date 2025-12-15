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
        setMessage(""); // Clear messages when toggling
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoginLoading(true);
        setMessage("");
        
        try {
            const res = await auth.login({ 
                username,  // Changed from userName to match server expectation
                password 
            });
            
            if (res?.user) {
                setUser(res.user);
                setMessage("Login successful!");
                setToggleLogin(false); // Close login form
                setUsername(""); // Clear form
                setPassword(""); // Clear form
            } else {
                setMessage("Login failed. Please check your credentials.");
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoginLoading(false);
        }
    };

    const handleAccountCreate = async (newProfile) => {
        setMessage(""); // Clear previous messages
        
        try {
            // Call the register function (not createAccount)
            const res = await auth.register(newProfile);
            
            if (res?.message) {
                setMessage("Account created successfully! You can log in now.");
                setToggleAcctCreate(false); // Close the account creation form
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
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            {user ? (
                <div>
                    <h2>Welcome, {user.username}!</h2>
                    <button onClick={handleLogout}>Log Out</button>
                </div>
            ) : (
                <div style={{ marginBottom: '20px' }}>
                    <button 
                        onClick={loginVisible}
                        style={{ marginRight: '10px' }}
                    >
                        {toggleLogin ? "Close Login" : "Login"}
                    </button>
                    
                    <button onClick={createAcctVisible}>
                        {toggleAcctCreate ? "Cancel" : "Create Account"}
                    </button>
                </div>
            )}

            {toggleLogin && !user && (
                <form onSubmit={handleLoginSubmit} style={{ marginBottom: '20px' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>
                            Username:
                            <input 
                                type="text" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                                required 
                                style={{ marginLeft: '10px' }}
                            />
                        </label>
                    </div>
                    
                    <div style={{ marginBottom: '10px' }}>
                        <label>
                            Password:
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ marginLeft: '10px' }}
                            />
                        </label>
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={loginLoading}
                    >
                        {loginLoading ? "Logging in..." : "Log In"}
                    </button>
                </form>
            )}

            {toggleAcctCreate && !user && (
                <div style={{ marginTop: '20px' }}>
                    <ProfileForm onSubmit={handleAccountCreate} />
                </div>
            )}
            
            {message && (
                <div style={{ 
                    marginTop: '20px', 
                    padding: '10px', 
                    backgroundColor: message.includes('success') ? '#d4edda' : '#f8d7da',
                    color: message.includes('success') ? '#155724' : '#721c24',
                    borderRadius: '4px'
                }}>
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
}

export default AccountLogin;