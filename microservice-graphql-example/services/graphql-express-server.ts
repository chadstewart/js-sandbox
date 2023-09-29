import { httpServer, server } from "../app";
import { app } from "../app";
import { expressMiddleware } from "@apollo/server/express4";
import { json } from "body-parser";
import cors from "cors";

const PORT = 4000;

const startServer = async () => {
    await server.start();

    app.use(
      '/graphql',
      cors<cors.CorsRequest>(),
      json(),
      expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
      }),
    );

    await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
    
    console.log(`🚀  Server ready at: http://localhost:4000/`);
};

startServer();