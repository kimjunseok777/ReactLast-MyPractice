import { baseHttp } from "./base"



const AuthApi = {

    signIn({email, password}) {
        return baseHttp.post("/user/sign-in", {email, password})
    },

    signUp({email, password}) {
        return baseHttp.post("/user/sign-up", {email, password})
    }
    //-->  이렇게 메소드를 같게 쓸 수 있는 이유는 요청하는 백엔드 주소가 다르기 때문이다  -->  sign-in / sign-up

    //-->  이제 localhost... 이런 거 쓰지 않고, 함수로 백엔드에게 데이터 요청을 실행할 수 있는 것이다
    //-->  이제 AuthApi.signIn( 매개변수 ) 또는 AuthApi.signIn( 매개변수 )  -->  이렇게 하면 로그인, 회원가입이 이뤄지는 것이다

    //-->  마찬가지로 사용할 때는 비동기이기 때문에 AuthApi 앞에 await 걸어주거나, then 과 함께 사용해야한다

    //-->  SignUpForm.jsx 가서 사용해주자
}

export default AuthApi