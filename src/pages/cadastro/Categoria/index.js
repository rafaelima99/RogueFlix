import React, { useState } from "react";
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
    setValues({
      ...values,
      [key]: value,
    });
  }

  function handleChange(event) {
    setValue(event.target.getAttribute("name"), event.target.value);
  }

  return (
    <PageRoot>
      <h1>Cadastro de Categoria: {values.nome}</h1>

      <form
        style={{ background: values.cor }}
        onSubmit={function handleSubmit(change) {
          change.preventDefault();
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
          required={true}
        />

        <FormField
          label="Descrição (opcional)"
          type="textarea"
          name="descricao"
          placeholder="Descrição da categoria"
          value={values.descricao}
          onChange={handleChange}
          required={false}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          placeholder=""
          value={values.cor}
          onChange={handleChange}
          required={false}
        />
        <button>Cadastrar</button>
      </form>

      <ul>
        {categorias.map((categoria, indice) => {
          return <li key={`${categoria.nome}${indice}`}>{categoria.nome}</li>;
        })}
      </ul>

      <Link to="/">Ir para Home</Link>
    </PageRoot>
  );
}

export default CadastroCategoria;
