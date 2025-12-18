import { useEffect, useState } from "react";
import { fetcher } from "../API/fetcher.jsx";
import CampaignCard from "./CampaignCard.jsx";
import DMCard from "./DMCard.jsx";
import PlayerCard from "./PlayerCard.jsx";


function SearchFilter(){
    const [locationFilter, setLocationFilter] = useState("");
    const [schedulingFilter, setSchedulingFilter] = useState(null);
    const [campaignNameFilter, setCampaignNameFilter] = useState("");
    const [campaignStyleFilter, setCampaignStyleFilter] = useState("");
    const [playerNameFilter, setPlayerNameFilter] = useState("");
    const [dmNameFilter, setDMNameFilter] = useState("");
    
    const [campaigns, setCampaigns] = useState([]);
    const [players, setPlayers] = useState([]);
    const [dms, setDMs] = useState([]);

    useEffect(() => {
        const getData = async() => {
            try{
                const [c,d,p] = await Promise.all([
                    fetcher.campaign(),
                    fetcher.dm(),
                    fetcher.player()
                ]);

            setCampaigns(c.campaigns || []); // for campaigns stub
            setDMs(d.users || []);
            setPlayers(p.users || []);
            }catch(error){
                console.error("Error occurred fetching:", error);
            }
        }
        getData();
    }, [])

    const generalFilter = (data) => {
        return (
            data.filter(
                data => (data.location || "").toLowerCase().includes(locationFilter.toLocaleLowerCase())
            ).filter(
                data => schedulingFilter === null || (data.schedule || "").includes(schedulingFilter) || data.schedule === "All"
            ));
    };

    return(
        <div>
            
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
            <input type="text" placeholder="search by style" value={campaignStyleFilter}
                onChange={(evnet) => setCampaignStyleFilter(event.target.value)}></input>
                
                {generalFilter(campaigns).filter(campaign => (campaign.name || "").toLowerCase()
                    .includes((campaignNameFilter || "").toLowerCase())).filter(
                    campaign => campaign.style.toLocaleLowerCase().includes(campaignStyleFilter.toLowerCase()))
                    .map(campaign => (
                    <CampaignCard key={campaign.id} campaign={campaign} dms={dms}/>
                ))}

            <h2>Dungeon Masters</h2>
                <input type="text" placeholder="search by user name" value={dmNameFilter}
                    onChange={(event) => setDMNameFilter(event.target.value)}></input>

                { generalFilter(dms).filter(dm => (dm.username || "").toLowerCase()
                    .includes((dmNameFilter || "").toLowerCase())).map( dm => (
                    <DMCard key={dm.id} dm={dm} />
                )) }

            <h2>Players</h2>
                <input type="text" placeholder="search by user name" value={playerNameFilter}
                    onChange={(event) => setPlayerNameFilter(event.target.value)}></input>

                { generalFilter(players).filter(player => (player.username || "").toLowerCase()
                    .includes((playerNameFilter || "").toLowerCase())).map( player => (
                    <PlayerCard key={player.id} player={player} />
                ))}
        </div>
    )
}

export default SearchFilter;
