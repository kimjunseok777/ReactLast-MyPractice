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

  const onSubmitSignUp = async(data) => {

    // axios 사용  -->  AuthApi 사용해주기 위해 주석해줬다
    // const response = await axios.post("http://localhost:3040/user/sign-up", {
    //   email: data.email,
    //   password: data.password
    // })

    const response = await AuthApi.signUp({
      email: data.email,
      password: data.password
    })

    console.log(response)

    // alert(`${data.email}님 환영합니다`);
    // setFormState("SIGN-IN");
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

