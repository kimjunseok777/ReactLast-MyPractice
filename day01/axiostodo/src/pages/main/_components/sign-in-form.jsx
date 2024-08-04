import styled, { css } from "styled-components";
import FormInput from "../../../components/FormInput";
import TDButton from "../../../components/Button";
import { Form } from "./style";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthApi from "apis/auth.api";
import axios from "axios"

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

  //----------------------------------------------------------------------------
  // 로그인 기능 :

  const handlePressSignIn = async (data) => {
    try {
      const response = await AuthApi.signIn({
        email: data.email,
        password: data.password
      });
      if (response.data.ok) { //-->  이렇게 로그인 성공, 실패에 관해서 ok 에 true, false 를 할 수도 있고, 에러처리로 할 수도 있다

        //--------------------------------------------------------------
        // localStorage 저장 :
        
        // console.log(response.data.token)  //-->  토큰값 확인할 수 있다

        // localStorage.getItem("access_token", response.data.token) //-->  토큰 뿐만 아니라, 유저에 관한 데이터 여러개 localStorage 로 넣을 것이다
        localStorage.getItem("user", {
          data: response.data.token,
          info: response.data.info
        })

        // return navigate("/todo");
      }
      // alert(response.data.message);
      alert("아이디와 비밀번호를 확인해주세요");
      //--------------------------------------------------------------

    } catch (err) {
      console.log(err);
      alert("네트워크 연결이 불안정합니다");
    }
  };

  //----------------------------------------------------------------------------

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
