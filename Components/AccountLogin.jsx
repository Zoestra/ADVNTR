import { useState } from "react";
import ProfileForm from "./ProfileForm.jsx";
import { auth } from "../API/auth.jsx";

function AccountLogin({ user, setUser }) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [toggleLogin, setToggleLogin] = useState(false);
    const [toggleAcctCreate, setToggleAcctCreate] = useState(false);

    const loginVisible = () => setToggleLogin(prevState => !prevState);
    const createAcctVisible = () => setToggleAcctCreate(prevState => !prevState)

    const handleSubmit = async(e) => {
        e.preventDefault();
        const res = await auth.login({userName, password});
        console.log(res);
    }

    return(
        <div>{
                user ? (
                <div>Welcome, {user.userName}!
                <button onClick={() => setUser(null)}>Log Out</button>
                </div>
            ):  <button onClick={loginVisible}>{toggleLogin ? "Close Login" : "Login"}</button>
        }{toggleLogin && (
                <form onSubmit={handleSubmit}>
                    Username:
                    <input 
                        type="text" 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)}
                        required />
                    Password:
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    <input type="submit"></input>
                </form>
            )}
            <button onClick={createAcctVisible}>Create Account</button>
                    {toggleAcctCreate && (
                        <ProfileForm />
                    )}
           
        </div>
    )

}

export default AccountLogin;