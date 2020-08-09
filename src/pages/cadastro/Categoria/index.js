import React from "react";
import { Link } from "react-router-dom";
import PageRoot from "../../../components/PageRoot";

function CadastroCategoria() {
  return (
    <PageRoot>
      <h1>Cadastro de Categoria</h1>
      <Link to="/">Ir para Home</Link>
    </PageRoot>
  );
}

export default CadastroCategoria;
