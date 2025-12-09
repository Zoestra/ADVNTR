import { useState } from "react";

function AccountLogin() {
    const [visible, setVisible] = useState(false);
    const [user, setUser] = useState(null);

    const toggleVisible = () => setVisible(prevState => !prevState);

    return(
        <div>
            <button onClick={toggleVisible}>{visible ? "Close Login" : "Login"}</button>
            {visible && (
                <form>
                    Username:
                    <input type="text"></input>
                    Password:
                    <input type="password"></input>
                    <input type="submit"></input>
                </form>
            )}
        </div>
    )

}

export default AccountLogin;