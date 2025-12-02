import { useState } from "react";
import DMCard from "./DMCard.jsx";
import PlayerCard from "./PlayerCard";
import CampaignCard from "./CampaignCard.jsx";
import {DM_data} from "./DM_data.js";
import {Player_data} from "./Player_data.js";
import {Campaign_data} from "./Campaign_data.js";

function App(){
    const [locationFilter, setLocationFilter] = useState("");
    const [schedulingFilter, setSchedulingFilter] = useState(null);
    const [campaignNameFilter, setCampaignNameFilter] = useState("");
    const [playerNameFilter, setPlayerNameFilter] = useState("");
    const [dmNameFilter, setDMNameFilter] = useState("");

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
            Location
            <input type="text" placeholder="search by location" value={locationFilter}
                onChange={(event) => setLocationFilter(event.target.value)}></input>
            Scheduling
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
                onChange={(event) => setCampaignNameFilter(event.target.value)}></input>
                {generalFilter(Campaign_data).filter(campaign => campaign.name.toLowerCase()
                    .includes(campaignNameFilter.toLowerCase())).map(campaign => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
            <h2>Dungeon Masters</h2>
                <input type="text" placeholder="search by user name" value={dmNameFilter}
                    onChange={(event) => setDMNameFilter(event.target.value)}></input>
                { generalFilter(DM_data).filter(dm => dm.name.toLowerCase()
                    .includes(dmNameFilter.toLowerCase())).map( dm => (
                    <DMCard key={dm.id} dm={dm} />
                )) }
            <h2>Players</h2>
                <input type="text" placeholder="search by user name" value={playerNameFilter}
                    onChange={(event) => setPlayerNameFilter(event.target.value)}></input>
                { generalFilter(Player_data).filter(player => player.name.toLowerCase()
                    .includes(playerNameFilter.toLowerCase())).map( player => (
                    <PlayerCard key={player.id} player={player} />
                ))}
        </div>
    );
}

export default App;