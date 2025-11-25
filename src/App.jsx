import { useState } from "react";
import DMProfile from "./DMProfile";
import PlayerProfile from "./PlayerProfile";
import CampaignPost from "./campaignPost";
import DM_data from "./DM_data.js";
import Player_data from "./Player_data.js";

function App(){
    const [locationFilter, setLocationFilter] = useState("");
    
    const dm_filter = DM_data.filter(
        dm => dm.location.toLowerCase().includes(locationFilter.toLowerCase()));

    const player_filter = Player_data.filter(
        player => player.location.toLowerCase().includes(locationFilter.toLowerCase()));

    {/* Assuming campaigns, DMs, and players will be stored as an array.
        We would filter on the back-end if this system were handling large data-sets.
        Maybe back-end filtering as a stretch-goal? */}
    return(
        <div>
            <h1>ADVNTR</h1>
            <h2>Campaigns</h2>
            <ul>
                <li><CampaignPost /></li>
            </ul>
            <h2>Dungeon Masters</h2>
            <input type="text" placeholder="search by location" value={locationFilter} 
                onChange={(event) => setLocationFilter(event.target.value)}></input>
                { dm_filter.map( dm => (
                    <DMProfile key={dm.id} dm={dm} />
                )) }
            <h2>Players</h2>
            <input type="text" placeholder="search by location" value={locationFilter}
            onChange={(event) => setLocationFilter(event.target.value)}></input>
                { player_filter.map( player => (
                    <PlayerProfile key={player.id} player={player} />
                )) }
        </div>
    );
}

export default App;