import {createContext, useContext, useEffect, useState} from "react"


const AuthContext = createContext() // 1. 빈 저장소 생성
export const useAuth = () => useContext(AuthContext) // 4. 편이하게 사용 가능한 커스텀 훅 만들기

const AuthProvider = ({children}) => { // 2. 프로바이더 생성  -->  사용가능한 스코프를 정하기 위해 생성한다

    const [user, setUser] = useState()
    // 3. 전역 관리하곳 싶은 값 내려주기
    
    //-------------------------------------------------------------------------
    // 상태는 새로고침하면 초기화 되기에, localStorage 사용하는 useEffect 만들어준 것이다 :

    useEffect(() => {
        const userRepository = JSON.parse(localStorage.getItem("user")) //-->  localStorage 의 값은 이렇게 getItem 으로 가져올 수 있다
        //-->  여기서 불러온 값도 string 일 것이기에, 객체로 바꿔줘야한다  -->  JSON.parse()

        if(!userRepository) return //-->  만약, localStorage 에 "user" 가 없다면 early return
        setUser(userRepository.info) //-->  "user" 의 info 값을 전역상태로 관리하는 것이다  -->  새로고침하거나, 재랜더링 되어도 로그인이 유지가 되는 것이다
        //-->  유저의 정보는 웹스토리지에 계속 저장되어있다
        
    }, [])
    //-------------------------------------------------------------------------

    return <AuthContext.Provider value={[user, setUser]}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider