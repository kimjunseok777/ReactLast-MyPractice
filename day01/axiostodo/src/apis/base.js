import axios from "axios";


// 기본 백엔드 url 을 모듈화 해준 것이다  -->  auth.api.js 로 가서 정의해주면 된다
//-->  여기에 axios 사용해줬으니, 메소드와 남은 url 만 작성하고 사용하면 되는 것이다

//-->  axios 가 create 하는 순간은 처음에 bundle 될 때이다
export const baseHttp = axios.create({
    baseURL: "http://localhost:3040",
    withCredentials: true, //-->  쿠키 자동 교환  -->  백엔드랑 데이터 소통할 때 쿠키가 자동으로 왔다갔다한다
    // 서버에서 쿠키로 인증 토큰을 달라고 얘기를 했을 때, 이렇게 하면 된다  -->  withCredentials 옵션을 true 로 바꿔주면 된다

    //-->  하지만 우리는 요청의 헤더에 토큰을 전달해야한다  -->  local storage 를 사용해볼 것이다 (이번에는 쿠키 사용하지 않을 것이다)
    //-->  localStorage 는 웹 브라우저가 꺼져도 계속 유지가 된다

    // localStorage : 웹사이트가 종료되도 유지된다  -->  유저의 로그인 상태를 유지시킬 수 있다
    // sessionStorage : 웹사이트가 종료되면 삭제된다

    //--------------------------------------------------------------------------------------------------------------------------
    // header 에 토큰을 실으면 안되는 이유 :


    /*
        headers: {
            Authorization: `beaer ${localStorage.getItem("user").token}`
        }
    */

    //-->  로그인 이전이면 undefined 이기 때문에 beaer 만 데이터가 생기기에 안된다
    //-->  이렇게 사용할 거면 baseHttp 를 함수형으로 만들어줘야한다  -->  재실행시켜줘야함  -->  비효율적인 방법이다
})

//--------------------------------------------------------------------------------------------------------------------------
// 인터셉터 사용하는 방법 :

// 요청을 가로채서 토큰을 실어서 보내는 것이다
//-->  사용자가 백엔드에게 보내는 request 를 가로채는 것이다
baseHttp.interceptors.request.use((config) => {
    // request 어떻게 보낼 것인지 정의
    const token = JSON.parse(localStorage.getItem("user")).token
    config.headers.Authorization = `Bearer ${token}`
    return config
}, (err) => {
    // err 발생했을 때 어떻게 할 것인지 정의
    return Promise.reject(err)
})

//--------------------------------------------------------------------
// 리프레쉬 토큰 참고 :
//-->  백엔드가 사용자에게 보내는 response 를 가로채는 것이다

baseHttp.interceptors.response.use((response) => {
    return response
}, (err) => {
    // err.status = 백엔드에서 지정해준 에러코드인지 확인하는 것 작성 (401, 403 ... 같은 것들인지 확인)
    // ex) 401  -->  인증토큰 유효
    // ex) 403  -->  접근권한이 없는 회원
    //-->  리프레쉬 토큰이 존재하면 errorCode 7001 번으로 보낼 수도 있다 (이거는 백엔드가 정하는 것이다  -->  백엔드 마음이다)

    /*
    ) refresh 가 있는 상황 :

        if(err.response.status === 401) {  -->  status 가 401 번 이라면 refresh token 을 재발급 받는 것이다
            const token = AuthApi.refresh()  -->  토큰을 재발급 받는 것  -->  이 토큰을 다시 사용하면 된다
            err.config.headers.Authorization = `bearer ${token}`  -->  이거 넣어주면 끝이다
            return baseHttp(error.config)  -->  이러면 재요청 되는 것이다

            ==>  사용자가 응답을 받기 전에 다시 보내는 것이다
            ==>  즉, 사용자는 리프레쉬토큰을 다시 발급받는 것도 모르게 할 수 있는 것이다

            
        ) refresh 가 없는 상황 :

            * 만약 사용자에게 알려주고 싶으면 이렇게 하면 된다
            if(err.response.status === 403) {
                alert("세션이 만료되었습니다")
                Auth.signOut()  -->  로그아웃 시켜주는 것 모듈화한 것 실행해줌  -->  백엔드가 설정한 주소가 있을 것이다
                localStorage 비워주기
                window.location.href = "/"  -->  새로고침 하는 코드  -->  href 경로 이동은 번들을 다시 받는다  -->  즉, 새로고침이 된다
            }
        }
    */
   return Promise.reject(err)
})
