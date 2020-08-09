import React from "react";
import styled, { css } from "styled-components";

function FormField({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  required,
}) {
  return (
    <div>
      <label>
        {label}:
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value.nome}
          onChange={onChange}
          required={required}
        />
      </label>
    </div>
  );
}

export default FormField;
