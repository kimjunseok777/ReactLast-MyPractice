
import React from "react";
import styled, { css } from "styled-components";

const FormInput = ({
  label,
  size,
  containerStyle,
  error,
  name,
  register,
  ...props
}) => {
  return (
    <>
      <S.InputBox size={size}>
        <S.InputLabel>{label}</S.InputLabel>
        <S.Input size={size} name={name} {...props} {...register?.(name)} />
      </S.InputBox>
      <p
        style={{
          visibility: error ? "visible" : "hidden",
          color: "red",
          padding: 0,
          fontSize: 10,
        }}
      >
        {error}
      </p>
    </>
  );
};
export default FormInput;

const sizeCSS = {
  1: css`
    width: 100px;
    height: 30px;
  `,
  2: css`
    width: 300px;
    height: 48px;
  `,
  3: css`
    width: 100%;
    height: 48px;
  `,
};

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  /* margin-bottom: 16px; */
  // 컴포넌트에 마진을 주면, 마진이 다른 재사용하는 곳에서 재사용이 어렵습니다
  ${(props) => sizeCSS[props.size]}// css 문법
`;

const Input = styled.input`
  border: 1px solid #999;
  border-radius: 4px;
  padding-left: 16px;
  ${(props) => sizeCSS[props.size]} // css 문법
    &::placeholder {
    text-align: center;
  }
`;

const InputLabel = styled.label`
  position: absolute;
  left: 16px;
  top: -6px;
  font-size: 12px;
  background-color: #fff;
  z-index: 100;
  padding: 0 4px;
`;

const S = {
  Input,
  InputBox,
  InputLabel,
};