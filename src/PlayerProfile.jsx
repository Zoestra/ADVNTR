function PlayerProfile({player}){
    return (
         <div>
            <ul>
                <li><section className="field">Name: </section>{player.name}</li>
                <li><section className="field">Location: </section>{player.location}</li>
                <li><section className="field">Pronouns:</section>pronouns go here</li>
                <li><section className="field">Scheduling Availability:</section>{player.schedule}</li>
            </ul>
        </div>
    );
}

export default PlayerProfile;