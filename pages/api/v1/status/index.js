import database from "../../../../infra/database.js"
//Request: o que é mandando na requisição
//Response: retorno da requisição

async function status(request, response) {
  var result = await database.query("SELECT 1+1 as SUM;");
  console.log(result.rows);
  response.status(200).json({ resposta: "Teste da api" });
}

export default status;
