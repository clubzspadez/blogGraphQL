import {
    GraphQLServer
} from "graphql-yoga";
import  uuidv4  from 'uuid/v4'

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
        add(a: Float!, b: Float!): Float!
        post: Post!
        posts(query: String): [Post!]!
        grades: [Int!]!
        addGrades(total: [Float!]!): Float!
        comments:[Comment!]!
        user: User!
        users(query: String) : [User!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        age: Int
        email: String!
        location:String!
        alive: Boolean!
        salary: Float!
        bio: String!
        posts: [Post!]!
        comments: [Comment!]!
    }
    
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment]
    }
    
    type Mutation {
        createUser(name:String!, email: String!, age:Int): User!
        createPost(title: String!, body: String!, published: Boolean!, author: String!): Post!
        createComment(text:String!, author:String!, post: String!): Comment!
    }
`



// const userInformation = {
//     name: 'Jonathan',
//     age: 26,
//     location: 'Burlington ',
//     bio: 'This is your typical bio!'
// }

const arrayOfComments = [{
        id: '1',
        text: 'Lolsdasdl asdlasdlasl asdlasdlalsda sjasdlll asldasldlasld asldlasdlasld asdlalsdlsad saldlasldl',
        author: 'kasdkjsadasd',
        post: `3`
    },
    {
        id: '2',
        text: 'Lolsdasdl asdlasdlasl asdlasdlalsda sjasdlll asldasldlasld asldlasdlasld asdlalsdlsad saldlasldl',
        author: 'NKCQJDMUIH1231',
        post: '1'
    },
    {
        id: '3',
        text: 'TESTETSTETSTTETSTETSTETSTETSETTETSTETSTETSTETSTETS TETSTETTESTETSTETST ',
        author: 'adjaskdjsakjd',
        post: '2'
    },
    {
        id: '4',
        text: 'Lolsdasdl asdlasdlasl asdlasdlalsda sjasdlll asldasldlasld asldlasdlasld asdlalsdlsad saldlasldl',
        author: 'adjaskdjsakjd',
        post: '2'
    }
]

const userInformation2 = [{
        id: 'NKCQJDMUIH1231',
        name: 'Jonathan',
        age: 26,
        location: 'Burlington ',
        bio: 'This is your typical bio!',
        alive: true
    },
    {
        id: 'kasdkjsadasd',
        name: 'Jose',
        age: 22,
        location: 'Atlanta ',
        bio: 'This is your typical bio!',
        alive: true
    }, {
        id: 'adjaskdjsakjd',
        name: 'Angel',
        age: 19,
        location: 'Worcester ',
        bio: 'This is your typical bio!',
        alive: true
    }
]


const postInformation = [{
        id: '1',
        title: 'Vacationing home',
        body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
     when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
     It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
     It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
     including versions of Lorem Ipsum. mass`,
        published: true,
        author: 'NKCQJDMUIH1231'
    },
    {
        id: '2',
        title: 'Walking in the sun',
        body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
     when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
     It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
     It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
     including versions of Lorem Ipsum. jrod`,
        published: false,
        author: 'kasdkjsadasd'
    },
    {
        id: '3',
        title: 'How to build a blog',
        body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
     when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
     It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
     It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
     including versions of Lorem Ipsum. test`,
        published: false,
        author: 'adjaskdjsakjd'
    }
]

const grades = [100, 90, 70]


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
const resolverSetup = (userInfo, postsArray, grades, arrayOfComments) => {
    return {
        Query: {
            users: (parent, args, context, info) => {
                if (!args.query) {
                    return userInfo
                }
                return userInfo.filter( user => user.name.toLowerCase().includes(args.query.toLowerCase()))
            },
            posts: (parent, args, context, info) => {
                if (!args.query) {
                    return postsArray
                }

                return postsArray.filter(post => post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase()))
            },
            add: (obj, args, context, info) => args.a + args.b,
            grades: (parent, args, context, info) => [...grades],
            addGrades: (parent, args, context, info) => (args.total.length !== 0 ? (args.total.reduce((acc, value) => acc + value)) / args.total.length : 0),
            comments: (parent, args, context, info) => {
                if (!args.query) return arrayOfComments
            },
            post: (parent, args, context, info) => ({
                id: '123213',
                title:'Vacation home town',
                body:'DIs is not a body, u know what i mean guurrl',
                published: false
            })
        },
        Mutation: {
            createUser: (parent, args, context, info)=> {
                //validate email
                //The some() method tests whether at least one element in the array passes the test implemented by the provided function.
                //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some

                const hasEmailBeenTaken = userInformation2.some( user =>  user.email === args.email)

                if(hasEmailBeenTaken) throw new Error("Email has been taken.")

                const user = {
                    id: uuidv4(),
                    name: args.name,
                    email: args. email,
                    age: args.age
                }
                userInformation2.push(user)
                return user
            },
            createPost: (parent, args, context, info)=> {
                //!  -> validate email
                //*  -> The some() method tests whether at least one element in the array passes the test implemented by the provided function.
                //?  -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
                const userExists = userInformation2.some( user =>  user.id === args.author)

                if(!userExists) throw new Error("User not found")

                const post = {
                    id: uuidv4(),
                    title: args.title,
                    body: args.body,
                    published: args.published,
                    author: args.author
                }
                postInformation.push(post)
                return post
            },
            createComment: (parent, args, context, info)=> {
                //!  -> validate user, post
                //*  -> The some() method tests whether at least one element in the array passes the test implemented by the provided function.
                //?  -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
                const userExists = userInformation2.some( user =>  user.id === args.author)
                const postExists = postInformation.some( post =>  post.id === args.post && post.published)


                if(!userExists) throw new Error("User not found")
                if(!postExists) throw new Error("Post not found")

                //*
                const comment = {
                    id: uuidv4(),
                    text: args.text,
                    author: args.author,
                    post: args.post
                }
                arrayOfComments.push(comment)
                return comment
            }
        },
        Post: {
            author: (parent, args, context, info) => {
                return userInfo.find((user) => user.id === parent.author)
            },
            comments: (parent, args, context, info) => {
                return arrayOfComments.filter( comments => parent.id === comments.post)
            }
        },
        User: {
            posts: (parent, args, context, info) => {
                return postsArray.filter((post) => post.author === parent.id)
            },
            comments:(parent, args, context, info) => {
                return arrayOfComments.filter((comment) => comment.author === parent.id)
            }
        },
        Comment:{
            author: (parent, args, context, info) => {
                return userInfo.find(user => user.id === parent.author);
            },
            post: (parent, args, context, info) => {
                return postInformation.find( post => post.id === parent.post )
            }
        }
    }
};

// const resolvers = resolverSetup(userInformation);
const resolvers = resolverSetup(userInformation2, postInformation, grades, arrayOfComments);

const server = new GraphQLServer({
    typeDefs,
    resolvers,
});

const options = { port: 4001 }

server.start(options ,() => console.log(`Server is running`));