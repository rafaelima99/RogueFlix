import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageRoot from "../../../components/PageRoot";
import FormField from "../../../components/FormField";
import useForm from "../../../hooks/useForm";
import Button from "../../../components/Button";

function CadastroCategoria() {
  const [categorias, setCategorias] = useState([]);
  const valoresIniciais = {
    titulo: "",
    descricao: "",
    cor: "",
  };

  const { values, handleChange, clearForm } = useForm(valoresIniciais);

  // ============

  useEffect(() => {
    if (window.location.href.includes("localhost")) {
      const URL = window.location.hostname.includes("localhost")
        ? "http://localhost:8080/categorias"
        : "https://rogue-flix.herokuapp.com/categorias";
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
      <h1>Cadastro de Categoria: {values.titulo}</h1>

      <form
        onSubmit={function handleSubmit(event) {
          event.preventDefault();

          setCategorias([...categorias, values]);

          clearForm();
        }}
      >
        <FormField
          label="Título da Categoria"
          type="text"
          name="titulo"
          placeholder="Filmes, jogos, etc."
          value={values.titulo}
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

        <Button>Cadastrar</Button>
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
