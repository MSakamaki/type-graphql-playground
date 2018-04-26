import 'reflect-metadata';
import { GraphQLServer, Options } from 'graphql-yoga';

import { RecipeResolver } from './schema';
import { buildSchema } from 'type-graphql';
import { RouterResolver } from './nw.schema.rsolver';

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [RecipeResolver, RouterResolver],
  });
  const server = new GraphQLServer({ schema });

  const serverOptions: Options = {
    port: 4000,
    endpoint: '/graphql',
    playground: '/playground',
  };

  server.start(serverOptions, ({ port, playground }) => {
    console.log(
      `Server is running, GraphQL Playground available at http://localhost:${port}${playground}`,
    );
  });
}

bootstrap();
