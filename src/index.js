import {
    GraphQLServer
} from "graphql-yoga";

const typeDefs = `
    type Query {
        name: String!
        age: Int!
        location:String!
        bio: String!
    }
`


const user = {
    name: 'Jonathan',
    age: 26,
    location: 'Burlington ',
    bio: 'This is your typical bio!'
}



const resolvers = ({
    name,
    age,
    location,
    bio
}) => {
    return {
        Query: {
            name: () => {
                return ` My name is ${name}`
            },
            age: () => `My age is ${age}`,
            location: () => `My location is ${location}`,
            bio: () => `${bio}`
        }
    }
}

resolvers(user);

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => console.log(`Server is running`))