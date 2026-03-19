import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  return await response.json();
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdateAt />
    </>
  );

  function UpdateAt() {
    //O primeiro parametro indica a chave, ela é usada para evitar duplicação nas chamadas
    //Nesse caso estamos injetando a chave no fetchAPI como a rota da chamada
    //Quando a consulta for finalizada o SWR avisa para o React e ele atualiza a página
    const { data, isLoading } = useSWR("/api/v1/status", fetchAPI);

    let updateAtText = "Carregando...";

    if (!isLoading && data) {
      updateAtText = new Date(data.update_at).toLocaleString("pt-BR");
    }

    if (isLoading) {
      return <div>{updateAtText}</div>;
    }
    return (
      <>
        <p>Última atualização {updateAtText}</p>
        <hr />
        <h2>Database</h2>
        <p>Versão: {data.dependencies.database.version}</p>
        <p>Conexões Abertas: {data.dependencies.database.open_connection}</p>
        <p>Conexões Máximas: {data.dependencies.database.max_connections}</p>
      </>
    );
  }
}
