import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageRoot from "../../../components/PageRoot";
import FormField from "../../../components/FormField";

function CadastroCategoria() {
  const valoresIniciais = {
    nome: "",
    descricao: "",
    cor: "",
  };
  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(valoresIniciais);

  function setValue(key, value) {
    // chave: nome, descricao, bla, bli
    setValues({
      ...values,
      [key]: value, // nome: 'valor'
    });
  }

  function handleChange(event) {
    setValue(event.target.getAttribute("name"), event.target.value);
  }

  // ============

  useEffect(() => {
    if (window.location.href.includes("localhost")) {
      const URL = "http://localhost:8080/categorias";
      fetch(URL).then(async (respostaDoServer) => {
        if (respostaDoServer.ok) {
          const resposta = await respostaDoServer.json();
          setCategorias(resposta);
          return;
        }
        throw new Error("Não foi possível pegar os dados");
      });
    }
  }, []);

  return (
    <PageRoot>
      <h1>Cadastro de Categoria: {values.nome}</h1>

      <form
        onSubmit={function handleSubmit(event) {
          event.preventDefault();

          setCategorias([...categorias, values]);

          setValues(valoresIniciais);
        }}
      >
        <FormField
          label="Nome da Categoria"
          type="text"
          name="nome"
          placeholder="Filmes, jogos, etc."
          value={values.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição (opcional):"
          type="textarea"
          name="descricao"
          placeholder="Descrição da categoria"
          value={values.descricao}
          onChange={handleChange}
        />
        {/* <div>
          <label>
            Descrição:
            <textarea
              type="text"
              value={values.descricao}
              name="descricao"
              onChange={handleChange}
            />
          </label>
        </div> */}

        <FormField
          label="Cor"
          type="color"
          name="cor"
          placeholder=""
          value={values.cor}
          onChange={handleChange}
        />
        {/* <div>
          <label>
            Cor:
            <input
              type="color"
              value={values.cor}
              name="cor"
              onChange={handleChange}
            />
          </label>
        </div> */}

        <button>Cadastrar</button>
      </form>

      <ul>
        {categorias.map((categoria, indice) => {
          return <li key={`${categoria}${indice}`}>{categoria.titulo}</li>;
        })}
      </ul>

      <Link to="/">Ir para home</Link>
    </PageRoot>
  );
}

export default CadastroCategoria;
