import config from "../config";

const URL_CATEGORIES = `${config.URL_BACKEND}/categorias`;

function getAll() {
  return fetch(`${URL_CATEGORIES}`).then(async (respostaDoServer) => {
    if (respostaDoServer.ok) {
      const resposta = await respostaDoServer.json();
      return resposta;
    }
    throw new Error("Não foi possível pegar os dados");
  });
}

function getAllWithVideos() {
  console.log(`${URL_CATEGORIES}?_embed=videos`);

  return fetch(`${URL_CATEGORIES}?_embed=videos`).then(
    async (respostaDoServer) => {
      if (respostaDoServer.ok) {
        const resposta = await respostaDoServer.json();
        return resposta;
      }
      throw new Error("Não foi possível pegar os dados");
    }
  );
}

export default {
  getAllWithVideos,
  getAll,
};
