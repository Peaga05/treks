import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json(); //Pega o body da resposta e transforma em um Json
  expect(responseBody.update_at).toBeDefined();

  const parseUPdateAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parseUPdateAt);

  expect(responseBody.dependencies.database.version).toEqual("16.11")
  expect(responseBody.dependencies.database.max_connections).toEqual(100)
  expect(parseInt(responseBody.dependencies.database.open_connection)).toBe(1)
});
