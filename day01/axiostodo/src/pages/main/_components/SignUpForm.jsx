import { useForm } from "react-hook-form";
import TDButton from "../../../components/Button";
import FormInput from "../../../components/FormInput";
import { Form } from "./style";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios"
// import AuthApi from "../../../apis/auth.api";  -->  jsconfing.json 으로 아래처럼 src 기준으로 해서 경로 깔끔하게 만들어줄 수 있다
import AuthApi from "apis/auth.api";




const SIGNFORM_ARRAY = [
  {
    label: "이메일",
    size: 3,
    name: "email",
    option: {
      placeholder: "이메일을 입력해주세요",
    },
  },
  {
    label: "비밀번호",
    size: 3,
    name: "password",
  },
  {
    label: "비밀번호 확인",
    size: 3,
    name: "password-confirm",
  },
];

const signFormSchema = yup.object().shape({
  email: yup.string().email("이메일 양식이 아닙니다").required(),

  password: yup
    .string()
    .min(8, "비밀번호는 8글자 이상 입력해주세요")
    .required(),

  "password-confirm": yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호 확인이 일치하지 않습니다")
    .required(),
});

const SignUpForm = ({ setFormState }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(signFormSchema),
  });

  //----------------------------------------------------------------------------
  // axios :
  // axios 사용  -->  AuthApi 사용해주기 위해 주석처리해줬다

  const onSubmitSignUp = async(data) => {

    // const response = await axios.post("http://localhost:3040/user/sign-up", {
    //   email: data.email,
    //   password: data.password
    // })

    //--------------------------------------------------------------------------

    // api 모듈화 :

    const response = await AuthApi.signUp({
      email: data.email,
      password: data.password
    })

    console.log(response)
    if(response.data.ok) { //-->  ok 가 true 이면 회원가입 성공 액션들이 일어나는 것이다
        alert(response.data.message); //-->  백엔드에서 보내준 데이터로 알림창을 띄우는 것이다
        //-->  응답 데이터인 response 의 date 에는 ok, message, info, token ... 등의 데이터들이 담겨 온다
        setFormState("SIGN-IN");
    }
  };

  //----------------------------------------------------------------------------

  return (
    <S.Form onSubmit={handleSubmit(onSubmitSignUp)}>
      {SIGNFORM_ARRAY.map((form) => (
        <FormInput
          key={form.name}
          size={form.size}
          label={form.label}
          register={register}
          name={form.name}
          placeholder={form.option?.placeholder}
          error={errors[form.name]?.message}
        />
      ))}
      <TDButton size={"full"} variant={"primary"} disabled={!isValid}>
        회원가입
      </TDButton>
    </S.Form>
  );
};

const S = {
  Form,
};

export default SignUpForm;

