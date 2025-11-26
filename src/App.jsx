import { useState } from "react";
import DMProfile from "./DMProfile";
import PlayerProfile from "./PlayerProfile";
import CampaignPost from "./CampaignPost.jsx";
import {DM_data} from "./DM_data.js";
import {Player_data} from "./Player_data.js";
import {Campaign_data} from "./Campaign_data.js";

function App(){
    const [locationFilter, setLocationFilter] = useState("");
    const [schedulingFilter, setSchedulingFilter] = useState(null);
    
    const dm_filter = DM_data.filter(
        dm => dm.location.toLowerCase().includes(locationFilter.toLowerCase()));

    const player_filter = Player_data.filter(
        player => player.location.toLowerCase().includes(locationFilter.toLowerCase()));

    const campaign_filter= Campaign_data.filter(
        campaign => campaign.location.toLowerCase().includes(locationFilter.toLowerCase()));

    return(
        <div>
            <h1>ADVNTR</h1>
            <input type="text" placeholder="search by location" value={locationFilter}
                onChange={(event) => setLocationFilter(event.target.value)}></input>
            <h2>Campaigns</h2>
                {campaign_filter.map(campaign => (
                    <CampaignPost key={campaign.id} campaign={campaign} />
                ))}
            <h2>Dungeon Masters</h2>
                { dm_filter.map( dm => (
                    <DMProfile key={dm.id} dm={dm} />
                )) }
            <h2>Players</h2>
                { player_filter.map( player => (
                    <PlayerProfile key={player.id} player={player} />
                ))}
        </div>
    );
}

export default App;