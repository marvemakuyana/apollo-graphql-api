import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from 'graphql-tag';

const GET_PEOPLE = gql`
    {
        people  {
            name
            height
            mass
            gender
            homeworld
        }
    }
`

const Person = ({ person: { name, height, mass, gender, homeworld } }) => (
    <div className="card">

        <h3>{name}</h3>

        <div>
            <p className="details">Height: {height}</p>
            <p className="details">Mass: {mass}</p>
            <p className="details">Gender: {gender}</p>
            <p className="details">Homeworld: {homeworld}</p>
        </div>
    </div>
)

const HomePage = () => {
    const { loading, error, data } = useQuery(GET_PEOPLE);

    if (error) return <h1>Something went wrong!</h1>
    if (loading) return <h1>Loading...</h1>
    console.log(data)

    return (
        <main className="App">
            <h1>Star Wars | People List</h1>
            {data.people.map((person, index) => (
                <Person key={index} person={person} />

            ))}
        </main>
    )
}
export default HomePage