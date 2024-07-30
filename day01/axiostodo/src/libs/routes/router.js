import { createBrowserRouter } from "react-router-dom";
import Todo from "../../pages/todo/todo";
import Main from "../../pages/main/main";
import RootLayout from "../../layouts/layout";

const router = createBrowserRouter([
  {
    element: <RootLayout />, // 부모
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/todo",
        element: <Todo />,
      },
    ],

  },
]);

export default router;