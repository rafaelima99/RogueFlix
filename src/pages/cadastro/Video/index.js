import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import PageRoot from "../../../components/PageRoot";
import FormField from "../../../components/FormField";
import useForm from "../../../hooks/useForm";
import Button from "../../../components/Button";
import videosRepository from "../../../repositories/videos";
import categoriasRepository from "../../../repositories/categorias";

function CadastroVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  const { handleChange, values } = useForm({
    titulo: "",
    url: "",
    categoria: "",
  });

  useEffect(() => {
    categoriasRepository.getAll().then((categoriasFromServer) => {
      setCategorias(categoriasFromServer);
    });
  }, []);

  console.log(categoryTitles);

  return (
    <PageRoot>
      <h1>Cadastro de vídeo</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();

          const categoriaEscolhida = categorias.find((categoria) => {
            return categoria.titulo === values.categoria;
          });

          console.log("categoriaEscolhida", categoriaEscolhida);

          videosRepository
            .create({
              titulo: values.titulo,
              url: values.url,
              categoriaId: categoriaEscolhida.id,
            })
            .then(() => {
              console.log("Cadastrou com sucesso!");
              history.push("/");
            });
        }}
      >
        <FormField
          label="Título do Vídeo"
          type="text"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="URL"
          type="text"
          name="url"
          value={values.url}
          onChange={handleChange}
        />

        <FormField
          label="Categoria"
          type="text"
          name="categoria"
          value={values.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
        />

        <Button type="submit">Cadastrar</Button>
      </form>
      <Link to="/cadastro/categoria">Cadastrar categoria</Link>
    </PageRoot>
  );
}

export default CadastroVideo;
