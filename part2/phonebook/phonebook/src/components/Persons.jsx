const Person = ({ name, number, deletePerson}) => {
    return (
        <div>
            {name} {number}
            <button onClick={deletePerson}>delete</button>
        </div>
    )
}

const Persons = ({ personsToShow, deletePerson}) => {
    return (
        <div>
        {personsToShow.map(person =>
            <Person 
                key={person.name}
                name={person.name}
                number={person.number}
                deletePerson={() => deletePerson(person.id)}
            />
        )}
        </div>
    )
}

export default Persons