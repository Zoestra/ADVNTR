function PlayerProfile(player){
    return (
         <div>
            <h1>Player</h1>
            <ul>
                <li><section className="field">Name: </section> {player.name}</li>
                <li><section className="field">Location: </section>{player.location}</li>
                <li><section className="field">Pronouns:</section>pronouns go here</li>
                <li><section className="field">Scheduling Availability:</section>schedule goes here</li>
            </ul>
        </div>
    );
}

export default PlayerProfile;