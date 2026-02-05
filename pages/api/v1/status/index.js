import database from "infra/database.js"

//Request: o que é mandando na requisição
//Response: retorno da requisição

export default async function status(request, response) {
  const updateAt = new Date().toISOString();

  const postgresVersionQuery = await database.query("SHOW server_version;")
  const postgresVersion = postgresVersionQuery.rows[0].server_version;;

  const maxConnectionQuery = await database.query("SHOW max_connections;");
  const maxConnections = maxConnectionQuery.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const usedConnectionQuery = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName]
  });

  const openConnection = usedConnectionQuery.rows[0].count;

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: postgresVersion,
        max_connections: parseInt(maxConnections),
        open_connection: openConnection,
      }
    },
  });
}