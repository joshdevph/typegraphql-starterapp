import "reflect-metadata"
require('dotenv').config()
import express, {Express, Request, Response} from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { createConnection } from "typeorm";
import cors from 'cors'
import {UserResolver} from "./resolvers/user";
import cookieParser from "cookie-parser";
import http from "http";

const main =async () => {

    //Initialize Express App
    const app : Express = express()

    // ! Middleware express
    app.use(cookieParser());

    // !Create HTTP Server
    const httpServer = http.createServer(app);

    //Create Connection to Database
    const db = await createConnection()

    //Create instance or Apollo Server
    const apolloServer = new ApolloServer({
        schema : await buildSchema({
            resolvers: [
                UserResolver
            ],
            validate: false
        }),
        introspection: true,
        //Add Plugin for GraphQL Playground
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
        context:async ({req, res, connection}: any) => {
            if (req){
                return{
                    db,
                    res,
                    session: req.session,
                    secret: process.env.APP_SECRET
                }
            }
        }
    })

    //Start Apollo Server
    await apolloServer.start()

    //Initialize ApolloServer Middleware
    apolloServer.applyMiddleware({app, path:"/graphql", cors: false})

    // ! CORS 
    app.use(
        cors({
            origin: ["http://localhost:3000"],
            credentials: true,
        })
    );

    httpServer.listen(process.env.PORT, () => console.log(`Server is Running on PORT:${process.env.PORT}`))
    app.get('/', (req: Request, res: Response) => res.send('Test'))
}

//Start Main App
main().catch((err) => console.log(err))