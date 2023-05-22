import { UserResolver } from "./UserResolver";
import { mergeResolvers } from "@graphql-tools/merge";
export const resolvers = mergeResolvers([UserResolver]);
