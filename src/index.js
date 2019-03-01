import {
    GraphQLServer
} from "graphql-yoga";

//Firs example type definition
// const typeDefs = `
//     type Query {
//         name: String!
//         age: Int!
//         location:String!
//         bio: String!
//     }
// `

// second example type definition with all Scalar types
// const typeDefs = `
//     type Query {
//         id: ID!
//         name: String!
//         age: Int!
//         location:String!
//         alive: Boolean!
//         salary: Float!
//     }
// `;

// third example type definition with all Custom types
const typeDefs = `
    type Query {
        me: User
    }
    
    type User {
        id: ID!
        name: String!
        age: Int!
        location:String!
        alive: Boolean!
        salary: Float!
    }
`;



// const userInformation = {
//     name: 'Jonathan',
//     age: 26,
//     location: 'Burlington ',
//     bio: 'This is your typical bio!'
// }

const userInformation2 = {
    id: 'NKCQJDMUIH1231',
    name: 'Jonathan',
    age: 26,
    location: 'Burlington ',
    bio: 'This is your typical bio!',
    alive: true,
    salary: 21120123.223
};



// const resolverSetup = ({
//     id,
//     name,
//     age,
//     location,
//     alive,
//     salary
// }) => {
//     return {
//         Query: {
//             id: () =>  id,
//             name: () => ` My name is ${name}`,
//             age: () => age,
//             location: () => `My location is ${location}`,
//             alive: () => alive,
//             salary: () => salary
//         }
//     }
// };

//resolver with customer type being returned for me query
const resolverSetup = ({
                           id,
                           name,
                           age,
                           location,
                           alive,
                           salary
                       }) => {
    return {
        Query: {
            me: () => {
                return {
                    id,
                    name,
                    age,
                    location,
                    alive,
                    salary
                }
            }
        }
    }
};

// const resolvers = resolverSetup(userInformation);
const resolvers = resolverSetup(userInformation2);

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => console.log(`Server is running`));