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
import { useAuth } from "providers/auth-provider";

const singInFormSchema = yup.object().shape({
  email: yup.string().email("이메일 양식이 일치하지 않습니다").required(" "),
  password: yup
    .string()
    .min(8, "비밀번호는 8글자 이상이어야합니다.")
    .required(" "),
});

const SignInForm = () => {

  const navigate = useNavigate();
  const [_, setUser] = useAuth() //--> 배열에서 콤마만 넣거나, 언더바 넣어주면 다음 거 사용할 수 있다

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

      const {token, info} = response.data  //-->  response.data 접근을 자주하기에, 구조분해할당으로 만들어준 것이다 (가독성이 좋아진다)

      if (response.data.ok) { //-->  이렇게 로그인 성공, 실패에 관해서 ok 에 true, false 를 할 수도 있고, 에러처리로 할 수도 있다

        //--------------------------------------------------------------
        // localStorage 저장 :

        // console.log(response.data.token)  //-->  토큰값 확인할 수 있다

        // localStorage.setItem("access_token", response.data.token) //-->  토큰 뿐만 아니라, 유저에 관한 데이터 여러개 localStorage 로 넣을 것이다
        localStorage.setItem("user", JSON.stringify({ //--> 이렇게 setItem 으로 localStorage 에 값을 넣을 수 있다
          //-->  스트링 밖에 안들어가기 때문에 JSON.stringify 으로 바꿔줘야한다
          token,
          info
        })) //-->  로컬스토리지에 token 값과 info 값을 넣은 것이다 (user 라는 key 값으로 담긴다)
        setUser(info) //-->  로그인 성공하면 유저 정보가 전역상태에 담기는 것이다

        // return navigate("/todo");
      }
      alert(response.data.message);
      // alert("아이디와 비밀번호를 확인해주세요");
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
