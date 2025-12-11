import { DM_data } from "../Data/DM_data";
function CampaignCard({campaign}){
    return(
         <div>
            <ul>
                <li><section className="field">Name: </section> {campaign.name}</li>
                <li><section className="field">Location: </section>{campaign.location}</li>
                <li><section className="field">DM:</section>{ DM_data.find(dm => dm.id === campaign.dm).name }</li>
                <li><section className="field">Contact:</section>{ DM_data.find(dm => dm.id === campaign.dm).contact }</li>
                <li><section className="field">Theme/Setting:</section>{campaign.style}</li>
            </ul>
        </div>
    );
}

export default CampaignCard;