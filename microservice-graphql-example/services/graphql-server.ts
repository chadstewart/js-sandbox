import { server } from "../app";
import { startStandaloneServer } from "@apollo/server/standalone";

const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 }
    });
    
    console.log(`🚀  Server ready at: ${url}`);
};

startServer();