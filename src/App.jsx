import { useState } from "react";
import DMProfile from "./DMProfile";
import PlayerProfile from "./PlayerProfile";
import CampaignPost from "./CampaignPost.jsx";
import {DM_data} from "./DM_data.js";
import {Player_data} from "./Player_data.js";
import {Campaign_data} from "./Campaign_data.js";

function App(){
    const [locationFilterDM, setLocationFilterDM] = useState("");
    const [locationFilterPlayer, setLocationFilterPlayer] = useState("");
    const [locationFilterCampaign, setLocationFilterCampaign] = useState("");
    
    const dm_filter = DM_data.filter(
        dm => dm.location.toLowerCase().includes(locationFilterDM.toLowerCase()));

    const player_filter = Player_data.filter(
        player => player.location.toLowerCase().includes(locationFilterPlayer.toLowerCase()));

    const campaign_filter= Campaign_data.filter(
        campaign => campaign.location.toLowerCase().includes(locationFilterCampaign.toLowerCase()));

    return(
        <div>
            <h1>ADVNTR</h1>
            <h2>Campaigns</h2>
            <input type="text" placeholder="search by location" value={locationFilterCampaign}
                onChange={(event) => setLocationFilterCampaign(event.target.value)}></input>
                {campaign_filter.map(campaign => (
                    <CampaignPost key={campaign.id} campaign={campaign} />
                ))}
            <h2>Dungeon Masters</h2>
            <input type="text" placeholder="search by location" value={locationFilterDM} 
                onChange={(event) => setLocationFilterDM(event.target.value)}></input>
                { dm_filter.map( dm => (
                    <DMProfile key={dm.id} dm={dm} />
                )) }
            <h2>Players</h2>
            <input type="text" placeholder="search by location" value={locationFilterPlayer}
                onChange={(event) => setLocationFilterPlayer(event.target.value)}></input>
                { player_filter.map( player => (
                    <PlayerProfile key={player.id} player={player} />
                ))}
        </div>
    );
}

export default App;