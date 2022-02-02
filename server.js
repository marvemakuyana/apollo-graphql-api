const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`
    type Person {
        name: String
        height: String
        mass: String
        gender: String
        homeworld: String
    }

    type Query{
        people: [Person]
    }
`

const resolvers = {
    Query: {
        people: async () => {
            try {
                const people = await axios.get('https://swapi.dev/api/people/');
                return people.data.results.map(({ name, height, mass, gender, homeworld }) => ({
                    name,
                    height,
                    mass,
                    gender,
                    homeworld,
                }))

            } catch (error) {
                throw error
            }
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => console.log(`Server ready at ${url}`))