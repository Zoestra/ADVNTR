import { useState } from "react";
import DMCard from "../Components/DMCard.jsx";
import PlayerCard from "../Components/PlayerCard.jsx";
import CampaignCard from "../Components/CampaignCard.jsx";
import { DM_data } from "../Data/DM_data.js";
import { Player_data } from "../Data/Player_data.js";
import { Campaign_data } from "../Data/Campaign_data.js";
import Login from "../Components/Login.jsx"; 

function App() {
    const [locationFilter, setLocationFilter] = useState("");
    const [schedulingFilter, setSchedulingFilter] = useState(null);
    const [campaignNameFilter, setCampaignNameFilter] = useState("");
    const [playerNameFilter, setPlayerNameFilter] = useState("");
    const [dmNameFilter, setDMNameFilter] = useState("");
    const [user, setUser] = useState(null); // State for managing the logged-in user

    const generalFilter = (data) => {
        return (
            data.filter(data => data.location.toLowerCase()
                .includes(locationFilter.toLowerCase())
            ).filter(data => schedulingFilter === null || 
                data.schedule.includes(schedulingFilter) ||
                data.schedule === "All"
            )
        );
    };

    const handleLogin = (username) => {
        setUser(username); // Set the logged-in user
    };

    if (!user) {
        return <Login onLogin={handleLogin} />; // Show Login component if user is not logged in
    }

    return (
        <div>
            <h1>ADVNTR</h1>
            <p>Welcome, <b>{user}</b>!</p> {/* Greeting for the logged-in user */}
            <label>Location</label>
            <input type="text" placeholder="search by location" value={locationFilter}
                onChange={(event) => setLocationFilter(event.target.value)} />
                <label>Scheduling</label>
            <select
                value={schedulingFilter || ""}
                onChange={(event) => setSchedulingFilter(event.target.value || null)}>
                <option value="">All scheduling</option>
                <option value="Weeknights (Mon–Thu)">Weeknights (Mon–Thu)</option>
                <option value="Friday nights">Friday nights</option>
                <option value="Saturday mornings">Saturday mornings</option>
                <option value="Saturday afternoons">Saturday afternoons</option>
                <option value="Saturday evenings">Saturday evenings</option>
                <option value="Sunday mornings">Sunday mornings</option>
                <option value="Sunday afternoons">Sunday afternoons</option>
                <option value="Sunday evenings">Sunday evenings</option>
            </select>
            <h2>Campaigns</h2>
            <input type="text" placeholder="search by campaign name" value={campaignNameFilter}
                onChange={(event) => setCampaignNameFilter(event.target.value)} />
            {generalFilter(Campaign_data).filter(campaign => 
                campaign.name.toLowerCase().includes(campaignNameFilter.toLowerCase())
            ).map(campaign => (
                <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
            <h2>Dungeon Masters</h2>
            <input type="text" placeholder="search by user name" value={dmNameFilter}
                onChange={(event) => setDMNameFilter(event.target.value)} />
            {generalFilter(DM_data).filter(dm => 
                dm.name.toLowerCase().includes(dmNameFilter.toLowerCase())
            ).map(dm => (
                <DMCard key={dm.id} dm={dm} />
            ))}
            <h2>Players</h2>
            <input type="text" placeholder="search by user name" value={playerNameFilter}
                onChange={(event) => setPlayerNameFilter(event.target.value)} />
            {generalFilter(Player_data).filter(player => 
                player.name.toLowerCase().includes(playerNameFilter.toLowerCase())
            ).map(player => (
                <PlayerCard key={player.id} player={player} />
            ))}
        </div>
    );
}

export default App;
