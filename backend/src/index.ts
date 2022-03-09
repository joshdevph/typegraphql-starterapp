import "reflect-metadata"
import express, {Express, Request, Response} from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from "type-graphql";
import { UserResolver } from './resolvers/user'
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { createConnection } from "typeorm";
const main =async () => {
    //Create Connection to Database
    const connection = await createConnection({
        type: "postgres",
        database: "chatapp",
        entities: [],
        logging: true,
        synchronize: true,
        username: "root", // --- to change as ENV
        password: "root", // --- to change as ENV
        port: 5432
    })

    //Create instance or Apollo Server
    const apolloServer = new ApolloServer({
        schema : await buildSchema({
            resolvers: [UserResolver],
            validate: false
        }),
        //Add Plugin for GraphQL Playground
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground]
    })

    //Start Apollo Server
    await apolloServer.start()

    //Initialize Express App
    const app : Express = express()

    //Create Port to Listen
    const PORT = 8080

    //Initialize ApolloServer Middleware
    apolloServer.applyMiddleware({app})
    app.listen(PORT, () => console.log(`Server is Running on Port:${PORT}`))
    app.get('/', (req: Request, res: Response) => res.send('Test'))
}

//Start Main App
main().catch((err) => console.log(err))