import { useState } from "react";
import ProfileForm from "./ProfileForm.jsx";

function AccountLogin() {
    const [toggleLogin, setToggleLogin] = useState(false);
    const [toggleAcctCreate, setToggleAcctCreate] = useState(false);

    const loginVisible = () => setToggleLogin(prevState => !prevState);
    const createAcctVisible = () => setToggleAcctCreate(prevState => !prevState)

    return(
        <div>
            <button onClick={loginVisible}>{toggleLogin ? "Close Login" : "Login"}</button>
            {toggleLogin && (
                <form>
                    Username:
                    <input type="text"></input>
                    Password:
                    <input type="password"></input>
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