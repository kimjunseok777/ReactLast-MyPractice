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

  // 토큰을 전역상태관리하기 위해 useAuth 만들어줬다  -->  auth-provider.js 에서 확인할 수 있다
  const [_, setUser] = useAuth() //--> 배열에서 콤마만 넣거나, 언더바 넣어주면 다음 거 사용할 수 있다

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(singInFormSchema),
  });

  //-------------------------------------------------------------------------------------------------------------------------------------------
  // 로그인 기능 :

  const handlePressSignIn = async (data) => {
    try {
      // 백엔드에게 데이터 요청  -->  AuthApi 함수사용해줬다 (매개변수를 바디데이터로 보내는 역할을 하는 함수이다 --> 기능도 모듈화 시켜줬다 : 로그인 , 회원가입)
      const response = await AuthApi.signIn({
        email: data.email,
        password: data.password
      });

      // AuthApi 로 백엔드에게 응답받은 데이터를 구조분해할당 해준 것이다  -->  로그인 기능부터는 유저의 token 과 info 데이터가 많이 쓰이기에 만들어준 것
      const {token, info} = response.data  //-->  response.data 접근을 자주하기에, 구조분해할당으로 만들어준 것이다 (가독성이 좋아진다)

      //--------------------------------------------------------------
      // localStorage 저장 :

      if (response.data.ok) { //-->  이렇게 로그인 성공, 실패에 관해서 ok 에 true, false 를 할 수도 있고, 에러처리로 할 수도 있다
        //-->  여기서는 로그인이 성공했을 때, ok 의 값으로 true 가 들어가게 만들어줬다
        //-->  로그인이 성공했다면, localStorage 에 key , value 를 추가해주자 (user 라는 이름으로 토큰값을 넣어줄 것이다)

        // console.log(response.data.token)  //-->  토큰값 확인할 수 있다 (jwt 를 통해 암호화된 값이 온다)  -->  위에 구조분해할당 한 걸로 적어줘도 된다

        // localStorage.setItem("access_token", response.data.token) //-->  토큰 뿐만 아니라, 유저에 관한 데이터 여러개 localStorage 로 넣어줄 것이다
        localStorage.setItem("user", JSON.stringify({ //--> 이렇게 "setItem" 으로 localStorage 에 값을 넣을 수 있다
          //-->  스트링 밖에 안들어가기 때문에 JSON.stringify 으로 바꿔줘야한다
          token,
          info
        })) //-->  로컬스토리지에 token 값과 info 값을 넣은 것이다 (user 라는 key 값에다가 token, info 키값과 벨류값을 넣어줬다)

        setUser(info) //-->  로그인 성공하면 유저 정보가 전역상태에 담기는 것이다 (info 값을 전역상태로 넣어줬다  -->  이걸 화면의 header 에 보이게 해줬다)
        //-->  새로고침해도 auth-provider.js 에 useEffect 만들어줬기에 user 전역상태의 info 값은 유지된다

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

  //-------------------------------------------------------------------------------------------------------------------------------------------

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
