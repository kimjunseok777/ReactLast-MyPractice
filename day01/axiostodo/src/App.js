import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./libs/routes/router";
import { ThemeProvider } from "styled-components";
import { theme } from "./libs/styles/theme";
import AuthProvider from "providers/auth-provider";

function App() {

  return (
    <AuthProvider>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </AuthProvider>
  );
}
export default App;

