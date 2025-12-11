function PlayerCard({player}){
    return (
         <div>
            <ul>
                <li><section className="field">Name: </section>{player.name}</li>
                <li><section className="field">Location: </section>{player.location}</li>
                <li><section className="field">Pronouns:</section>{player.pronouns}</li>
                <li><section className="field">Scheduling Availability:</section>{player.schedule}</li>
                <li><section className="field">Contact info:</section>{player.contact}</li>
            </ul>
        </div>
    );
}

export default PlayerCard;