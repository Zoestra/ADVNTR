function DMCard({dm}){
    return (
        <div>
            <ul>
                <li><section className="field">Name: </section>{dm.name}</li>
                <li><section className="field">Location: </section>{dm.location}</li>
                <li><section className="field">Pronouns:</section>{dm.pronouns}</li>
                <li><section className="field">Scheduling Availability:</section>{dm.schedule}</li>
            </ul>
        </div>
    )
}

export default DMCard;