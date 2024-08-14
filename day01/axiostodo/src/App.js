import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./libs/routes/router";
import { ThemeProvider } from "styled-components";
import { theme } from "./libs/styles/theme";
import AuthProvider from "providers/auth-provider";
import TodoProvider from "providers/todo-provider";

function App() {

  return (
    <AuthProvider>
        <TodoProvider>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </TodoProvider>
    </AuthProvider>
  );
}
export default App;

