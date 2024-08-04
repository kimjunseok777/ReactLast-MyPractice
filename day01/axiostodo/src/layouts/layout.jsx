import { Outlet, useLocation } from "react-router-dom";
import { dynamicLayoutMetadata } from "../utils/url-helper";
import { useAuth } from "providers/auth-provider";

const RootLayout = () => {
  const location = useLocation();
  const metadata = dynamicLayoutMetadata(location.pathname);

  const [user, setUser] = useAuth() //-->  유저 정보 전역상태관리 사용해준 것이다
  //-->  단순 텍스트가 바뀌는 것이 아니라, 로그아웃 버튼이 생기는 것일 수도 있다

  
  // 로그아웃 :
  const handleSignOut = () => {
    setUser(null)
    localStorage.removeItem("user") //-->  처음에 localStorage 에 저장했던 key 값 적으면 된다  -->  ex) localStorage.getItem("user", { ... }) 이렇게 저장했었다
    // AuthApi.signOut()  -->  이것도 만들어서 로그아웃 했다는 것을 백엔드에고 요청해줘야한다
  }

  
  return (
    <>
      {metadata.header && <header>
        {user && `${user.email}님 안녕하세요`}
        header
      </header>}
          <Outlet />
      {metadata.footer && <footer>footer</footer>}
    </>
  );
};
export default RootLayout;
