import {createContext, useContext, useEffect, useState} from "react"


const AuthContext = createContext() //-->  빈 저장소 생성
export const useAuth = () => useContext(AuthContext) //-->  편이하게 사용 가능한 커스텀 훅 만들기


const AuthProvider = ({children}) => { //-->  사용가능한 스코프를 정하기 위해 프로바이더 생성

    const [user, setUser] = useState() //-->  전역으로 관리하고 싶은 상태 만들기
    
    //-------------------------------------------------------------------------
    // useEffect :
    // 상태는 새로고침하면 초기화 되기에, localStorage 사용하는 useEffect 만들어준 것이다

    useEffect(() => {

        const userRepository = JSON.parse(localStorage.getItem("user")) //-->  localStorage 의 값은 이렇게 getItem 으로 가져올 수 있다
        //-->  만약 콘솔이나 저장소에 [Object, Object ...] 이런 식으로 찍힌다면  -->  JSON.stringify , JSON.parse ... 등으로 데이터를 바꿔줘야한다
        //-->  객체형태로 값을 넣을 때는 stringify 로 값을 바꿔주고, 가져다 쓸 때에도 parse 로 바꿔주는 과정이 필요하다

        //-->  여기서 불러온 값도 string 일 것이기에, 객체로 바꿔줘야한다  -->  JSON.parse()
        //-->  userRepository 에는 user 라는 키값으로 token, info 데이터가 온다

        console.log(userRepository) //-->  token, info 데이터 확인 가능 (로그인 전이면 null 이 뜬다)

        if(!userRepository) return //-->  만약, localStorage 에 "user" 가 없다면 early return
        // localStorage 에 "user" 가 있다면 info 값을 user 전역상태에 넣는다
        setUser(userRepository.info) //-->  "user" 의 info 값을 전역상태로 관리하는 것이다  -->  새로고침하거나, 재랜더링 되어도 로그인이 유지가 되는 것이다
        //-->  유저의 정보는 웹스토리지에 계속 저장되어있다
        
    }, [])
    //-------------------------------------------------------------------------

    return <AuthContext.Provider value={[user, setUser]}>{/*-->  이렇게 배열로 넣어도 되고, 객체로 넣어줘도 된다*/}
        {children}
    </AuthContext.Provider>
}

export default AuthProvider 