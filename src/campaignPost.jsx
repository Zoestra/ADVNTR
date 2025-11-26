import { DM_data } from "./DM_data";
function CampaignPost({campaign}){
    return(
         <div>
            <ul>
                <li><section className="field">Name: </section> {campaign.name}</li>
                <li><section className="field">Location: </section>{campaign.location}</li>
                <li><section className="field">DM:</section>{ DM_data.find(dm => dm.id === campaign.dm).name }</li>
                <li><section className="field">Theme/Setting:</section>setting or theme goes here</li>
            </ul>
        </div>
    );
}

export default CampaignPost;