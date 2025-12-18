function CampaignCard({campaign, dms}){
    return(
         <div>
            <ul>
              <li><section className="field">Name: </section> {campaign.name}</li>
              <li><section className="field">Location: </section>{campaign.location}</li>
              <li><section className="field">DM:</section>{ dms.find(dm => dm.id === campaign.dm)?.username || "Unknown" }</li>
              <li><section className="field">Contact:</section>{ dms.find(dm => dm.id === campaign.dm)?.contact || "N/A" }</li>
              <li><section className="field">Theme/Setting:</section>{campaign.style}</li>
      </ul>
        </div>
    );
}

export default CampaignCard;
