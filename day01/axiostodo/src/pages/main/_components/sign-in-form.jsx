import styled, { css } from "styled-components";
import FormInput from "../../../components/FormInput";
import TDButton from "../../../components/Button";
import { Form } from "./style";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const singInFormSchema = yup.object().shape({
  email: yup.string().email("이메일 양식이 일치하지 않습니다").required(" "),
  password: yup
    .string()
    .min(8, "비밀번호는 8글자 이상이어야합니다.")
    .required(" "),
});

const SignInForm = () => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(singInFormSchema),
  });

  const handlePressSignIn = async (data) => {
    try {
      const response = await fetch("/api/user/login", {
        method: "post",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      const response_data = await response.json();

      if (response_data.status === 200) {
        navigate("/todo/3");
      }
    } catch (err) {
      console.log(err);
      alert("아이디와 비밀번호를 확인해주세요");
    }
  };

  return (
    <S.Form onSubmit={handleSubmit(handlePressSignIn)}>
      <FormInput
        label={"이메일"}
        placeholder={"email"}
        size={2}
        name="email"
        register={register}
        error={errors.email?.message}
      />
      <FormInput
        label={"비밀번호"}
        size={1}
        containerStyle={css`
          width: 100px;
        `}
        name="password"
        register={register}
        error={errors.password?.message}
      />
      <TDButton variant={"secondary"} size={"medium"} disabled={!isValid}>
        로그인
      </TDButton>
    </S.Form>
  );
};
export default SignInForm;

const Input = styled.input`
  border: 1px solid #999;
  width: 100%;
  border-radius: 4px;
  padding-left: 16px;
  height: 48px;
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
  Form,
  InputLabel,
  Input,
};
