import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express, { Application } from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
// The GraphQL schema
import { typeDefs } from "./graphQL/schema";
import { resolvers } from "./graphQL/resolvers";

const app: Application = express();
const httpServer: http.Server = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function startServer() {
  try {
    await mongoose.connect("mongodb://localhost:27017/my-app");
    console.log("Connected to MongoDB");
    await server.start();
    app.use(cors(), bodyParser.json(), expressMiddleware(server));
    await new Promise<void>((resolve) =>
      httpServer.listen({ port: 4000 }, resolve)
    );
    console.log(`🚀 Server ready at http://localhost:4000`);
  } catch (err) {
    console.error(err);
  }
}

startServer().catch((err) => {
  console.error(err);
  process.exit(1);
});
