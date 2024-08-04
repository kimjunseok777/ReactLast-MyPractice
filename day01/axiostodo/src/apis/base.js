import axios from "axios";


// 기본 백엔드 url 을 모듈화 해준 것이다  -->  auth.api.js 로 가서 정의해주면 된다
export const baseHttp = axios.create({
    baseURL: "http://localhost:3040",
    withCredentials: true, //-->  쿠키 자동 교환  -->  백엔드랑 데이터 소통할 때 쿠키가 자동으로 왔다갔다한다
    // 서버에서 쿠키로 인증 토큰을 달라고 얘기를 했을 때, 이렇게 하면 된다

    //-->  하지만 우리는 요청의 헤더에 토큰을 전달해야한다  -->  local storage 를 사용해볼 것이다
    //-->  localStorage 는 웹 브라우저가 꺼져도 계속 유지가 된다

    // localStorage : 웹사이트가 종료되도 유지된다
    // sessionStorage : 웹사이트가 종료되면 삭제된다
})