import axios from "axios";


// 기본 백엔드 url 을 모듈화 해준 것이다  -->  auth.api.js 로 가서 정의해주면 된다
export const baseHttp = axios.create({
    baseURL: "http://localhost:3040"
})