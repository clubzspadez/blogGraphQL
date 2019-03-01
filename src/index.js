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
// const typeDefs = `
//     type Query {
//         me: User
//     }
//
//     type User {
//         id: ID!
//         name: String!
//         age: Int
//         location:String!
//         alive: Boolean!
//         salary: Float!
//     }
// `;

const typeDefs = `
    type Query {
        me: User
        post: Post
    }

    type User {
        id: ID!
        name: String!
        age: Int
        location:String!
        alive: Boolean!
        salary: Float!
    }
    
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`



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

const postInformation = {
    id: '12354',
    title: 'Test Name for blog post',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
     when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
     It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
     It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
     including versions of Lorem Ipsum.`,
    published: false
}


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
const resolverSetup = ( userInfo, post) => {
    return {
        Query: {
            me: ({id,
                 name,
                 age,
                 location,
                 alive,
                 salary } = userInfo) => {
                return {
                    id,
                    name,
                    age,
                    location,
                    alive,
                    salary
                }
            },
            post: ({id, title, body, published} = post) => {
                return {
                    id,
                    title,
                    body,
                    published
                }
            }
        }
    }
};

// const resolvers = resolverSetup(userInformation);
const resolvers = resolverSetup(userInformation2, postInformation);

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => console.log(`Server is running`));