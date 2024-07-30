import { Outlet, useLocation } from "react-router-dom";
import { dynamicLayoutMetadata } from "../utils/url-helper";

const RootLayout = () => {
  const location = useLocation();
  const metadata = dynamicLayoutMetadata(location.pathname);

  return (
    <>
      {metadata.header && <header>header</header>}
      <Outlet />
      {metadata.footer && <footer>footer</footer>}
    </>
  );
};
export default RootLayout;
