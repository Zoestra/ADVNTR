function DMProfile(dm){
    return (
        <div>
            <h1>Dungeon Master</h1>
            <ul>
                <li><section className="field">Name: </section>{dm.name}</li>
                <li><section className="field">Location: </section>{dm.location}</li>
                <li><section className="field">Pronouns:</section>pronouns go here</li>
                <li><section className="field">Scheduling Availability:</section>schedule goes here</li>
            </ul>
        </div>
    )
}

export default DMProfile;