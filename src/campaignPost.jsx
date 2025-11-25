function CampaignPost({campaign}){
    return(
         <div>
            <ul>
                <li><section className="field">Name: </section> {campaign.name}</li>
                <li><section className="field">Location: </section>{campaign.location}</li>
                <li><section className="field">DM:</section>will link DM profile</li>
                <li><section className="field">Theme/Setting:</section>setting or theme goes here</li>
            </ul>
        </div>
    );
}

export default CampaignPost;