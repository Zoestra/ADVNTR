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

    const generalFilter = (data) => {
        return (
            data.filter(
                data => data.location.toLowerCase().includes(locationFilter.toLocaleLowerCase())
            ).filter(
                data => schedulingFilter === null || data.schedule.includes(schedulingFilter) || data.schedule === "All"
            ));
    };

    return(
        <div>
            <h1>ADVNTR</h1>
            <input type="text" placeholder="search by location" value={locationFilter}
                onChange={(event) => setLocationFilter(event.target.value)}></input>
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
                {generalFilter(Campaign_data).map(campaign => (
                    <CampaignPost key={campaign.id} campaign={campaign} />
                ))}
            <h2>Dungeon Masters</h2>
                { generalFilter(DM_data).map( dm => (
                    <DMProfile key={dm.id} dm={dm} />
                )) }
            <h2>Players</h2>
                { generalFilter(Player_data).map( player => (
                    <PlayerProfile key={player.id} player={player} />
                ))}
        </div>
    );
}

export default App;