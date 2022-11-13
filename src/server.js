const hapi = require('@hapi/hapi');
const routes = require('./routes');

async function init() {
  const server = hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.info(`server is running in ${server.info.uri}`);
}

init();
