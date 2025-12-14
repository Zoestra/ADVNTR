import SearchFilter from "../Components/SearchFilter.jsx";
import { useState, useEffect } from "react";
import AccountLogin from "../Components/AccountLogin.jsx";

function App(){

const [user, setUser] = useState(null);

useEffect(() => {
    async function loadUser() {
        const res = await fetch("/api/me", {//might need to change the route being fetched
        credentials: "include",
        });

        if (res.ok) {
            setUser(await res.json());
        }else{
        setUser(null);
        }};
        loadUser();
    }, []);

    return(
        <div>
            <AccountLogin user={user} setUser={setUser} />
            <SearchFilter />
        </div>
    );
}

export default App;
