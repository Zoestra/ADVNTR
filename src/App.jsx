import SearchFilter from "../Components/SearchFilter.jsx";
import { useState } from "react";
import AccountLogin from "../Components/AccountLogin.jsx";

function App(){

    return(
        <div>
            <AccountLogin />
            <SearchFilter />
        </div>
    );
}

export default App;