//Request: o que é mandando na requisição
//Response: retorno da requisição

function status(request, response) {
  response.status(200).json({ resposta: "Teste da api" });
}

export default status;
