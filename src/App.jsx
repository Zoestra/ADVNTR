import DMProfile from "./DMProfile";
import PlayerProfile from "./PlayerProfile";
import CampaignPost from "./campaignPost";

function App(){

    return(
        <div>
            <h1>ADVNTR</h1>
            <h2>Campaigns</h2>
            <ul>
                <li><CampaignPost /></li>
            </ul>
            <h2>Dungeon Masters</h2>
            <ul>
                <li><DMProfile /></li>
            </ul>
            <h2>Players</h2>
            <ul>
                <li>< PlayerProfile /></li>
            </ul>
        </div>
    );
}

export default App;