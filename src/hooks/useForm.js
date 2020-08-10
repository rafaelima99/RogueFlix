import { useState } from "react";

function useForm(valoresIniciais) {
  const [values, setValues] = useState(valoresIniciais);
  function setValue(key, value) {
    // chave: titulo, descricao, bla, bli
    setValues({
      ...values,
      [key]: value, // titulo: 'valor'
    });
  }

  function handleChange(event) {
    setValue(event.target.getAttribute("name"), event.target.value);
  }

  function clearForm() {
    setValues(valoresIniciais);
  }

  return { values, handleChange, clearForm };
}

export default useForm;
